$(document).ready(function() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var options = {
        chart: {
            renderTo: 'container',
            type: 'spline'
        },
        series: [{}]
    };

    $.getJSON('http://localhost:3000/datos', function(data) {
        options.series[0].data = data;
        var chart = new Highcharts.Chart(options);
    });

});