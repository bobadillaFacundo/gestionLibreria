import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const librosCollection = "libros"
const librosSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },  
  autor : {  type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true },  
  precio: { type: Number, required: true },
  estado: { type: Boolean, default: true },
  cantidad: { type: Number, required: true },
  categoria: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categorias', required: true }]
})
librosSchema.plugin(mongoosePaginate)
const librosModel = mongoose.model(librosCollection, librosSchema)
export default librosModel