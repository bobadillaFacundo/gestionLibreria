import dotenv from "dotenv"
import express from "express"
import __dirname from "../utils/utils.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import mercadopago from "mercadopago"

const router = express.Router()
router.use(express.static(__dirname + "/public"))

dotenv.config()

router.post('/procesar-pago', authMiddleware, async (req, res) => {
    try {
        const { monto } = req.body;
        console.log(monto)
        // Crear la preferencia de pago
        const prefe = {
            items: [
                {
                    title: "Pago con tarjeta",
                    unit_price: parseFloat(monto),
                    quantity: 1,
                },
            ],
            back_urls: {
                success: process.env.SUCCESS_URL,
                failure: process.env.FAILURE_URL,
                pending: process.env.PENDING_URL,
            },
            auto_return: "approved", // Esto hace que redirija automáticamente después del pago
        }
        console.log("Success URL:", process.env.SUCCESS_URL);
        console.log("Failure URL:", process.env.FAILURE_URL);
        console.log("Pending URL:", process.env.PENDING_URL);
        const mercadoPagoClient = new mercadopago.MercadoPagoConfig({
            accessToken: process.env.ACCESS_TOKEN,
        })

        const preference = new mercadopago.Preference(mercadoPagoClient);
        const pago = await preference.create(prefe)

        res.json({ preferenceId: pago.body.id })
    } catch (error) {
        console.error("Error procesando pago:", error)
        res.status(500).json({ mensaje: "Error al procesar el pago" })
    }
})


router.get('/mostrarPagar/:monto', authMiddleware, async (req, res) => {
    try {
        res.render('mercadoPago', {
            style: 'index.css',
            monto: req.params.monto
        })
    } catch (error) {
        console.error("Error procesando pago:", error);
        res.status(500).json({ mensaje: "Error al procesar el pago" })
    }
})

export default router