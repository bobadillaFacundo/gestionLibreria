import express from "express"
import { obtenerTodosLosDocumentos, deleteDocumento, ERROR } from "../utils/utils.js"
import autoresModel from '../models/autores.js'
import __dirname from "../utils/utils.js"
import authMiddleware from '../middlewares/authMiddleware.js'
const router = express.Router()
router.use(express.static(__dirname + "/public"))


router.get('/principal', authMiddleware,async (req, res) => {
    try {
        const autores = await autoresModel.find().populate('libros')
        
        res.render('autores', {
            style: 'index.css',
            autores: autores
        })
      } catch (error) {
       return {message:'Error al conectar o interactuar con la base de datos en obtenerTodoslosDocumentos', error}
      } 
}) 

router.get("/crud",authMiddleware, async (req, res) => {
    return res.render('createAutor', {
        style: 'index.css',
    })
})


router.get('/', authMiddleware,async (req, res) => {
    await obtenerTodosLosDocumentos(autoresModel).then(result => {
        res.json(result)
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})


router.get("/:cid",authMiddleware, async (req, res) => {
    try {
        const cid = String(req.params.cid); 
        const result = await autoresModel
        .find({ nombre: { $regex: `${cid}`, $options: 'i' } }) 
        .populate('libros');
                console.log(result)
        
        if (!result) {
            return res.status(404).json({ error: "Error del servidor: ID no Existe" })
        }

        console.log(result);

        return res.render('autor', {
            style: 'index.css',
            autor: result
        })

    } catch (error) {
        return res.status(500).json({ error: "Error del servidor: ${error.message} "})
    }

})

router.post("/", authMiddleware,(async (req, res) => {
    const autor = req.body
    if (!autor.nombre || !autor.edad ) {
        return ERROR(res, `Campos Vacios`)
    }
    const nuevoAutor = new autoresModel({
        nombre: autor.nombre,
        edad: autor.edad,
        libros: []
    })
    try {
        const guardarAutor = await nuevoAutor.save()
        res.json( guardarAutor)
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}))

router.delete("/:cid",authMiddleware, async (req, res) => {
    await deleteDocumento(req.params.cid, autoresModel).then(result => {
        if (result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        return res.json('Se elimino el autor')
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})

router.post("/", authMiddleware,(async (req, res) => {
    const autor = req.body
    if (!autor.nombre || !autor.edad ) {
        return ERROR(res, `Campos Vacios`)
    }
    const nuevoAutor = new autoresModel({
        nombre: autor.nombre,
        edad: autor.edad,
        libros: []
    })
    try {
        const guardarAutor = await nuevoAutor.save()
        res.json( guardarAutor)
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}))

export default router