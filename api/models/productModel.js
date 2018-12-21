const mongoose = require('mongoose')
let Schema = mongoose.Schema

let productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    price: { type: Number, require: true }
},{collection: 'Product'})

module.exports = mongoose.model('Product', productSchema)

