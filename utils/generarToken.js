import jwt from 'jsonwebtoken';

const generarToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // El token expira en 1 hora
    );
};

export default generarToken