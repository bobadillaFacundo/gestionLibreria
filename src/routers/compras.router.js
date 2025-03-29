import express from "express";
import { getAllCompras, registrarCompra, getComprasByUsuario } from "../controllers/controllerCompras.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import __dirname from "../utils/utils.js"
const router = express.Router();

router.use(express.static(__dirname + "/public"));

router.get('/principal', authMiddleware, getAllCompras);
router.post('/registrarCompra', authMiddleware, registrarCompra);
router.get('/usuarioCompras/:email', authMiddleware, getComprasByUsuario);

export default router;
