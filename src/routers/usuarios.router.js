import express from "express"
import __dirname from "../utils/utils.js"
import usuariosModel from "../models/usuarios.js" 
import x from "dotenv"
import authMiddleware from '../middlewares/authMiddleware.js'

x.config();

const router = express.Router()
router.use(express.static(__dirname + "/public"))

router.get('/gestion',authMiddleware, async (req, res) => {
    try {
        res.render('index', {
            style: 'index.css'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})
router.get('/perfil/:id', async (req, res) => {
    try {
        const usuario = await usuariosModel.findOne({email: req.params.id})
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render('perfil', { style: 'index.css', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})



export default router