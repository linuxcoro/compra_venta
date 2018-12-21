const mongoose = require('mongoose')
let Schema = mongoose.Schema

let CategorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url : {type: String, require: true, minlenght: 2 , maxlenght: 125},
},{collection: 'category'})

module.exports = mongoose.model('category', CategorySchema)