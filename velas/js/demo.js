$(function () {
	var adv_options = {
		title: {
			useHTML: true,
			x: -10,
			y: 8,
		},
		indicators: [{
			id: 'AAPL',
			type: 'sma',
			params: {
				period: 9
			},
            styles: {
                strokeWidth: 2,
                stroke: 'green',
                dashstyle: 'solid'
            }


		}, {
			id: 'AAPL',
			type: 'sma',
			params: {
				period: 26,
				index: 0 //optional parameter for ohlc / candlestick / arearange - index of value
			},
		}, {
			id: 'AAPL',
			type: 'rsi',
			params: {
				period: 14,
				overbought: 70,
                oversold: 30
			},
			styles: {
				strokeWidth: 2,
				stroke: 'black',
				dashstyle: 'solid'
			},
			yAxis: {
				lineWidth: 2,
				title: {
					text: 'RSI'
				},
	            height: '20%'
			}
		}],
		yAxis: {
			opposite: false,
			title: {
				text: 'DATA SMA EMA',
				x: -4
			},
			lineWidth: 2,
			labels: {
				x: 22
			},
		},
		rangeSelector: {
			selected: 0
		},
		tooltip: {
			enabledIndicators: true
		},
		series: [{
			cropThreshold: 0,
			id: 'AAPL',
			name: 'AAPL',
			data: [],
			tooltip: {
				valueDecimals: 2
			}
		}]
	};

//	$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-ohlcv.json&callback=?', function (data) {
	$.getJSON('http://localhost/velas/velas.php?filename=new-intraday.json&callback=?', function (data) {
		adv_options.series[0].type = 'candlestick';
		adv_options.series[0].data = data;
		$('#chart-advanced').highcharts('StockChart', adv_options);
	});
});