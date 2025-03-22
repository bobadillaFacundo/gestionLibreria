import express from "express"
import carritosModel from '../models/carritos.js'
import __dirname from "../utils/utils.js"
import authMiddleware from '../middlewares/authMiddleware.js'
import dotenv from "dotenv"
import librosMyModel from "../models/libros.js"
import mongoose from "mongoose"
import comprasModel from "../models/compra.js"
import { ERROR } from "../utils/utils.js"



dotenv.config()

const router = express.Router()
router.use(express.static(__dirname + "/public"))   


router.get('/principal',authMiddleware, async (req, res) => {
    try {
        const result = await comprasModel.find().populate({ path: 'usuario' }).populate({ path: 'libros', populate: { path: 'autor' } }).
        populate({ path: 'libros', populate: { path: 'categorias' } })

    
        res.render('compras', {
            style: 'index.css',
            compras: result
        })   
        console.log(result)
        
    } catch (error) {   
        console.error("Error al obtener las compras:", error) 
        res.status(500).send("Error del servidor")
    }
})

router.post('/registrarCompra',authMiddleware, async (req, res) => {
    try {
      
        const carritoId = req.body.idCarrito
        console.log(carritoId)
        
        if (!carritoId || typeof carritoId !== 'string' || !mongoose.Types.ObjectId.isValid(carritoId)) {
            return res.status(400).json({ error: 'ID de compra inválido' });
        }
        
        const objectId = new mongoose.Types.ObjectId(carritoId)
        const carrito = await carritosModel.findById(objectId).
        populate({ path: 'libros', populate: { path: 'autor' } })
        .populate({ path: 'libros', populate: { path: 'categorias' } })
        .populate({ path: 'usuario' })
        
        if (!carrito) {
            return ERROR(res, `Carrito no encontrado`)
        }
        const libros = carrito.libros
        const usuario = carrito.usuario
        if (!libros || !usuario) {
            return ERROR(res, `Campos Vacios`)
        }
        const compra = new comprasModel({
            usuario: usuario._id,
            libros: libros
        })
        try {
            const guardador = await compra.save()
            usuario.compras.push(guardador._id)
            
            carrito.libros.forEach(async libro => {
                await librosMyModel.findByIdAndUpdate(
                libro._id, 
                { cantidad : libro.cantidad - 1 } )
            })              
            
            
            usuario.save()
            carrito.libros = []
            carrito.save()
            res.send("compra relazada")


        } catch (error) {
            console.error("Error al registrar la compra:", error) 
            res.status(500).send("Error del servidor")
        }


    } catch (error) {
        console.error("Error al registrar la compra:", error) 
        res.status(500).send("Error del servidor")
    }
})

export default router