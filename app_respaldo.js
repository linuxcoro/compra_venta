var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
//	Highcharts = require('highcharts'),
	request = require('request'),
	pg = require('pg'),
	app = express();

//var connect = "postgres://postgres:123@localhost/linuxcor_monitoreo";
var connect = "postgres://linux_linuxcor:ne0Jahz2at@74.91.28.22/linuxcor_symfony";
//postgresql://dbuser:secretpassword@database.server.com:3211/mydb
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/datos', function(req, res){
	pg.connect(connect, function(err,client,done){
		if (err) {
			return console.error('error fetching client from pool', err);			
		};
		client.query("SELECT to_char(fecha,'yyyy/mm/dd hh24:mi') as x,trim(to_char(valor,'99999999')) as y FROM medidas", function(err,result){
			if (err) {
				return console.error('error runing query',err);
			};

			res.setHeader('Content-Type', 'application/json');
			res.setHeader('X-Powered-By', 'bacon');
			res.render('json', {'medidas': result.rows,'ultimo': result.rows.pop()});
			done();
		});
	});
	dust.helpers.formatDate = function (chunk, context, bodies, params) {
	    var x = dust.helpers.tap(params.x, chunk, context),
	    	y = dust.helpers.tap(params.y, chunk, context),
	    	xx = Date.parse(x);
	    return chunk.write('[' + xx + ',' + y + ']');
	};	
});

app.get('/tabla', function(req, res){
/*
	var request = require('request');
	var result = request('https://localbitcoins.com/buy-bitcoins-online/VEF/.json');
	var obj = JSON.stringify(result);
	var out = JSON.parse(obj);
*/

	var result = request('https://localbitcoins.com/buy-bitcoins-online/VEF/.json','application/json');
	//var result = request('https://localbitcoins.com/buy-bitcoins-online/VEF/.json');
	//var obj = JSON.parse(result);
	//var obj = JSON.parse(JSON.stringify(result));
	var datos = dump(result);
	var tipo = typeof(result);

	res.render('tabla', {'url': datos});
});


/*
var request = require('request');
request('https://localbitcoins.com/buy-bitcoins-online/VEF/.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
  else {
    console.log("Error "+response.statusCode)
  }
})
*/
















app.get('/', function(req, res){
	res.render('index', {'medidas': ''});
});

app.get('/frecuencia', function(req, res){
	pg.connect(connect, function(err,client,done){
		if (err) {
			return console.error('error fetching client from pool', err);			
		};
		client.query("SELECT trim(to_char(valor,'99999999')) as y FROM medidas", function(err,result){
			if (err) {
				return console.error('error runing query',err);
			};
			res.render('frecuencia', {'medidas': result.rows,'ultimo': result.rows.pop()});
			done();
		});
	});
});

app.listen(3000, function(){
	console.log('Server start on port 3000');
});











