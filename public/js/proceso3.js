$(function() {
    var seriesOptions = [],
        yAxisOptions = [],
        seriesCounter = 0,
        names = ['BTC'],
        colors = Highcharts.getOptions().colors;

    $.each(names, function(i, name) {
//        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=msft-c.json&callback=?',   function(data) {
        $.getJSON('http://localhost:3000/json',   function(data) {
            seriesOptions[i] = {
                name: name,
                data: data
            };
            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter++;
            if (seriesCounter == names.length) {
                createChart();
            }
        });
    });











    // create the chart when all data is loaded
    function createChart() {
        chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'container'
            },
            rangeSelector: {
                selected: 4
            },
            yAxis: {
                labels: {
                    formatter: function() {
                        return (this.value > 0 ? '+' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },
            
            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },
            
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },
            
            series: seriesOptions
        });
    }
});
