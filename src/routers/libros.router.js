import express from "express"
import { deleteDocumento, ERROR } from "../utils/utils.js"
import librosModel from '../models/libros.js'
import autoresModel from '../models/autores.js'
import categoriasModel from '../models/categorias.js'
import __dirname from "../utils/utils.js"
import authMiddleware from '../middlewares/authMiddleware.js'
import usuariosModel from '../models/usuarios.js'


const router = express.Router()
router.use(express.static(__dirname + "/public"))


router.get('/principalGestion', authMiddleware, async (req, res) => {
    try {
        const result = await librosModel.find()
            .populate({ path: 'autor' })
            .populate({ path: 'categorias' })

        res.render('librosGestion', {
            style: 'index.css',
            libros: result
        })
    } catch (error) {
        console.error("Error al obtener los libros:", error)
        res.status(500).send("Error del servidor")
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await librosModel.find()
            .populate({ path: 'autor' })
            .populate({ path: 'categorias' })

        res.json(result)

    } catch (error) {
        console.error("Error al obtener los libros:", error)
        res.status(500).send("Error del servidor")
    }
})

router.get("/crud", authMiddleware, async (req, res) => {
    const autor = await autoresModel.find()
    const categorias = await categoriasModel.find()
    return res.render('createLibro', {
        style: 'index.css',
        autores: autor,
        categorias: categorias
    })
})

router.get("/usuario/:cid", authMiddleware, async (req, res) => {
    try {
        const cid = String(req.params.cid)
        const result = await librosModel
            .find({ titulo: { $regex: `${cid}`, $options: 'i' } })
            .populate({ path: 'autor' })
            .populate({ path: 'categorias' })


        if (!result) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }

        return res.render('libro', {
            style: 'index.css',
            libros: result
        })

    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
})


router.get("/:cid", authMiddleware, async (req, res) => {
    try {
        const cid = String(req.params.cid)
        const result = await librosModel
            .find({ titulo: { $regex: `${cid}`, $options: 'i' } }).
            populate({ path: 'autor' })
            .populate({ path: 'categorias' })

        if (!result) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }

        return res.render('libro', {
            style: 'index.css',
            libros: result
        })

    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
})

router.delete("/:cid", authMiddleware, async (req, res) => {
    await deleteDocumento(req.params.cid, librosModel).then(result => {
        if (result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        return res.json('Se elimino el categoria')
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})

router.post("/", authMiddleware, (async (req, res) => {
    const libro = req.body
    console.log(libro)

    if (!libro.titulo || !libro.descripcion || !libro.autor || !libro.precio || !libro.cantidad || !libro.categorias) {
        return ERROR(res, `Campos Vacios`)
    }
    const categoriasArray = Array.isArray(libro.categorias) ? libro.categorias : [libro.categorias]

    const autor1 = await autoresModel.findOne({ nombre: new RegExp(libro.autor, 'i') })
    const categorias = await categoriasModel.find({ nombre: { $in: categoriasArray } })


    const nuevolibro = new librosModel({
        titulo: libro.titulo,
        descripcion: libro.descripcion,
        autor: autor1._id,
        precio: libro.precio,
        estado: libro.estado,
        cantidad: libro.cantidad,
        categorias: categorias
    })

    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i]
        await categoriasModel.findByIdAndUpdate(
            categoria._id,
            { $push: { libros: nuevolibro._id } }
        )
    }

    try {
        // Guardar el libro en la base de datos
        const guardarlibro = await nuevolibro.save()

        // Ahora actualizamos el autor, agregando el nuevo libro a su lista de libros
        await autoresModel.findByIdAndUpdate(
            autor1._id,
            { $push: { libros: guardarlibro._id } }
        )
        res.status(200).json({ message: 'Libro creado con éxito' })

    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}))



export default router