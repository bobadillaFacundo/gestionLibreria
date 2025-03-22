import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const comprasCollection = "compras"
const comprasSchema = mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
    libros: [{type: mongoose.Schema.Types.ObjectId, ref: 'libros' }]
})


comprasSchema.plugin(mongoosePaginate)
const comprasModel = mongoose.model(comprasCollection,comprasSchema)
export default comprasModel