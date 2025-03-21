import express from "express"
import { obtenerTodosLosDocumentos, obtenerDocumento, deleteDocumento, ERROR } from "../utils/utils.js"
import categoriasModel from '../models/categorias.js'
import __dirname from "../utils/utils.js"
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
router.use(express.static(__dirname + "/public"))


router.get('/principal', authMiddleware,async (req, res) => {
    await obtenerTodosLosDocumentos(categoriasModel).then(result => {
        res.render('categorias', {
            style: 'index.css',
            categorias: result
        })
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})

router.get("/crud", authMiddleware,async (req, res) => {
    return res.render('createCatgeoria', {
        style: 'index.css',
    })
})

router.get('/', authMiddleware,async (req, res) => {
    await obtenerTodosLosDocumentos(categoriasModel).then(result => {
        res.json(result)
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})


router.get("/:cid",authMiddleware, async (req, res) => {
    try {
        const result = await obtenerDocumento(req.params.cid, categoriasModel)

        if (!result) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        
        return res.render('categoria', {
            style: 'index.css',
            autor: result
        })

    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
})

router.post("/", authMiddleware,(async (req, res) => {
    const categoria = req.body
    if (!categoria.nombre ) {
        return ERROR(res, `Campos Vacios`)
    }
    const nuevocategoria = new categoriasModel({
        nombre: categoria.nombre,
    })
    try {
        const guardarcategoria = await nuevocategoria().save()
        res.json( guardarcategoria)
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}))

router.delete("/:cid",authMiddleware, async (req, res) => {
    await deleteDocumento(req.params.cid, categoriasModel).then(result => {
        if (!result || result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        return res.json('Se elimino el categoria')
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})


export default router