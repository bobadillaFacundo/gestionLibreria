import autoresModel from '../models/autores.js';
import usuariosModel2 from '../models/usuarios.js';
import { ERROR, obtenerTodosLosDocumentos } from '../utils/utils.js';

const obtenerAutores = async (req, res) => {
    try {
        const c = req.params.email;
        const autores = await autoresModel.find().populate('libros');
        const usuario = await usuariosModel2.findOne({ email: c });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (usuario.tipo === 'comun') {
            res.render('autoresUsuario', {
                style: 'index.css',
                autores: autores,
            });
        } else {
            res.render('autores', {
                style: 'index.css',
                autores: autores,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al conectar o interactuar con la base de datos', error });
    }
};

const obtenerAutorPorId = async (req, res) => {
    try {
        const datos = req.params.user;
        const id = req.params.cid;
        const usuario = await usuariosModel2.findOne({ email: datos });

        if (!usuario) {
            return res.status(404).json({ error: "Error del servidor: ID no Existe" });
        }

        const result = await autoresModel
            .find({ nombre: { $regex: `${id}`, $options: 'i' } })
            .populate('libros');

        if (!result) {
            return res.status(404).json({ error: "Error del servidor: ID no Existe" });
        }

        if (usuario.tipo === 'comun') {
            res.render('autoreUsuario', {
                style: 'index.css',
                autor: result,
            });
        } else {
            res.render('autor', {
                style: 'index.css',
                autor: result,
            });
        }
    } catch (error) {
        return res.status(500).json({ error: `Error del servidor: ${error.message} ` });
    }
};

const obtenerAutorParaUsuario = async (req, res) => {
    try {
        const cid = req.params.cid;
        const result = await autoresModel
            .find({ nombre: { $regex: `${cid}`, $options: 'i' } })
            .populate('libros');

        if (!result) {
            return res.status(404).json({ error: "Error del servidor: ID no Existe" });
        }

        return res.render('autorUsuario', {
            style: 'index.css',
            autor: result,
        });
    } catch (error) {
        return res.status(500).json({ error: `Error del servidor: ${error.message} ` });
    }
};

const crearAutor = async (req, res) => {
    const autor = req.body;
    if (!autor.nombre || !autor.edad) {
        return ERROR(res, `Campos Vacíos`);
    }
    const nuevoAutor = new autoresModel({
        nombre: autor.nombre,
        edad: autor.edad,
        libros: [],
    });
    try {
        const guardarAutor = await nuevoAutor.save();
        res.json({ message: 'Autor creado con éxito', autor: guardarAutor });
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`);
        ERROR(res, `Error del servidor: ${error}`);
    }
};

const eliminarAutor = async (req, res) => {
    try {
        const result = await autoresModel.deleteOne({ _id: req.params.cid });
        if (!result || result.deletedCount === 0) {
            return ERROR(res, `Error del servidor: ID no Existe`);
        }
        return res.json('Se eliminó el autor');
    } catch (error) {
        ERROR(res, `Error del servidor: ${error}`);
    }
};

export default {
    obtenerAutores,
    obtenerAutorPorId,
    obtenerAutorParaUsuario,
    crearAutor,
    eliminarAutor,
};
