/* consultar la api */
var cheerio = require('cheerio')
var request = require('request')
var url='https://linuxcoro.herokuapp.com/json'
var cryptojs = require("crypto-js")
/* insertar valores */
var MongoClient = require('mongodb').MongoClient;
var con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";

/* halando datos url */
request(url, function(error, r, html){
    const arr = JSON.parse(html)
    var det = []
    if(r.statusCode==200){
        art=arr.lista

 
        for (var index = 0; index < art.length; index++) {
            var element = art[index];
            det = "https://www.amazon.com/dp/"+element.productId
 
           //console.log(myobj)
           var myobj = {
                hash: cryptojs.SHA256(element.productId).toString(),
                title: element.title,
                des: det,
                titulo: "",
                descripcion: "",
                precio: element.price,
                imagen: ""
            }

            if(myobj.titulo!=undefined && myobj.img!=""){
                console.log('paso la condicion'+index)
                insertardb(myobj)
            }
        }

    }
})

function insertardb(myobj){
    MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
        var dbo = db.db("linuxcoro");
        dbo.collection("articles").findOne({'hash':myobj.hash}, function(err, result) {
            if (!result) {
                dbo.collection("articles").insertOne(myobj, function(err, res) {
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