
import express from "express"
import __dirname from "../utils/utils.js"
import x from "dotenv"

x.config();

const router = express.Router()
router.use(express.static(__dirname + "/public"))


router.get('/principal', async (req, res) => {
    console.log('Renderizando vista usuarios');

    try {
        res.render('usuarios', {
            style: 'index.css',
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})

export default router