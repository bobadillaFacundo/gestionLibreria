import express from "express"
import __dirname from "../utils/utils.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import usuariosModel from "../models/usuarios.js" 
import x from "dotenv"
import { ERROR } from "../utils/utils.js"
import generarToken from '../utils/generarToken.js'// Importa la función
import authMiddleware from '../middlewares/authMiddleware.js'

x.config();

const router = express.Router()
router.use(express.static(__dirname + "/public"))




router.get('/gestion',authMiddleware, async (req, res) => {
    try {
        res.render('index', {
            style: 'index.css',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})
router.get('/perfil/:id',authMiddleware, async (req, res) => {
    try {
        const usuario = await usuariosModel.findById(req.params.id).lean(); // .lean() para Handlebars
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render('perfilUsuario', { style: 'index.css', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

router.get("/usuariosCrear",authMiddleware, async (req, res) => {
    return res.render('crearusuario', {
        style: 'index.css',
    })
})


router.post("/usuariosCrear",authMiddleware, async (req, res) => {
    const usuario = req.body
    
    if (!usuario.usuario || !usuario.contrasenia) {
        return ERROR(res, `Campos Vacios`)
    }
    const nuevoUsuario = new usuariosModel({
        email: usuario.usuario,
        password: bcrypt.hashSync(usuario.contrasenia, 10),
        tipo:  "admin"
    })
    try {
        const guardarusuari = await nuevoUsuario.save()
       res.render('perfilUsuario', {style: 'index.css', usuario: guardarusuari})
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
    }
})


router.post("/perfil", authMiddleware, async (req, res) => {
    const usuario = req.body;

    if (!usuario.usuario || !usuario.password) {
        return res.status(400).json({ error: "Campos vacíos" });
    }

    try {
        const usuarioEncontrado = await usuariosModel.findOne({ email: usuario.usuario }).lean();

        if (!usuarioEncontrado) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }
        const contraseñaValida = await bcrypt.compare(usuario.password, usuarioEncontrado.password);

        if (!contraseñaValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        const token = generarToken(user);
        res.render('perfilUsuario', { style: 'index.css', usuario: usuarioEncontrado, token: token });
        

    } catch (error) {
        console.error(`Error al buscar el usuario: ${error}`);
        res.status(500).json({ error: "Error del servidor" });
    }
});

export default router