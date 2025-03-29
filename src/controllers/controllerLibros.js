// controllers/librosController.js
import librosModel from '../models/libros.js'
import autoresModel from '../models/autores.js'
import categoriasModel from '../models/categorias.js'
import { deleteDocumento, ERROR } from '../utils/utils.js'

export const obtenerLibros = async (req, res) => {
    try {
        const result = await librosModel.find()
            .populate({ path: 'autor' })
            .populate({ path: 'categorias' })

        res.render('librosGestion', {
            style: 'index.css',
            libros: result
        })
    } catch (error) {
        console.error("Error al obtener los libros:", error)
        res.status(500).send("Error del servidor")
    }
}

export const obtenerLibrosJSON = async (req, res) => {
    try {
        const result = await librosModel.find()
            .populate({ path: 'autor' })
            .populate({ path: 'categorias' })

        res.json(result)
    } catch (error) {
        console.error("Error al obtener los libros:", error)
        res.status(500).send("Error del servidor")
    }
}

export const crudLibros = async (req, res) => {
    try {
        const autor = await autoresModel.find()
        const categorias = await categoriasModel.find()
        return res.render('createLibro', {
            style: 'index.css',
            autores: autor,
            categorias: categorias
        })
    } catch (error) {
        console.error("Error al obtener autores y categorías:", error)
        res.status(500).send("Error del servidor")
    }
}

export const obtenerLibroPorTitulo = async (req, res) => {
    try {
        const cid = String(req.params.cid)
        const result = await librosModel
            .find({ titulo: { $regex: `${cid}`, $options: 'i' } })
            .populate({ path: 'autor' })
            .populate({ path: 'categorias' })

        if (!result) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }

        return res.render('libro', {
            style: 'index.css',
            libros: result
        })

    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
}

export const eliminarLibro = async (req, res) => {
    try {
        const result = await deleteDocumento(req.params.cid, librosModel)
        if (result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        return res.json('Se eliminó el libro')
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
}

export const crearLibro = async (req, res) => {
    const libro = req.body

    if (!libro.titulo || !libro.descripcion || !libro.autor || !libro.precio || !libro.cantidad || !libro.categorias) {
        return ERROR(res, `Campos Vacíos`)
    }

    const categoriasArray = Array.isArray(libro.categorias) ? libro.categorias : [libro.categorias]

    const autor1 = await autoresModel.findOne({ nombre: new RegExp(libro.autor, 'i') })
    const categorias = await categoriasModel.find({ nombre: { $in: categoriasArray } })

    const nuevolibro = new librosModel({
        titulo: libro.titulo,
        descripcion: libro.descripcion,
        autor: autor1._id,
        precio: libro.precio,
        estado: libro.estado,
        cantidad: libro.cantidad,
        categorias: categorias
    })

    try {
        // Guardar el libro en la base de datos
        const guardarlibro = await nuevolibro.save()

        // Actualizar la relación con el autor y las categorías
        await autoresModel.findByIdAndUpdate(autor1._id, { $push: { libros: guardarlibro._id } })

        for (let i = 0; i < categorias.length; i++) {
            const categoria = categorias[i]
            await categoriasModel.findByIdAndUpdate(
                categoria._id,
                { $push: { libros: guardarlibro._id } }
            )
        }

        res.status(200).json({ message: 'Libro creado con éxito' })

    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}
