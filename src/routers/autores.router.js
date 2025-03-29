import express from "express";
import autoresController from '../controllers/controllerAutores.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import __dirname from "../utils/utils.js"

const router = express.Router();
router.use(express.static(__dirname + "/public"));

router.get('/principal/:email', authMiddleware, autoresController.obtenerAutores);
router.get("/crud", authMiddleware, (req, res) => res.render('createAutor', { style: 'index.css' }));
router.get("/autor/:cid/:user", authMiddleware, autoresController.obtenerAutorPorId);
router.get("/usuario/:cid", authMiddleware, autoresController.obtenerAutorParaUsuario);
router.post("/", authMiddleware, autoresController.crearAutor);
router.delete("/:cid", authMiddleware, autoresController.eliminarAutor);

export default router;
