import categoriasModel from '../models/categorias.js'
import { ERROR } from '../utils/utils.js'

// Controlador para obtener todas las categorías
export const obtenerTodasLasCategorias = async (req, res) => {
    try {
        const result = await categoriasModel.find().populate({ path: 'libros' })
        res.render('categorias', {
            style: 'index.css',
            categorias: result
        })
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
}

// Controlador para renderizar la vista para crear una nueva categoría
export const crearCategoriaVista = (req, res) => {
    return res.render('createCatgeoria', {
        style: 'index.css',
    })
}

// Controlador para obtener las categorías como JSON
export const obtenerCategorias = async (req, res) => {
    try {
        const result = await categoriasModel.find().populate({ path: 'libros' })
        res.json(result)
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
}

// Controlador para obtener una categoría por su ID
export const obtenerCategoriaPorId = async (req, res) => {
    try {
        const result = await categoriasModel.find({ _id: req.params.cid }).populate({ path: 'libros' })

        if (!result) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }

        return res.render('categoria', {
            style: 'index.css',
            autor: result
        })

    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
}

// Controlador para crear una nueva categoría
export const crearCategoria = async (req, res) => {
    const categoria = req.body
    if (!categoria.nombre) {
        return ERROR(res, `Campos Vacios`)
    }
    const nuevocategoria = new categoriasModel({
        nombre: categoria.nombre,
        libros: []
    })
    try {
        const guardarcategoria = await nuevocategoria.save()
        res.json(guardarcategoria)
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}

// Controlador para eliminar una categoría por su ID
export const eliminarCategoria = async (req, res) => {
    try {
        const result = await categoriasModel.deleteOne({ _id: req.params.cid })

        if (!result || result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        return res.json('Se eliminó la categoría')
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
}
