import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const usuarioCollection = "usuarios"

const usuarioSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true })

usuarioSchema.plugin(mongoosePaginate)

const usuariosModel = mongoose.model(usuarioCollection,usuarioSchema)

export default usuariosModel
