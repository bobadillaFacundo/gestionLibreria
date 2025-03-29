import express from "express";
import __dirname from "../utils/utils.js";
import dotenv from "dotenv";
import authMiddleware from '../middlewares/authMiddleware.js';
import { gestionPage, librosPage, perfilPage } from "../controllers/controllersUsuarios.js"; // Importamos los controladores

dotenv.config();

const router = express.Router();
router.use(express.static(__dirname + "/public"));

// Rutas
router.get('/gestion', authMiddleware, gestionPage);
router.get('/libros', authMiddleware, librosPage);
router.get('/perfil/:id', perfilPage);

export default router;
