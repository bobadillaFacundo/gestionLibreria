import comprasModel from "../models/compra.js";
import carritosModel from "../models/carritos.js";
import librosMyModel from "../models/libros.js";
import usuariosModel from "../models/usuarios.js";
import mongoose from "mongoose";
import { ERROR } from "../utils/utils.js";

// Obtener todas las compras
export const getAllCompras = async (req, res) => {
    try {
        const result = await comprasModel.find()
            .populate({ path: 'usuario' })
            .populate({ path: 'libros', populate: { path: 'autor' } })
            .populate({ path: 'libros', populate: { path: 'categorias' } });

        res.render('compras', {
            style: 'index.css',
            compras: result
        });
    } catch (error) {
        console.error("Error al obtener las compras:", error);
        res.status(500).send("Error del servidor");
    }
};

// Registrar una compra
export const registrarCompra = async (req, res) => {
    try {
        const carritoId = req.body.idCarrito;

        if (!carritoId || typeof carritoId !== 'string' || !mongoose.Types.ObjectId.isValid(carritoId)) {
            return res.status(400).json({ error: 'ID de compra inválido' });
        }

        const objectId = new mongoose.Types.ObjectId(carritoId);
        const carrito = await carritosModel.findById(objectId)
            .populate({ path: 'libros', populate: { path: 'autor' } })
            .populate({ path: 'libros', populate: { path: 'categorias' } })
            .populate({ path: 'usuario' });

        if (!carrito) {
            return ERROR(res, `Carrito no encontrado`);
        }

        const libros = carrito.libros;
        const usuario = carrito.usuario;

        if (!libros || !usuario) {
            return ERROR(res, `Campos Vacios`);
        }

        const compra = new comprasModel({
            usuario: usuario._id,
            libros: libros
        });

        try {
            const guardador = await compra.save();
            usuario.compras.push(guardador._id);

            for (const libro of carrito.libros) {
                console.log(`Actualizando libro con ID: ${libro._id}`);
                // Resta uno a la cantidad del libro
                await librosMyModel.findByIdAndUpdate(
                    libro._id,
                    { $inc: { cantidad: -1 } }  // Usamos $inc para incrementar o decrementar el valor
                );
            }

            await usuario.save();
            carrito.libros = [];
            await carrito.save();
            res.send("compra realizada");
        } catch (error) {
            console.error("Error al registrar la compra:", error);
            res.status(500).send("Error del servidor");
        }
    } catch (error) {
        console.error("Error al registrar la compra:", error);
        res.status(500).send("Error del servidor");
    }
};

// Obtener las compras de un usuario por email
export const getComprasByUsuario = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await usuariosModel.findOne({ email: email });

        if (!user) {
            return ERROR(res, `Usuario no encontrado`);
        }

        const result = await comprasModel.find({ usuario: user._id })
            .populate({ path: 'usuario' })
            .populate({ path: 'libros', populate: { path: 'autor' } })
            .populate({ path: 'libros', populate: { path: 'categorias' } });

        if (!result) {
            return ERROR(res, `Compras no encontradas`);
        }

        res.render('comprasUsuario', {
            style: 'index.css',
            compras: result
        });
    } catch (error) {
        console.error("Error al obtener las compras:", error);
        res.status(500).send("Error del servidor");
    }
};
