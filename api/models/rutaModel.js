const mongoose = require('mongoose')
let Schema = mongoose.Schema

let rutaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    direccionSgc: { type: String, require: true },
    direccion: { type: String, require: true },
    latitud: { type: String, require: true },
    longitud: { type: String, require: true },
    ubicacion: { type: String, require: true },
    comentario: { type: String, require: true },
    fechaInstalacion: { type: String, require: true },
    activo: { type: Number, require: true }
},{collection: 'rutas'})

module.exports = mongoose.model('rutas', rutaSchema)

