import express from "express"
import { obtenerTodosLosDocumentos, obtenerDocumento, deleteDocumento, ERROR } from "../utils.js"
import autoresModel from '../models/autores.js'
import __dirname from "../utils.js"

const router = express.Router()
router.use(express.static(__dirname + "/public"))


router.get('/principal', async (req, res) => {
    await obtenerTodosLosDocumentos(autoresModel).then(result => {
        res.render('autores', {
            style: 'index.css',
            autores: result
        })
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})

router.get('/', async (req, res) => {
    await obtenerTodosLosDocumentos(autoresModel).then(result => {
        res.json(result)
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})


router.get("/:cid", async (req, res) => {
    try {
        const result = await obtenerDocumento(req.params.cid, autoresModel)

        if (!result) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }

        await result.populate('libros')
        result.save
        console.log(result);
        
        return res.render('autor', {
            style: 'index.css',
            autor: result
        })

    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
})

router.post("/", (async (req, res) => {
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

router.delete("/:cid", async (req, res) => {
    await deleteDocumento(req.params.cid, autoresModel).then(result => {
        if (result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        return res.json('Se elimino el autor')
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})


export default router