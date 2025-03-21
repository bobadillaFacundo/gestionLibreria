import express from "express"
import { ERROR } from "../utils/utils.js"
import authMiddleware from '../middlewares/authMiddleware.js'
import carritosModel from '../models/carritos.js'


const router = express.Router()
router.use(express.static(__dirname + "/public"))


router.get('/principal/:email', authMiddleware, async (req, res) => {

    try {
        const result = await carritosModel.findOne({ email: req.params.email }).populate({ path: 'libros' })
        if (!result) {
            //crear carrito
            const nuevocarrito = new carritosModel({
                usuario:  req.params.email ,
                libros: []
            })
             result =  await nuevocarrito.save()
        }
        res.render('carrito', {
            style: 'index.css',
            carrito: result
        })
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }

})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await carritosModel.find().populate({ path: 'libros' })
        res.json(result)
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
})

router.post("/", authMiddleware, (async (req, res) => {
    const carrito = req.body
    if (!carrito.libros || !carrito.usuario) {
        return ERROR(res, `Campos Vacios`)
    }
    const nuevocarrito = new carritosModel({
        usuario: carrito.usuario,
        libros: carrito.libros
    })

    try {

        const guardadorcarrito = await nuevocarrito.save()
        res.json(guardadorcarrito)
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}))

router.get('/compra', authMiddleware, async (req, res) => {
    try {
        const result = await carritosModel.findOne({ _id: id }).populate({ path: 'libros' })
        if (!result) {
            const carrito = req.body
            if (!carrito.libros || !carrito.usuario) {
                return ERROR(res, `Campos Vacios`)
            }
            const nuevocarrito = new carritosModel({
                usuario: carrito.usuario,
                libros: carrito.libros
            })

            try {

                const guardadorcarrito = await nuevocarrito.save()
                res.json(guardadorcarrito)
            } catch (error) {
                console.error(`Error al insertar documento, ${error}`)
                ERROR(res, `Error del servidor: ${error}`)
            }
        }
        return res.render('compra', {
            style: 'index.css',
            carrito: result
        })
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
})

app.post("/agregarCarrito", async (req, res) => {
    try {
        const { id, libro } = req.body 
        const carrito = await carritosModel.findById(id) 
        if (!carrito) { // Verificar si el carrito existe
            return res.status(404).json({ error: "Carrito no encontrado" })     
        }   

        carrito.libros.push(libro)
        await carrito.save() 

        return res.json({ mensaje: "Resgitro realizadio con éxito", id }) 
    } catch (error) {
        console.error("Error al procesar el registro:", error) 
        return res.status(500).json({ error: "Error en el registro" }) 
    }
}) 

export default router