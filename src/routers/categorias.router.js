import express from "express"
import authMiddleware from '../middlewares/authMiddleware.js'
import {
    obtenerTodasLasCategorias,
    crearCategoriaVista,
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    eliminarCategoria
} from '../controllers/controllerCategorias.js'
import __dirname from "../utils/utils.js"
const router = express.Router()

router.use(express.static(__dirname + "/public"))

router.get('/principal', authMiddleware, obtenerTodasLasCategorias)

router.get("/crud", authMiddleware, crearCategoriaVista)

router.get('/', authMiddleware, obtenerCategorias)

router.get("/:cid", authMiddleware, obtenerCategoriaPorId)

router.post("/", authMiddleware, crearCategoria)

router.delete("/:cid", authMiddleware, eliminarCategoria)

export default router
