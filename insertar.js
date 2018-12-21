const request = require('request')
const translate = require('translate-api')
/* actualizar valores */
const MongoClient = require('mongodb').MongoClient;
const con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";

/* 
    esta es la api donde vamos actualizar los datos
    https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i
 */
url = 'https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i'
request(url, function(error, response, html){
    if(!error){
        const arr = JSON.parse(html)
        
        for(i=0;i<arr.length;i++){
            var element = arr[i]
            //console.log(element)
            //titulo(element)
            detalle(element)
               //almacenar en una base de datos
            
/* 
               translate(element.titulo_ingles, {to: 'es'},element).then(res => {
                
                MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
                    var dbo = db.db("linuxcoro");
                    var myquery = { hash: element.hash };
                    var newvalues = { $set: {titulo_esp: res.text } };                            
                    dbo.collection("articles").updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log("1 document update");
                        db.close();
                    });
                });
            }).catch(err => {})

 */
/* 
            var myobj = {
                hash: element.hash,
                titulo: element.titulo_ingles,
                detalle: element.detalle_ingles,
                precio: element.precio,
                imagen: element.imagen
            }
           console.log(myobj)

 */

          
            
        }
    }
})

function titulo(element){
    var eng = element.titulo_ingles
    translate.getText(eng,{to: 'es'}).then(function(text){
        console.log(text.text)
        console.log(element.hash)
      });    
}
function detalle(element){
    var eng = element.detalle_ingles
    translate.getText(eng,{to: 'es'}).then(function(text){
        console.log(text.text)
        console.log(element.hash)
      });    
}
