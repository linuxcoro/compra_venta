const mongoose = require("mongoose");
const request = require('request')
const path = "https://api.mlab.com/api/1/databases/linuxcoro/collections/category?l=27225&apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i"
const bcrypt = require("bcryptjs")

const MongoClient = require('mongodb').MongoClient;
const con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";



const cheerio = require('cheerio')

const json2xls = require('json2xls');
const fs = require('fs')
//const element = require("../controllers/category.json")


let title
let slg
let lnk
let ctg
let plc
let addr
let hor

let inicio=process.argv[2]
let fin=process.argv[3]

// 27225
request(path, function(error, response, html){
    if(!error){
        const arr = JSON.parse(html)
        for(i=inicio;i<fin;i++){
            var element = arr[i]
            llamar(element.name)            
        }
    }
})

function llamar(element){
  request({method: 'GET', url: element, headers: {'User-Agent': 'MyAgent'}}, function(err,res,html){
    if (!err) {
      const $ = cheerio.load(html)
      $.html()
      title = $("strong").text() // titulo
      slg = $(".aboutinfo").text().trim() //eslogan
      tlf = $("a.main-phone").text().trim() // telefono
      lnk = $("a.link-decorable").text().trim() // enlace
      ctg = $("[itemprop='itemListElement']").eq(1).text().trim()
      plc = $(".servicesList").text().trim().replace(/[\t\r]/g,"").replace(/[\n]/g," ") // palabras claves
      addr = $("[data-anchor='map-container']").text().trim().replace(/[\t\r]/g,"").replace(/[\n]/g," ") // direccion
      hor = $(".openingHoursContainer").text().trim().replace(/[\t\r]/g,"").replace(/[\n]/g," ")  // horario

      myobj={
        hash: bcrypt.hashSync(title+lnk, 10),
        titulo: title,
        slogan: slg,
        telefono: tlf,
        link: lnk,
        categoria: ctg,
        palabras: plc,
        direccion: addr,
        horario: hor
      }
      insertardb(myobj)
    }
  })

}

function insertardb(myobj){
  MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
    var dbo = db.db("linuxcoro");
    dbo.collection("scraping").findOne({'hash':myobj.hash}, function(err, result) {
      if (!result) {
        dbo.collection("scraping").insertOne(myobj, function(err, res) {
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




/*
request({method: 'GET', url: path, headers: {'User-Agent': 'MyAgent'}}, function(err,res,html){
  if (!err) {
    const $ = cheerio.load(html)
    $.html()
    title = $("strong").text() // titulo
    slg = $(".aboutinfo").text().trim() //eslogan
    tlf = $("a.main-phone").text().trim() // telefono
    lnk = $("a.link-decorable").text().trim() // enlace
    ctg = $("[itemprop='itemListElement']").eq(1).text().trim()
    plc = $(".servicesList").text().trim().replace(/[\t\r]/g,"").replace(/[\n]/g," ") // palabras claves
    addr = $("[data-anchor='map-container']").text().trim().replace(/[\t\r]/g,"").replace(/[\n]/g," ") // direccion
    hor = $(".openingHoursContainer").text().trim().replace(/[\t\r]/g,"").replace(/[\n]/g," ")  // horario

    x={
      titulo: title,
      slogan: slg,
      telefono: tlf,
      link: lnk,
      categoria: ctg,
      palabras: plc,
      direccion: addr,
      horario: hor
    }

    var xls = json2xls(x);
    fs.writeFileSync('data.xlsx', xls, 'binary');


  }
})

let findAll = (req, res) => {
  x={
    titulo: title,
    slogan: slg,
    telefono: tlf,
    link: lnk,
    categoria: ctg,
    palabras: plc,
    direccion: addr,
    horario: hor
  }
  res.json(x)
}

x = {title,slg,lnk,ctg,plc,addr,hor}

//console.log(typeof(x))

var xls = json2xls(x);
fs.writeFileSync('data.xlsx', xls, 'binary');

module.exports = {
    findAllRutas: findAll
}


*/




