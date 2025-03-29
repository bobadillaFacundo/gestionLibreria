import usuariosModel from "../models/usuarios.js";
import librosModel from "../models/libros.js";

// Controlador para la ruta '/gestion'
export const gestionPage = async (req, res) => {
  try {
    res.render('index', {
      style: 'index.css'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Controlador para la ruta '/libros'
export const librosPage = async (req, res) => {
  try {
    const libros = await librosModel.find()
      .populate({ path: 'autor' })
      .populate({ path: 'categorias' });

    res.render('libros', {
      style: 'index.css',
      libros
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Controlador para la ruta '/perfil/:id'
export const perfilPage = async (req, res) => {
  try {
    const usuario = await usuariosModel.findOne({ email: req.params.id });

    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }

    if (usuario.tipo === 'admin') {
      res.render('admin', { style: 'index.css', usuario });
    } else {
      res.render('perfil', { style: 'index.css', usuario });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};
