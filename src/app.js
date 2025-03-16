import autores from "./routers/autores.router.js"
import categorias from "./routers/categorias.router.js"
import express from "express"
import engine from "express-handlebars"
import __dirname from './utils.js'
import path from "path"
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Configura Express para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas
app.use('/api/autores', autores);
app.use('/api/categorias', categorias);

// Configuración del motor de vistas
app.engine('handlebars', engine.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Permite acceso a propiedades heredadas
        allowProtoMethodsByDefault: true,    // Permite acceso a métodos heredados
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/css', express.static(path.join(__dirname, 'css')));
// Configurar la ruta para servir archivos estáticos
app.use('/static', express.static(path.join(__dirname, 'public')));

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
});

// Iniciar servidor
const port = 8000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});