import express from "express"
import { obtenerDocumento, deleteDocumento, ERROR } from "../utils.js"
import librosModel from '../models/libros.js'
import __dirname from "../utils.js"
import mongoose from 'mongoose'


const router = express.Router()
router.use(express.static(__dirname + "/public"))

router.get('/principal', async (req, res) => {
    try {
        const result = await librosModel.find()
            .populate({ path: 'autor' })   
            .populate({ path: 'categorias' });

        res.render('libros', {
            style: 'index.css',
            libros: result
        });
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        res.status(500).send("Error del servidor");
    }
})

router.get('/', async (req, res) => {
    try {
        const result = await librosModel.find()
            .populate({ path: 'autor' })   
            .populate({ path: 'categorias' });

        res.json(result)

    } catch (error) {
        console.error("Error al obtener los libros:", error);
        res.status(500).send("Error del servidor");
    }
})


router.get("/:cid", async (req, res) => {
    try {
        const result = await obtenerDocumento(req.params.cid, librosModel)

        if (!result) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }

        result.save

        
        return res.render('libros', {
            style: 'index.css',
            autor: result
        })

    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`)
    }
})

router.post("/", (async (req, res) => {
    const libro = req.body
    if (!libro.titulo || !libro.descripcion || !libro.autor || !libro.precio || !libro.cantidad || !libro.categorias) {
        return ERROR(res, `Campos Vacios`)
    }
    
    const nuevocategoria = new librosModel({
        titulo: libro.titulo,
        descripcion: libro.descripcion,
        autor: new mongoose.Types.ObjectId(libro.autor) 
          ,
        precio: libro.precio,
        estado: libro.estado,
        cantidad: libro.cantidad,
        categorias:  libro.categorias.map(id => new mongoose.Types.ObjectId(id)) 
    })
    
    try {
        const guardarcategoria = await nuevocategoria.save()
        res.json( guardarcategoria)
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        ERROR(res, `Error del servidor: ${error}`)
    }
}))

router.delete("/:cid", async (req, res) => {
    await deleteDocumento(req.params.cid,librosModel).then(result => {
        if (result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`)
        }
        return res.json('Se elimino el categoria')
    }).catch(error => {
        ERROR(res, `Error del servidor: ${error}`)
    })
})


export default router