import express from "express"
import __dirname from "../utils/utils.js"
import usuariosModel from "../models/usuarios.js" 
import x from "dotenv"
import authMiddleware from '../middlewares/authMiddleware.js'
import jwt from 'jsonwebtoken'

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
        res.render('perfil', { style: 'index.css', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})


router.post("/perfilU",authMiddleware, async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    }

    try {
        // Verificar el token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Usar el correo del usuario decodificado para buscar su perfil
        const usuarioEncontrado = await usuariosModel.findOne({ _id:decoded.id })

        if (!usuarioEncontrado) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        console.log("llegue al fianl del abismo");
        console.log(usuarioEncontrado);

        res.render('perfil',{ style: 'index.css', 
            usuario: usuarioEncontrado })
    
    
    } catch (error) {
        console.error(`Error al verificar el token: ${error}`)
        res.status(500).json({ error: "Error del servidor" })
    }
})


export default router