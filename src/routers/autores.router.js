import express from "express"
import { obtenerTodosLosDocumentos, deleteDocumento, ERROR } from "../utils/utils.js"
import autoresModel from '../models/autores.js'
import __dirname from "../utils/utils.js"
import authMiddleware from '../middlewares/authMiddleware.js'
import usuariosModel2 from '../models/usuarios.js'


const router = express.Router()
router.use(express.static(__dirname + "/public"))


router.get('/principal/:email', authMiddleware, async (req, res) => {
    try {
        const c = req.params.email
        const autores = await autoresModel.find().populate('libros')
        const usuario = await usuariosModel2.findOne({email:c})
        
        // Verifica si el usuario existe antes de proceder
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' }) 
        }
        
        if (usuario.tipo === 'comun') {

            res.render('autoresUsuario', {
                style: 'index.css',
                autores: autores
            })
        } else {

            res.render('autores', {
                style: 'index.css',
                autores: autores
            })
        }
    } catch (error) {
        return { message: 'Error al conectar o interactuar con la base de datos en obtenerTodoslosDocumentos', error }
    }
})

router.get("/crud", authMiddleware, async (req, res) => {
    return res.render('createAutor', {
        style: 'index.css',
    })
})

/*
router.get('/', authMiddleware, async (req, res) => {
    await obtenerTodosLosDocumentos(autoresModel).then(result => {
        res.json(result)
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})
*/
router.get("/autor/:cid/:user", authMiddleware, async (req, res) => {
    try {
        
        const datos = req.params.user
        const id = req.params.cid
        const usuario = await usuariosModel2.findOne({ email: datos })

        if (!usuario) {
            return res.status(404).json({ error: "Error del servidor: ID no Existe" })
        }

       
        const result = await autoresModel
            .find({ nombre: { $regex: `${id}`, $options: 'i' } })
            .populate('libros')         
        
        if (!result) {
            return res.status(404).json({ error: "Error del servidor: ID no Existe" })
        }
        
        if (usuario.tipo === 'comun') {

            res.render('autoreUsuario', {
                style: 'index.css',
                autor: result
            })
        } else {

            res.render('autor', {
                style: 'index.css',
                autor: result
            })
        }

    } catch (error) {
        return res.status(500).json({ error: `Error del servidor: ${error.message} ` })
    }

})


router.get("/usuario/:cid", authMiddleware, async (req, res) => {
    try {
        const cid = req.params.cid 
        const result = await autoresModel
            .find({ nombre: { $regex: `${cid}`, $options: 'i' } })
            .populate('libros') 

        if (!result) {
            return res.status(404).json({ error: "Error del servidor: ID no Existe" })
        }
        
        return res.render('autorUsuario', {
            style: 'index.css',
            autor: result
        })

    } catch (error) {
        return res.status().json({ error: "Error del servidor: ${error.message} " })
    }

})


router.post("/", authMiddleware, (async (req, res) => {
    const autor = req.body
    if (!autor.nombre || !autor.edad) {
        return ERROR(res, `Campos Vacios`)
    }
    const nuevoAutor = new autoresModel({
        nombre: autor.nombre,
        edad: autor.edad,
        libros: []
    })
    try {
        const guardarAutor = await nuevoAutor.save()
        res.json({ message: 'Autor creado con exito', autor: guardarAutor })
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}))

router.delete("/:cid", authMiddleware, async (req, res) => {
    await deleteDocumento(req.params.cid, autoresModel).then(result => {
        if (!result ||result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        return res.json('Se elimino el autor')
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})


export default router