import { ERROR } from "../utils/utils.js"
import carritosModel from '../models/carritos.js'
import usuariosModel from '../models/usuarios.js'
import mongoose from "mongoose"
import librosModel from '../models/libros.js'

// Controlador para la ruta principal de la gestión de carritos
export const obtenerCarritosGestion = async (req, res) => {
    try {
        let result = await carritosModel.find()
            .populate({ path: 'usuario' })
            .populate({
                path: 'libros',
                populate: [
                    { path: 'autor' },
                    { path: 'categorias' }
                ]
            })

        res.render('carritos', {
            style: 'index.css',
            carrito: result
        })
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
}

// Controlador para la ruta principal del carrito por email
export const obtenerCarritoPorEmail = async (req, res) => {
    try {
        const usuario = await usuariosModel.findOne({ email: req.params.email })
        if (!usuario) {
            return ERROR(res, `Usuario no encontrado`)
        }

        let result = await carritosModel.find({ usuario: usuario._id })
            .populate({ path: 'usuario' })
            .populate({
                path: 'libros',
                populate: [
                    { path: 'autor' },
                    { path: 'categorias' }
                ]
            })

        if (!result) {
            const nuevocarrito = new carritosModel({
                usuario: usuario._id,
                libros: []
            })
            usuario.carrito = nuevocarrito._id
            await usuario.save()
            await nuevocarrito.save()
            result = nuevocarrito
        }

        res.render('carrito', {
            style: 'index.css',
            carrito: result[result.length - 1]
        })
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
}

// Controlador para obtener todos los carritos
export const obtenerCarritos = async (req, res) => {
    try {
        const result = await carritosModel.find().populate({ path: 'libros' })
        res.json(result)
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
}

// Controlador para crear un nuevo carrito
export const crearCarrito = async (req, res) => {
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

// Controlador para la compra
export const obtenerCompra = async (req, res) => {
    try {
        const result = await carritosModel.findOne({ _id: req.body.id }).populate({ path: 'libros' }).populate({ path: 'usuario' })
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
}

// Controlador para agregar un libro al carrito
export const agregarLibroCarrito = async (req, res) => {
    try {
        const { usuario, libro } = req.body

        const usuarioEncontrado = await usuariosModel.findOne({ email: usuario })
        if (!usuarioEncontrado || !usuarioEncontrado.carrito) {
            return res.status(404).json({ error: "Carrito no asignado al usuario" })
        }

        if (usuarioEncontrado.carrito.length === 0) {
            const nuevoCarrito = new carritosModel({
                usuario: usuarioEncontrado._id,
                libros: []
            })
            await nuevoCarrito.save()
            nuevoCarrito.libros.push(new mongoose.Types.ObjectId(libro))
            await nuevoCarrito.save()
            usuarioEncontrado.carrito.push(nuevoCarrito._id)
            await usuarioEncontrado.save()
            return res.json({ mensaje: "Libro agregado al carrito con éxito" })
        }

        const carrito = await carritosModel.findById(usuarioEncontrado.carrito[usuarioEncontrado.carrito.length - 1]._id)

        if (!mongoose.Types.ObjectId.isValid(libro)) {
            return res.status(400).json({ error: "ID de libro no válido" })
        }

        carrito.libros.push(libro)
        await carrito.save()
        usuarioEncontrado.carrito.push(carrito._id)
        await usuarioEncontrado.save()
        return res.json({ mensaje: "Libro agregado al carrito con éxito" })
    } catch (error) {
        console.error("Error al procesar el registro:", error)
        return res.status(500).json({ error: "Error en el registro" })
    }
}

// Controlador para buscar el monto total del carrito
export const buscarMontoCarrito = async (req, res) => {
    try {
        const { email } = req.body
        let carritoMonto = 0
        const result = await carritosModel.find().populate({ path: 'libros' }).populate({ path: 'usuario' })
        
        result.forEach(carrito => {
            if (carrito.usuario.email === email) {
                carrito.libros.forEach(libro => {
                    carritoMonto += libro.precio
                })
            }
        })

        if (!result) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado' })
        }

        res.json({ carritoMonto })
    } catch (error) {
        console.error('Error al calcular el monto:', error);
        res.status(500).json({ mensaje: `Error del servidor: ${error.message}` })
    }
}

// Controlador para eliminar un libro del carrito
export const eliminarLibroCarrito = async (req, res) => {
    try {
        const { id, email } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de libro no válido" })
        }

        const idObj = new mongoose.Types.ObjectId(id)
        const user = await usuariosModel.findOne({ email: email })
        const carrito = await carritosModel.findOne({ usuario: user._id })

        for (const libroEncontado of carrito.libros) {
            if (libroEncontado._id.equals(idObj)) {
                await carritosModel.updateOne({ _id: carrito._id }, { $pull: { libros: idObj } })
                break
            }
        }

        const libro = await librosModel.findById(idObj)
        libro.cantidad += 1
        await libro.save()
        await carrito.save()

        res.json({ message: 'Libro eliminado del carrito' })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ mensaje: `Error del servidor: ${error.message}` })
    }
}
