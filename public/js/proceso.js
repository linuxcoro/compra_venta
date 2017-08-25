$(function() {
    var seriesOptions = [],
        yAxisOptions = [],
        seriesCounter = 0,
        names = ['BTC'],
        colors = Highcharts.getOptions().colors;

    $.each(names, function(i, name) {
        $.getJSON('datos',   function(data) {
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
                buttons: [{
                    count: 1,
                    type: 'minute',
                    text: '1m'
                }, 
                {
                    count: 5,
                    type: 'minute',
                    text: '5m'
                }, 
                {
                    count: 30,
                    type: 'minute',
                    text: '30m'
                }, 
                {
                    count: 1,
                    type: 'hour',
                    text: '1h'
                },
                {
                    count: 6,
                    type: 'hour',
                    text: '6h'
                },
                {
                    count: 12,
                    type: 'hour',
                    text: '12h'
                },
                {
                    count: 1,
                    type: 'day',
                    text: '1D'
                },
                {
                    count: 1,
                    type: 'week',
                    text: '1S'
                },
                {
                    type: 'month',
                    count: 1,
                    text: '1M'
                }, 
                {
                    type: 'month',
                    count: 3,
                    text: '3M'
                }, 
                {
                    type: 'month',
                    count: 6,
                    text: '6M'
                },
                {
                    type: 'all',
                    text: 'All'
                }]
            },
            series: seriesOptions
        });
    }
});
