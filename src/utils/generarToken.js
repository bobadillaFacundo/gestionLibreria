import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generarToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // El token expira en 1 hora
    ) 
} 

export default generarToken