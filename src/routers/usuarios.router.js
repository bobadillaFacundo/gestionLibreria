import express from "express"
import __dirname from "../utils.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import usuariosModel from "../models/usuarios.js" 
import x from "dotenv"

x.config();

const router = express.Router()
router.use(express.static(__dirname + "/public"))

router.get('/principal', async (req, res) => {
    try {
        res.render('usuarios', {
            style: 'index.css',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})


router.get('/perfil/:id', async (req, res) => {
    try {
        const usuario = await usuariosModel.findById(req.params.id).lean(); // .lean() para Handlebars
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render('perfil', { style: 'index.css', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

router.get("/usuariosCrear", async (req, res) => {
    return res.render('crearusuario', {
        style: 'index.css',
    })
})


router.post("/", async (req, res) => {
    const usuario = req.body
    console.log(usuario);
    
    if (!usuario.usuario || !usuario.contrasenia) {
        return error(res, `Campos Vacios`)
    }
    const nuevoUsuario = new usuariosModel({
        email: usuario.usuario,
        password: bcrypt.hashSync(usuario.contrasenia, 10),
        tipo: usuario.tipo || "admin"
    })
    try {
        const guardarusuari = await nuevoUsuario.save()
       res.render('perfil', {style: 'index.css', usuario: guardarusuari})
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
    }
})




export default router