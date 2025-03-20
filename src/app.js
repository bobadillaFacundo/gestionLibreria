import autores from "./routers/autores.router.js";
import categorias from "./routers/categorias.router.js";
import libros from "./routers/libros.router.js";
import usuarios from "./routers/usuarios.router.js";
import express from "express";
import {engine} from "express-handlebars";
import __dirname from './utils/utils.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authMiddleware from "./middlewares/authMiddleware.js";
import login from "./routers/login.router.js";
import path from "path"

dotenv.config()

const app = express()

// Configura Express para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de vistas
app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Permite acceso a propiedades heredadas
        allowProtoMethodsByDefault: true,    // Permite acceso a métodos heredados
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'views'))

// Rutas de archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'src', 'public', 'css')));
app.use('/static', express.static(path.join(__dirname, 'src', 'public')));

// Configuración de rutas
app.use('/api/autores', authMiddleware, autores);
app.use('/api/categorias', authMiddleware, categorias);
app.use('/api/libros', authMiddleware, libros);
app.use('/api/usuarios', authMiddleware, usuarios);
app.use('/api/login', login);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
});

// Iniciar servidor
const port =  process.env.PORT 
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
