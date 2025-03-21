import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const categoriaCollection = "categorias"
const categoriasSchema = mongoose.Schema({
    nombre: { type: String , required: true, unique: true },
    libros: [{type: mongoose.Schema.Types.ObjectId, ref: 'libros' }]
})

categoriasSchema.plugin(mongoosePaginate)
const categoriaModel = mongoose.model(categoriaCollection,categoriasSchema)
export default categoriaModel