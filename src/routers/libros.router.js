// routes/librosRoutes.js
import express from "express"
import { 
    obtenerLibros, 
    obtenerLibrosJSON, 
    crudLibros, 
    obtenerLibroPorTitulo, 
    eliminarLibro, 
    crearLibro 
} from '../controllers/controllerLibros.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import __dirname from "../utils/utils.js"
const router = express.Router()
router.use(express.static(__dirname + "/public"))

router.get('/principalGestion', authMiddleware, obtenerLibros)

router.get('/', authMiddleware, obtenerLibrosJSON)

router.get("/crud", authMiddleware, crudLibros)

router.get("/usuario/:cid", authMiddleware, obtenerLibroPorTitulo)

router.get("/:cid", authMiddleware, obtenerLibroPorTitulo)

router.delete("/:cid", authMiddleware, eliminarLibro)

router.post("/", authMiddleware, crearLibro)

export default router
