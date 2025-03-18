import express from "express"
import { obtenerDocumento, deleteDocumento, ERROR } from "../utils.js"
import librosModel from '../models/libros.js'
import autoresModel from '../models/autores.js'
import categoriasModel from '../models/categorias.js'
import __dirname from "../utils.js"
import mongoose from 'mongoose'


const router = express.Router()
router.use(express.static(__dirname + "/public"))

router.get('/principal', async (req, res) => {
    try {
        const result = await librosModel.find()
            .populate({ path: 'autor' })   
            .populate({ path: 'categorias' })

        res.render('libros', {
            style: 'index.css',
            libros: result
        });
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        res.status(500).send("Error del servidor")
    }
})


router.get('/', async (req, res) => {
    try {
        const result = await librosModel.find()
            .populate({ path: 'autor' })   
            .populate({ path: 'categorias' });

        res.json(result)

    } catch (error) {
        console.error("Error al obtener los libros:", error);
        res.status(500).send("Error del servidor");
    }
})

router.get("/crud", async (req, res) => {
    const autor = await autoresModel.find()
    const categorias = await categoriasModel.find()
    return res.render('createLibro', {
        style: 'index.css',
        autores: autor,
        categorias: categorias
    })
})

router.get("/:cid", async (req, res) => {
    try {
        const cid = String(req.params.cid); 
        const result = await librosModel
        .find({ titulo: { $regex: `${cid}`, $options: 'i' } }) 
        if (!result) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }

        result.save

        
        return res.render('libro', {
            style: 'index.css',
            libros: result
        })

    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
})

router.delete("/:cid", async (req, res) => {
    await deleteDocumento(req.params.cid,librosModel).then(result => {
        if (result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        return res.json('Se elimino el categoria')
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})

router.post("/", (async (req, res) => {
    const libro = req.body
    
    if (!libro.titulo || !libro.descripcion || !libro.autor || !libro.precio || !libro.cantidad || !libro.categorias) {
        return ERROR(res, `Campos Vacios`)
    }
    const categoriasArray = Array.isArray(libro.categorias) ? libro.categorias : [libro.categorias];

    const autor1 = await autoresModel.findOne({ nombre: new RegExp(libro.autor, 'i') })
    const categorias = await categoriasModel.find({ nombre: { $in: categoriasArray} })

    
    const nuevolibro = new librosModel({
        titulo: libro.titulo,
        descripcion: libro.descripcion,
        autor: autor1._id ,
        precio: libro.precio,
        estado: libro.estado,
        cantidad: libro.cantidad,
        categorias:  categorias
    }) 
    try {   
        // Guardar el libro en la base de datos
        const guardarlibro = await nuevolibro.save()

        // Ahora actualizamos el autor, agregando el nuevo libro a su lista de libros
        await autoresModel.findByIdAndUpdate(
            autor1._id, 
            { $push: { libros: guardarlibro._id } }
        )
        res.status(200).json({ message: 'Libro creado con éxito' })
        formCA.reset()
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}))



export default router