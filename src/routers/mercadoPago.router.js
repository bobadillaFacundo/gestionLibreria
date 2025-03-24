import dotenv from "dotenv"
import express from "express"
import __dirname from "../utils/utils.js"
import mercadopago from "mercadopago"
import authMiddleware from "../middlewares/authMiddleware.js"


const router = express.Router()
router.use(express.static(__dirname + "/public"))

dotenv.config()

const mp = new mercadopago.MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN })

router.post('/procesar-pago',authMiddleware,async (req, res) => {
    try {
        
        
        const { nombre, numero, vencimiento, cvv, monto } = req.body;
        
        // Crea la preferencia de pago
        const preference = {
            transaction_amount: parseFloat(monto),
            description: "Pago con tarjeta",
            payment_method_id: "visa",  // Puedes modificarlo según sea necesario
            payer: {
                email: "comprador@correo.com" // Debes obtenerlo de tu base de datos o formulario
            }
        };

        const pago = await mercadopago.payment.create(preference);

        res.json({ mensaje: "Pago procesado con éxito", id_pago: pago.body.id })
    } catch (error) {
        console.error("Error procesando pago:", error);
        res.status(500).json({ mensaje: "Error al procesar el pago" })
    }
})

router.get('/mostrarPagar/:monto', authMiddleware, async (req, res) => {
    try {
        res.render('mercadoPago', {
            style: 'index.css',
            monto: req.params.monto // Ahora sí existe req.params.monto
        });
    } catch (error) {
        console.error("Error procesando pago:", error);
        res.status(500).json({ mensaje: "Error al procesar el pago" })
    }
})

export default router