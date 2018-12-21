const mongoose = require('mongoose')
let Schema = mongoose.Schema

let PersonSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {type: String, require: true, minlenght: 2 , maxlenght: 30},
    lastName: {type: String, require: true, minlenght: 2, maxlenght: 30},
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
},{collection: 'person'})

module.exports = mongoose.model('person', PersonSchema)