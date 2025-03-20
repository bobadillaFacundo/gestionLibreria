
import express from "express"
import __dirname from "../utils/utils.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
dotenv.config();
import usuariosModel from "../models/usuarios.js" 
import { ERROR } from "../utils/utils.js"

const router = express.Router()
router.use(express.static(__dirname + "/public"))


router.get('/principal', async (req, res) => {
    try {
        res.render('Usuarios', {
            style: 'index.css'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})

router.get("/usuariosCrear", async (req, res) => {
    return res.render('crearusuario', {
        style: 'index.css'
    })
})


router.post("/usuarioCrea", async (req, res) => {
    const usuario = req.body
    
    if (!usuario.username || !usuario.password) {
        return ERROR(res, `Campos Vacios`)
    }
    const nuevoUsuario = new usuariosModel({
        email: usuario.username,
        password: bcrypt.hashSync(usuario.password, 10),
        tipo:  "comun"
    })
    try {
        const guardarusuari = await nuevoUsuario.save()
        const token = jwt.sign(
                { id: guardarusuari._id, email: guardarusuari.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' } // El token expira en 1 hora
            )
        console.log(token);
        
        res.json({ token })
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await usuariosModel.findOne({ email: username })
    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' })
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Credenciales incorrectas' })
    }
    const token = jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // El token expira en 1 hora            
    )
    res.json({ token })
    }   )
    

export default router