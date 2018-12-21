const mongoose = require("mongoose")
const request = require('request')
const cheerio = require('cheerio')
const bcrypt = require("bcryptjs")


const MongoClient = require('mongodb').MongoClient;
const con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";

// 1238
for(let i=1231; i<1238; i++){
  let path = `https://www.paginasamarillas.com.ar/b/construccion/c/p-${i}/`
  request({method: 'GET', url: path, headers: {'User-Agent': 'MyAgent'}}, function(err,res,html){
  //request(path, function(err,res,html){
    if (!err) {
      const $ = cheerio.load(html)
      //.attr('href')
      $(".businesses li").each(function(i, elem) {
        ruta = $(this).attr('data-href')
        if (typeof ruta !== 'undefined'){
          //console.log(ruta)
          let myobj = {
              hash: bcrypt.hashSync(ruta, 10),
              name: ruta
          }
          insertardb(myobj)
        }
      })
    }
  })
}


function insertardb(myobj){
  MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
    var dbo = db.db("linuxcoro");
    dbo.collection("category").findOne({'hash':myobj.hash}, function(err, result) {
      if (!result) {
        dbo.collection("category").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        })
      }
      else{
        db.close();
        console.log('no')
      }
    }) 
  })
} 