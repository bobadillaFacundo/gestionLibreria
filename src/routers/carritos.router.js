import express from "express"
import authMiddleware from '../middlewares/authMiddleware.js'
import {
    obtenerCarritosGestion,
    obtenerCarritoPorEmail,
    obtenerCarritos,
    crearCarrito,
    obtenerCompra,
    agregarLibroCarrito,
    buscarMontoCarrito,
    eliminarLibroCarrito
} from '../controllers/contollerCarritos.js'
import __dirname from "../utils/utils.js"

const router = express.Router()
router.use(express.static(__dirname + "/public"))

router.get('/principalGestion', authMiddleware, obtenerCarritosGestion)
router.get('/principal/:email', authMiddleware, obtenerCarritoPorEmail)
router.get('/', authMiddleware, obtenerCarritos)
router.post("/", authMiddleware, crearCarrito)
router.get('/compra', authMiddleware, obtenerCompra)
router.post("/agregarCarrito", authMiddleware, agregarLibroCarrito)
router.post('/buscarMontoCarrito', authMiddleware, buscarMontoCarrito)
router.put('/eliminarLibro', authMiddleware, eliminarLibroCarrito)

export default router
