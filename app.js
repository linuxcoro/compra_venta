var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	request = require('request');
	axios=require('axios'),
	himalaya = require('himalaya'),


	//pg = require('pg'),
	app = express();

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const { Pool, Client } = require('pg')
const client = new Client({
  user: 'linux_linuxcor',
  host: '74.91.28.22',
  database: 'linuxcor_symfony',
  password: 'ne0Jahz2at',
})
client.connect()

app.get('/datos', function(req, res){
	client.query("SELECT to_char(fecha,'yyyy/mm/dd hh24:mi') as x,trim(to_char(valor,'99999999')) as y FROM medidas", function(err,result){
		if (err) {
			return console.error('error runing query',err);
		};
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('X-Powered-By', 'bacon');
			res.render('json', {'medidas': result.rows,'ultimo': result.rows.pop()});
	});	
	dust.helpers.formatDate = function (chunk, context, bodies, params) {
	    var x = dust.helpers.tap(params.x, chunk, context),
	    	y = dust.helpers.tap(params.y, chunk, context),
	    	xx = Date.parse(x);
	    return chunk.write('[' + xx + ',' + y + ']');
	};	
});

/*
	var dolar = axios.get('http://api.bitcoinvenezuela.com/DolarToday.php?json=yes')
	.then(function (dolarResponse) {
		parseInt(dolarResponse.data.USD.dolartoday);
	});			

	var dolartoday = function (req, res, next) {
		req.dolartoday=this.dolar;
		next();
	};
	app.use(dolartoday);		

*/






