const mongoose = require('mongoose')
const bluebird = require('bluebird')

const conn = require("../config/conn")


mongoose.Promise = bluebird;

//let dbURI = 'mongodb://localhost:27017/test_nodeapi';
let dbURI = conn.mlab

// connecting mongoose to our db
// mongoose.connect(dbURI, { useNewUrlParser: true })
mongoose.connect(dbURI, { 
  useNewUrlParser: true,
  useCreateIndex: true 
})
// connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection successfully on ' + dbURI)
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error' + err)
});