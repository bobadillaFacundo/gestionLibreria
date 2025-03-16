import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const autorCollection = "autores"
const autoresSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true }, 
    libros: [{ _id: {type: mongoose.Schema.Types.ObjectId, ref: 'libros' }  }]
        })

autoresSchema.plugin(mongoosePaginate)
const autoresModel = mongoose.model(autorCollection,autoresSchema)
export default autoresModel