app.get('/tabla', function(req, res){
	//----------------------------------------------------------------------------------------------------
	// COMPRA BOLIVARES VENEZUELA 
	var data_compra = new Array();
	var busca_compra = new Array();
	var comprar = new Array();

	// VENTA BOLIVARES VENEZUELA
	var data_venta = new Array();
	var busca_venta = new Array();
	var transa = new Array();

	//----------------------------------------------------------------------------------------------------
	// COMPRA PAYONEER
	var dat_com_pay = new Array();
	var bus_com_pay = new Array();
	var com_pay = new Array();

	// VENTA PAYONEER
	var dat_ven_pay = new Array();
	var bus_ven_pay = new Array();
	var tra_pay = new Array();

	//----------------------------------------------------------------------------------------------------
	// COMPRA NETELLER
	var dat_com_net = new Array();
	var bus_com_net = new Array();
	var com_net = new Array();

	// VENTA NETELLER
	var dat_ven_net = new Array();
	var bus_ven_net = new Array();
	var tra_net = new Array();

	//----------------------------------------------------------------------------------------------------

	var trato = [100,100,500,1000,3000];
	function getCompraBtc() {
	    return axios.get('https://localbitcoins.com/buy-bitcoins-online/VEF/.json')
	}
	function getVentaBtc() {
	    return axios.get('https://localbitcoins.com/sell-bitcoins-online/VEF/.json')
	}

	function getCompraPayoneer() {
	    return axios.get('https://localbitcoins.com/buy-bitcoins-online/payoneer/.json')
	}

	function getVentaPayoneer() {
	    return axios.get('https://localbitcoins.com/sell-bitcoins-online/payoneer/.json')
	}

	function getCompraNeteller() {
	    return axios.get('https://localbitcoins.com/buy-bitcoins-online/neteller/.json')
	}

	function getVentaNeteller() {
	    return axios.get('https://localbitcoins.com/sell-bitcoins-online/neteller/.json')
	}

/*
	function getDolar() {
	    return axios.get('http://api.bitcoinvenezuela.com/DolarToday.php?json=yes')
	}
*/

/*
	axios.all([getCompraBtc(),getVentaBtc(),getCompraPayoneer(),getVentaPayoneer(),getCompraNeteller(),getVentaNeteller(),getDolar()])
		.then(axios.spread(function (compraBtcResponse,ventaBtcResponse,compraPayoneerResponse,ventaPayoneerResponse,compraNetellerResponse,ventaNetellerResponse, dolarResponse) {
*/
	axios.all([getCompraBtc(),getVentaBtc(),getCompraPayoneer(),getVentaPayoneer(),getCompraNeteller(),getVentaNeteller()])
		.then(axios.spread(function (compraBtcResponse,ventaBtcResponse,compraPayoneerResponse,ventaPayoneerResponse,compraNetellerResponse,ventaNetellerResponse) {

	/*----------------------------------------------------------------------------------------------------*/
	/* COMPRA EN BOLIVARES VENEZUELA*/
		    x1 = compraBtcResponse.data.data.ad_list;
			//this.x2 = parseInt(dolarResponse.data.USD.dolartoday);
			for (var h=0; h < trato.length; h++) { 
			    var j = 0;
				for (var i=0; i < x1.length; i++) { 
					clientes=parseInt(x1[i].data.profile.trade_count);
					if (h==0) {

						if (clientes<trato[h]) {
							data_compra[j] = {
								vendedor:x1[i].data.profile.username,				
								bs:parseInt(x1[i].data.temp_price),
								//ds:parseInt(x1[i].data.temp_price/x2),
								ventas:x1[i].data.profile.trade_count,
								porcentaje:x1[i].data.profile.feedback_score,
								desde:x1[i].data.min_amount,
								hasta:x1[i].data.max_amount,
								banco:x1[i].data.bank_name,
								condicion:(x1[i].data.require_trade_volume>0)?"Si":"No"							
							};
							busca_compra[j]=data_compra[j].bs
							j++;
						}

					}
					else{


						if (clientes==trato[h]) {
							data_compra[j] = {
								vendedor:x1[i].data.profile.username,				
								bs:parseInt(x1[i].data.temp_price),
								//ds:parseInt(x1[i].data.temp_price/x2),
								ventas:x1[i].data.profile.trade_count,
								porcentaje:x1[i].data.profile.feedback_score,
								desde:x1[i].data.min_amount,
								hasta:x1[i].data.max_amount,
								banco:x1[i].data.bank_name,
								condicion:(x1[i].data.require_trade_volume>0)?"Si":"No"							
							};
							busca_compra[j]=data_compra[j].bs
							j++;
						}

					};





				}
				men_comp = Math.min.apply(null, busca_compra);
				ind_men_comp = busca_compra.indexOf(men_comp);
				comprar[h] = {
					vendedor:data_compra[ind_men_comp].vendedor,				
					bs:data_compra[ind_men_comp].bs,
					//ds:data_compra[ind_men_comp].ds,
					ventas:data_compra[ind_men_comp].ventas,
					porcentaje:data_compra[ind_men_comp].porcentaje,
					desde:data_compra[ind_men_comp].desde,
					hasta:data_compra[ind_men_comp].hasta,
					banco:data_compra[ind_men_comp].banco,
					condicion:data_compra[ind_men_comp].condicion
				};
			}	
			comprar.sort(function(a, b){return a['bs']-b['bs']});

	/* VENTA EN BOLIVARES VENEZUELA*/

		    x3 = ventaBtcResponse.data.data.ad_list;
			for (var h=0; h < trato.length; h++) { 
			    var j = 0;
				for (var i=0; i < x3.length; i++) { 
					clientes=parseInt(x3[i].data.profile.trade_count);
					if (clientes==trato[h]) {
						data_venta[j] = {
							vendedor:x3[i].data.profile.username,				
							bs:parseInt(x3[i].data.temp_price),
							//ds:parseInt(x3[i].data.temp_price/x2),
							ventas:x3[i].data.profile.trade_count,
							porcentaje:x3[i].data.profile.feedback_score
						};
						busca_venta[j]=data_venta[j].bs
						j++;
					}
				}
				men_comp = Math.max.apply(null, busca_venta);
				ind_men_comp = busca_venta.indexOf(men_comp);
				transa[h] = {
					vendedor:data_venta[ind_men_comp].vendedor,				
					bs:data_venta[ind_men_comp].bs,
					//ds:data_venta[ind_men_comp].ds,
					ventas:data_venta[ind_men_comp].ventas,
					porcentaje:data_venta[ind_men_comp].porcentaje
				};
			}	
			transa.sort(function(a, b){return b['bs']-a['bs']});






/*

	//----------------------------------------------------------------------------------------------------
	// COMPRA CON PAYONEER DOLARES O EUROS 
		    x4 = compraPayoneerResponse.data.data.ad_list;
			//x2 = parseInt(dolarResponse.data.USD.dolartoday);
			for (var h=0; h < trato.length; h++) { 
			    var j = 0;
				for (var i=0; i < x4.length; i++) { 
					clientes=parseInt(x4[i].data.profile.trade_count);
					if (clientes==trato[h]) {
						dat_com_pay[j] = {
							vendedor:x4[i].data.profile.username,				
							ds:parseInt(x4[i].data.temp_price),
							ventas:x4[i].data.profile.trade_count,
							porcentaje:x4[i].data.profile.feedback_score,
							desde:x4[i].data.min_amount,
							hasta:x4[i].data.max_amount,
							banco:x4[i].data.bank_name,
							condicion:(x4[i].data.require_trade_volume>0)?"Si":"No"							
						};
						bus_com_pay[j]=dat_com_pay[j].ds
						j++;
					}
				}
				men_comp = Math.min.apply(null, bus_com_pay);
				ind_men_comp = bus_com_pay.indexOf(men_comp);
				com_pay[h] = {
					vendedor:dat_com_pay[ind_men_comp].vendedor,				
					ds:dat_com_pay[ind_men_comp].ds,
					ventas:dat_com_pay[ind_men_comp].ventas,
					porcentaje:dat_com_pay[ind_men_comp].porcentaje,
					desde:dat_com_pay[ind_men_comp].desde,
					hasta:dat_com_pay[ind_men_comp].hasta,
					banco:dat_com_pay[ind_men_comp].banco,
					condicion:dat_com_pay[ind_men_comp].condicion
				};
			}	
			com_pay.sort(function(a, b){return a['ds']-b['ds']});

	// VENTA CON PAYONEER DOLARES O EUROS
		    x5 = ventaPayoneerResponse.data.data.ad_list;
			for (var h=0; h < trato.length; h++) { 
			    var j = 0;
				for (var i=0; i < x5.length; i++) { 
					clientes=parseInt(x5[i].data.profile.trade_count);
					if (clientes==trato[h]) {
						dat_ven_pay[j] = {
							vendedor:x5[i].data.profile.username,				
							ds:parseInt(x5[i].data.temp_price),
							ventas:x5[i].data.profile.trade_count,
							porcentaje:x5[i].data.profile.feedback_score
						};
						bus_ven_pay[j]=dat_ven_pay[j].ds
						j++;
					}
				}
				men_comp = Math.max.apply(null, bus_ven_pay);
				ind_men_comp = bus_ven_pay.indexOf(men_comp);
				tra_pay[h] = {
					vendedor:dat_ven_pay[ind_men_comp].vendedor,				
					ds:dat_ven_pay[ind_men_comp].ds,
					ventas:dat_ven_pay[ind_men_comp].ventas,
					porcentaje:dat_ven_pay[ind_men_comp].porcentaje
				};
			}	
			tra_pay.sort(function(a, b){return b['ds']-a['ds']});



	//----------------------------------------------------------------------------------------------------
	// COMPRA CON NETELLER DOLARES O EUROS 


		    x6 = compraNetellerResponse.data.data.ad_list;
			//x2 = parseInt(dolarResponse.data.USD.dolartoday);
			for (var h=0; h < trato.length; h++) { 
			    var j = 0;
				for (var i=0; i < x6.length; i++) { 
					clientes=parseInt(x6[i].data.profile.trade_count);
					if (clientes==trato[h]) {
						dat_com_net[j] = {
							vendedor:x6[i].data.profile.username,				
							bs:parseInt(x6[i].data.temp_price),
							ventas:x6[i].data.profile.trade_count,
							porcentaje:x6[i].data.profile.feedback_score,
							desde:x6[i].data.min_amount,
							hasta:x6[i].data.max_amount,
							banco:x6[i].data.bank_name,
							condicion:(x6[i].data.require_trade_volume>0)?"Si":"No"							
						};
						bus_com_net[j]=dat_com_net[j].bs
						j++;
					}
				}
				men_comp = Math.min.apply(null, bus_com_net);
				ind_men_comp = bus_com_net.indexOf(men_comp);
				com_net[h] = {
					vendedor:dat_com_net[ind_men_comp].vendedor,				
					bs:dat_com_net[ind_men_comp].bs,
					ds:dat_com_net[ind_men_comp].ds,
					ventas:dat_com_net[ind_men_comp].ventas,
					porcentaje:dat_com_net[ind_men_comp].porcentaje,
					desde:dat_com_net[ind_men_comp].desde,
					hasta:dat_com_net[ind_men_comp].hasta,
					banco:dat_com_net[ind_men_comp].banco,
					condicion:dat_com_net[ind_men_comp].condicion
				};
			}	
			com_net.sort(function(a, b){return a['bs']-b['bs']});

	// VENTA CON NETELLER DOLARES O EUROS 
		    x7 = ventaNetellerResponse.data.data.ad_list;
			for (var h=0; h < trato.length; h++) { 
			    var j = 0;
				for (var i=0; i < x7.length; i++) { 
					clientes=parseInt(x7[i].data.profile.trade_count);
					if (clientes==trato[h]) {
						dat_ven_net[j] = {
							vendedor:x7[i].data.profile.username,				
							bs:parseInt(x7[i].data.temp_price),
							ds:parseInt(x7[i].data.temp_price/x2),
							ventas:x7[i].data.profile.trade_count,
							porcentaje:x7[i].data.profile.feedback_score
						};
						bus_ven_net[j]=dat_ven_net[j].bs
						j++;
					}
				}
				men_comp = Math.max.apply(null, bus_ven_net);
				ind_men_comp = bus_ven_net.indexOf(men_comp);
				tra_net[h] = {
					vendedor:dat_ven_net[ind_men_comp].vendedor,				
					bs:dat_ven_net[ind_men_comp].bs,
					ds:dat_ven_net[ind_men_comp].ds,
					ventas:dat_ven_net[ind_men_comp].ventas,
					porcentaje:dat_ven_net[ind_men_comp].porcentaje
				};
			}	
			tra_net.sort(function(a, b){return b['bs']-a['bs']});
*/
	//----------------------------------------------------------------------------------------------------

			//res.render('tabla', { 'comprar': comprar,'venta': transa, 'dolar': x2, 'com_pay': com_pay, 'tra_pay': tra_pay, 'com_net': com_net, 'tra_pay': tra_net });
			res.render('tabla', { 'comprar': comprar,'venta': transa, 'com_pay': com_pay, 'tra_pay': tra_pay, 'com_net': com_net, 'tra_pay': tra_net });
		}));
});






