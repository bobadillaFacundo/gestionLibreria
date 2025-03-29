import express from "express"
import __dirname from "../utils/utils.js"
import { crearUsuario, loginUsuario } from "../controllers/controllerLogin.js"

const router = express.Router()
router.use(express.static(__dirname + "/public"))

router.get('/principal', async (req, res) => {
    try {
        res.render('Usuarios', {
            style: 'index.css'
        })
    } catch (error) {
        console.error(error) 
        res.status(500).send('Error del servidor') 
    }
})

router.get("/usuariosCrear", async (req, res) => {
    return res.render('crearusuario', {
        style: 'index.css'
    })
})

// Usa los controladores en las rutas
router.post("/usuarioCrea", crearUsuario)

router.post("/login", loginUsuario)

export default router
