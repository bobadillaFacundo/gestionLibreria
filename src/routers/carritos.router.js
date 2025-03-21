import express from "express"
import { ERROR } from "../utils/utils.js"
import authMiddleware from '../middlewares/authMiddleware.js'
import carritosModel from '../models/carritos.js'
import __dirname from "../utils/utils.js"
import usuariosModel from '../models/usuarios.js'
import mongoose from "mongoose"


const router = express.Router()
router.use(express.static(__dirname + "/public"))


// Ruta GET para principal
router.get('/principalGestion', authMiddleware, async (req, res) => {
    try {
        
        let result = await carritosModel.find() .populate({ path: 'usuario' }).populate({
            path: 'libros',
            populate: [
                { path: 'autor' },
                { path: 'categorias'}  
            ]
        })
       
        res.render('carritos', {
            style: 'index.css',
            carrito: result
        })
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
})


// Ruta GET para principal
router.get('/principal/:email', authMiddleware, async (req, res) => {
    try {
        const usuario = await usuariosModel.findOne({ email: req.params.email })
        if (!usuario) {
            return ERROR(res, `Usuario no encontrado`)
        }

        let result = await carritosModel.find({ usuario: usuario._id }) .populate({ path: 'usuario' }).populate({
            path: 'libros',
            populate: [
                { path: 'autor' },
                { path: 'categorias'}  
            ]
        })
       
        if (!result) {
            // Crear carrito con el ObjectId del usuario
            const nuevocarrito = new carritosModel({
                usuario: usuario._id, // Usamos el ObjectId aquí
                libros: []
            })
            usuario.carrito = nuevocarrito._id  // Solo un carrito por usuario
            await usuario.save()
            await nuevocarrito.save()
            result = nuevocarrito
        }
        
        res.render('carrito', {
            style: 'index.css',
            carrito: result[result.length - 1]  // No es necesario usar result[0], ya que es un objeto único
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
        const result = await carritosModel.findOne({ _id: id }).populate({ path: 'libros' }).populate({ path: 'usuario' })
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
router.post("/agregarCarrito", authMiddleware, async (req, res) => {
    try {
        const { usuario, libro } = req.body

        // Buscar el usuario por email
        const usuarioEncontrado = await usuariosModel.findOne({ email: usuario })
        if (!usuarioEncontrado || !usuarioEncontrado.carrito) {
            return res.status(404).json({ error: "Carrito no asignado al usuario" })
        }

        // Obtener el carrito
        const carrito = await carritosModel.findById(usuarioEncontrado.carrito[usuarioEncontrado.carrito.length - 1]._id)
        if (!carrito) {
            const nuevoCarrito = new carritosModel({
                usuario: usuarioEncontrado._id,
                libros: []
            })
            await nuevoCarrito.save()
            nuevoCarrito.libros.push(new mongoose.Types.ObjectId(libro))
            await nuevoCarrito.save()
            usuarioEncontrado.carrito.push(nuevoCarrito._id)
            await usuarioEncontrado.save()
            return res.json({
                mensaje: "Libro agregado al carrito con exito"
            })


        }
        // Validar ID del libro
        if (!mongoose.Types.ObjectId.isValid(libro)) {
            return res.status(400).json({ error: "ID de libro no válido" })
        }

        // Agregar el libro al carrito
        carrito.libros.push(libro)
        await carrito.save()
        usuarioEncontrado.carrito.push(carrito._id)
        await usuarioEncontrado.save()
        return res.json({ mensaje: "Libro agregado al carrito con éxito" })
    } catch (error) {
        console.error("Error al procesar el registro:", error)
        return res.status(500).json({ error: "Error en el registro" })
    }
})


export default router