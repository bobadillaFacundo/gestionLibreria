import express from "express"
import __dirname, { obtenerDocumento } from "../utils/utils.js"
import usuariosModel from "../models/usuarios.js" 
import x from "dotenv"
import authMiddleware from '../middlewares/authMiddleware.js'
import librosModel from '../models/libros.js'
import { obtenerTodosLosDocumentos } from "../utils/utils.js"



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

router.get('/libros',authMiddleware, async (req, res) => {
    try {
        const libros = await librosModel.find()
        .populate({ path: 'autor' })   
        .populate({ path: 'categorias' })
        
       res.render('libros', {
            style: 'index.css',
            libros
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
        if(usuario.tipo === 'admin'){
            res.render('admin', { style: 'index.css', usuario });
        }else{
            res.render('perfil', { style: 'index.css', usuario });
        }
        
            
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})



export default router