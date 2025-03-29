import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import usuariosModel from "../models/usuarios.js"
import { ERROR } from "../utils/utils.js"

// Función para crear un usuario
export const crearUsuario = async (req, res) => {
    const usuario = req.body
    
    if (!usuario.username || !usuario.password) {
        return ERROR(res, `Campos Vacios`)
    }

    const nuevoUsuario = new usuariosModel({
        email: usuario.username,
        password: bcrypt.hashSync(usuario.password, 10),
        tipo:  "comun",
        carrito : []
    })
    
    try {
        const guardarusuari = await nuevoUsuario.save()
        const token = jwt.sign(
                { id: guardarusuari._id, email: guardarusuari.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' } // El token expira en 1 hora
            )
        res.json({ token })
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        res.status(500).json({ message: 'Error al crear el usuario' })
    }
}

// Función para realizar el login
export const loginUsuario = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await usuariosModel.findOne({ email: username })
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Credenciales incorrectas' })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // El token expira en 1 hora            
        )    

        res.json({ token })
    } catch (error) {
        console.error(`Error en el login: ${error}`)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
