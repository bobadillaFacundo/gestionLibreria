
import express from "express"
import __dirname from "../utils/utils.js"
import userModel from "../models/usuarios.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
dotenv.config();
import usuariosModel from "../models/usuarios.js" 
import genrearToken from '../utils/generarToken.js'


const router = express.Router()
router.use(express.static(__dirname + "/public"))


router.get('/principal', async (req, res) => {
    try {
        res.render('Usuarios', {
            style: 'index.css',
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})

router.get("/usuariosCrear", async (req, res) => {
    return res.render('crearusuario', {
        style: 'index.css',
    })
})


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ email: username });
        
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare( password,user.password)
        
        if (!match) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        } 
    
        // Generar el token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // Usa tu clave secreta (debe estar en .env)
            { expiresIn: '1h' } // El token expira en 1 hora
        )        

        // Enviar el token como respuesta
        res.json( token )
    } catch (err) {
        res.status(500).json({ message: 'Error al intentar iniciar sesión', error: err });
    }
})

router.post("/usuariosCrear", async (req, res) => {
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
        const token = genrearToken.genrearToken(res, guardarusuari)
        console.log(token);
        
        res.json({ token })
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
    }
})


router.post("/perfilU", async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado Authorization
    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // Verificar el token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Usar el correo del usuario decodificado para buscar su perfil
        const usuarioEncontrado = await usuariosModel.findOne({ email: decoded.email });

        if (!usuarioEncontrado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.render('perfil', { style: 'index.css', usuario: usuarioEncontrado });

    } catch (error) {
        console.error(`Error al verificar el token: ${error}`);
        res.status(500).json({ error: "Error del servidor" });
    }
});


export default router