app.get('/game', function(req, res){
	//----------------------------------------------------------------------------------------------------
	// COMPRA BOLIVARES VENEZUELA
	var data_compra = new Array();
	var busca_compra = new Array();
	var comprar = new Array();
	var bs_cp = new Array();

	//----------------------------------------------------------------------------------------------------
	// COMPRA PAYONEER
	var dat_com_pay = new Array();
	var bus_com_pay = new Array();
	var com_pay = new Array();
	var bs_py = new Array();

	//----------------------------------------------------------------------------------------------------

	function getAmazon() {
	    return axios.get('http://json.linuxcoro.com.ve/api/src/wishlist.php?id=1A7GB9IL1UAK2&format=json')
	}

	var trato = [100,100,500,1000,3000];
	function getCompraBtc() {
	    return axios.get('https://localbitcoins.com/buy-bitcoins-online/VEF/.json')
	}

	function getVentaPayoneer() {
	    return axios.get('https://localbitcoins.com/sell-bitcoins-online/payoneer/.json')
	}

	axios.all([getAmazon(),getCompraBtc(), getVentaPayoneer()])
		.then(axios.spread(function (amazonResponse,compraBtcResponse,ventaPayoneerResponse) {


	//----------------------------------------------------------------------------------------------------
	// COMPRA EN BOLIVARES VENEZUELA*/
		    x1 = compraBtcResponse.data.data.ad_list;
			for (var h=0; h < trato.length; h++) { 
			    var j = 0;
				for (var i=0; i < x1.length; i++) { 
					clientes=parseInt(x1[i].data.profile.trade_count);
					if (h==0) {

						if (clientes<trato[h]) {
							data_compra[j] = {
								vendedor:x1[i].data.profile.username,				
								bs:parseInt(x1[i].data.temp_price),
								ventas:x1[i].data.profile.trade_count,
								porcentaje:x1[i].data.profile.feedback_score,
								desde:x1[i].data.min_amount,
								hasta:x1[i].data.max_amount,
								banco:x1[i].data.bank_name,
								condicion:(x1[i].data.require_trade_volume>0)?"Si":"No"							
							};
							busca_compra[j]=data_compra[j].bs
							j++;
						}

					}
					else{

						if (clientes==trato[h]) {
							data_compra[j] = {
								vendedor:x1[i].data.profile.username,				
								bs:parseInt(x1[i].data.temp_price),
								ventas:x1[i].data.profile.trade_count,
								porcentaje:x1[i].data.profile.feedback_score,
								desde:x1[i].data.min_amount,
								hasta:x1[i].data.max_amount,
								banco:x1[i].data.bank_name,
								condicion:(x1[i].data.require_trade_volume>0)?"Si":"No"							
							};
							busca_compra[j]=data_compra[j].bs
							j++;
						}

					};
				}
				men_comp = Math.min.apply(null, busca_compra);
				ind_men_comp = busca_compra.indexOf(men_comp);
				comprar[h] = {
					vendedor:data_compra[ind_men_comp].vendedor,				
					bs:data_compra[ind_men_comp].bs,
					ventas:data_compra[ind_men_comp].ventas,
					porcentaje:data_compra[ind_men_comp].porcentaje,
					desde:data_compra[ind_men_comp].desde,
					hasta:data_compra[ind_men_comp].hasta,
					banco:data_compra[ind_men_comp].banco,
					condicion:data_compra[ind_men_comp].condicion
				};
				bs_cp[h] = comprar[h].bs
			}	
			mx_cp = Math.min.apply(null, bs_cp);
			id_mx_cp = bs_cp.indexOf(mx_cp);
			max_compra_bs = comprar[id_mx_cp].bs;
	//----------------------------------------------------------------------------------------------------
	// COMPRA CON PAYONEER DOLARES O EUROS 	
		    x4 = ventaPayoneerResponse.data.data.ad_list;
			for (var h=0; h < trato.length; h++) { 
			    var j = 0;
				for (var i=0; i < x4.length; i++) { 
					clientes=parseInt(x4[i].data.profile.trade_count);
					if (clientes==trato[h]) {
						dat_com_pay[j] = {
							vendedor:x4[i].data.profile.username,				
							ds:parseInt(x4[i].data.temp_price),
							ventas:x4[i].data.profile.trade_count,
							porcentaje:x4[i].data.profile.feedback_score,
							desde:x4[i].data.min_amount,
							hasta:x4[i].data.max_amount,
							banco:x4[i].data.bank_name,
							condicion:(x4[i].data.require_trade_volume>0)?"Si":"No"							
						};
						bus_com_pay[j]=dat_com_pay[j].ds
						j++;
					}
				}
				men_comp = Math.min.apply(null, bus_com_pay);
				ind_men_comp = bus_com_pay.indexOf(men_comp);
				com_pay[h] = {
					vendedor:dat_com_pay[ind_men_comp].vendedor,				
					ds:dat_com_pay[ind_men_comp].ds,
					ventas:dat_com_pay[ind_men_comp].ventas,
					porcentaje:dat_com_pay[ind_men_comp].porcentaje,
					desde:dat_com_pay[ind_men_comp].desde,
					hasta:dat_com_pay[ind_men_comp].hasta,
					banco:dat_com_pay[ind_men_comp].banco,
					condicion:dat_com_pay[ind_men_comp].condicion
				};
				bs_py[h] = com_pay[h].ds
			}
			
			mx_py = Math.min.apply(null, bs_py);
			id_mx_py = bs_py.indexOf(mx_py);
			mx_cp_py = com_pay[id_mx_py].ds;


	//----------------------------------------------------------------------------------------------------

	    var x3 = amazonResponse.data;
			res.render('game', { 'x': x3, 'btc_bs':max_compra_bs, 'btc_ds': mx_cp_py });
		}))
		.catch(function(err) {
			res.render('game', { 'error': "recargue" });
		});

	var translate = require('node-google-translate-skidz');
	var assert = require('assert');
	dust.helpers.traduce = function (chunk, context, bodies, params) {
	    var name = dust.helpers.tap(params.name, chunk, context);
		cad1 = spanish(name);
	    return cad1;
	};	


	dust.helpers.convertir = function (chunk, context, bodies, params) {
	    var valor = dust.helpers.tap(params.valor, chunk, context);
	    var btc = dust.helpers.tap(params.btc, chunk, context);
	    //var btc_ds = dust.helpers.tap(params.btc_ds, chunk, context);

	    inicio = valor.indexOf("$")+1;
	    corte = valor.substring(inicio);
	    fin = corte.indexOf("&");
	    cadena = valor.substring(inicio,(inicio+fin));
	    return cadena;
	};

	dust.helpers.convertir2 = function (chunk, context, bodies, params) {
	    var valor = dust.helpers.tap(params.valor, chunk, context);
	    var btc = dust.helpers.tap(params.btc, chunk, context);
	    var btc_ds = dust.helpers.tap(params.btc_ds, chunk, context);
	    inicio = valor.indexOf("$")+1;
	    cadena = valor.substring(inicio);
	    return cadena;
	};	



	dust.helpers.convertir_btc = function (chunk, context, bodies, params) {
	    var valor = dust.helpers.tap(params.valor, chunk, context);
	    var btc = dust.helpers.tap(params.btc, chunk, context);
	    var btc_ds = dust.helpers.tap(params.btc_ds, chunk, context);

	    inicio = valor.indexOf("$")+1;
	    corte = valor.substring(inicio);
	    fin = corte.indexOf("&");
	    cadena = valor.substring(inicio,(inicio+fin));
	    return (cadena/btc_ds)*btc;
	};

	dust.helpers.convertir_btc2 = function (chunk, context, bodies, params) {
	    var valor = dust.helpers.tap(params.valor, chunk, context);
	    var btc = dust.helpers.tap(params.btc, chunk, context);
	    var btc_ds = dust.helpers.tap(params.btc_ds, chunk, context);
	    inicio = valor.indexOf("$")+1;
	    cadena = valor.substring(inicio);
	    return (cadena/btc_ds)*btc;
	};	



	function spanish(cad){
		var cadena = translate({ text: cad, source: 'en', target: 'es' }, function(result) {});
		return cadena;
	}
});




app.get('/csv', function(req, res){
	//var request = require('request');
	//https://docs.google.com/spreadsheets/d/KEY/export?format=csv&id=KEY&gid=SHEET_ID
	var data = request('https://docs.google.com/spreadsheets/d/1aTPvedM9PwJ60vO9-l8XAMFDhAO3LgwJ3zLRXW61XUc/export?format=csv&id=1aTPvedM9PwJ60vO9-l8XAMFDhAO3LgwJ3zLRXW61XUc&gid=1458690154','text/plain');
	res.render('csv', {'cien': data});
});


app.get('/frecuencia', function(req, res){
	client.query("SELECT trim(to_char(valor,'99999999')) as y FROM medidas", function(err,result){
		if (err) {
			return console.error('error runing query',err);
		};
		res.render('frecuencia', {'medidas': result.rows,'ultimo': result.rows.pop()});
	});
});

app.get('/', function(req, res){
	res.render('index', {'medidas': ''});


});


app.listen(3000, function(){
	console.log('Server start on port 3000');
});