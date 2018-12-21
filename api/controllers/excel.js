const request = require('request')
const json2xls = require('json2xls');
const fs = require('fs')

const path = "https://api.mlab.com/api/1/databases/linuxcoro/collections/scraping?l=26666&apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i"


let x = []
request(path, function(error, response, html){
    if(!error){
        const arr = JSON.parse(html)
        for(i=0;i<26666;i++){
            var element = arr[i]
            if (element.titulo!="") {
		        x.push({
				    titulo: element.titulo,
				    slogan: element.slogan,
				    telefono: element.telefono,
				    link: element.link,
				    categoria: element.categoria,
				    palabras: element.palabras,
				    direccion: element.direccion,
				    horario: element.horario
		        })

            }

        }
        var xls = json2xls(x);
		fs.writeFileSync('data.xlsx', xls, 'binary');

    }
})



