import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const categoriaCollection = "categorias"
const categoriasSchema = mongoose.Schema({
    nombre: { type: String , required: true }
})

categoriasSchema.plugin(mongoosePaginate)
const categoriaModel = mongoose.model(categoriaCollection,categoriasSchema)
export default categoriaModel