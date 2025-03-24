import express from "express"
import { ERROR } from "../utils/utils.js"
import authMiddleware from '../middlewares/authMiddleware.js'
import carritosModel from '../models/carritos.js'
import __dirname from "../utils/utils.js"
import usuariosModel from '../models/usuarios.js'
import mongoose from "mongoose"
import librosModel from '../models/libros.js'

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
        if(usuarioEncontrado.carrito.length === 0){
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
        // Obtener el carrito
        const carrito = await carritosModel.findById(usuarioEncontrado.carrito[usuarioEncontrado.carrito.length - 1]._id)
    
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
router.post('/buscarMontoCarrito', authMiddleware, async (req, res) => {
    try {
        const { email } = req.body
        let carritoMonto = 0
        // Busca el carrito correspondiente al email
        const result = await carritosModel.find().populate({ path: 'libros' }).populate({ path: 'usuario' })
        result.forEach(carrito => {
            if (carrito.usuario.email === email) {
                carrito.libros.forEach(libro => {
                    carritoMonto += libro.precio
                })
            }
        })
        // Verifica si se encontró el carrito
        if (!result) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado' })
        }

        // Devuelve el monto en la respuesta
        res.json({ carritoMonto })
    } catch (error) {
        console.error('Error al calcular el monto:', error);
        res.status(500).json({ mensaje: `Error del servidor: ${error.message}` })
    }
})
router.put('/eliminarLibro', authMiddleware, async (req, res) => {
    try {
        const { id, email } = req.body
        
        // Busca el carrito correspondiente al email
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ error: "ID de libro no válido" })
        }

        const idObj = new mongoose.Types.ObjectId(id)
        const user = await usuariosModel.findOne({ email: email })
        const carrito = await carritosModel.findOne({ usuario: user._id })
        

        for await (const libroEncontado of carrito.libros) {
            if (libroEncontado._id.equals(idObj)) {
                await carritosModel.updateOne({ _id: carrito._id }, { $pull: { libros: idObj } })
                break
            }  
        }
        

        const libro = await librosModel.findById(idObj)
        libro.cantidad += 1
        libro.save()
        await carrito.save()

        res.json({ message: 'Libro eliminado del carrito' })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ mensaje: `Error del servidor: ${error.message}` })
    }  
})


export default router