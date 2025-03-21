import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const carritosCollection = "carritos"
const carritosSchema = mongoose.Schema({
    usuario0:{type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
    libros: [{type: mongoose.Schema.Types.ObjectId, ref: 'libros' }]
})

carritosSchema.plugin(mongoosePaginate)
const carritosModel = mongoose.model(carritosCollection,carritosSchema)
export default carritosModel