'use strict';
export class WidgetCtrl {
    constructor($scope) {
        const init = function () {
            const values = [];
            for (let i = 0; i < 5; i++) {
                values.push({ name: 'name' + i, age: i, height: 4 + i + ' ft' });
            }
            $scope.values = values;

            $scope.rowCollection = [
                { firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com' },
                { firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com' },
                { firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com' },
            ];

            $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
                // Create the chart
                $('#chart1').highcharts('StockChart', {


                    rangeSelector: {
                        selected: 1,
                    },

                    title: {
                        text: 'AAPL Stock Price',
                    },

                    series: [
                        {
                            name: 'AAPL',
                            data: data,
                            tooltip: {
                                valueDecimals: 2,
                            },
                        },
                    ],
                });
                // Create the chart
                $('#chart2').highcharts({
                    chart: {
                        type: 'flags',
                        plotBorderWidth: 1,
                        zoomType: 'xy',
                    },

                    title: {
                        text: 'Highcharts bubbles with radial gradient fill',
                    },

                    xAxis: {
                        gridLineWidth: 1,
                    },

                    yAxis: {
                        startOnTick: false,
                        endOnTick: false,
                    },

                    series: [
                        {
                            data: [
                                [9, 81, 63],
                                [98, 5, 89],
                                [51, 50, 73],
                                [41, 22, 14],
                                [58, 24, 20],
                                [78, 37, 34],
                                [55, 56, 53],
                                [18, 45, 70],
                                [42, 44, 28],
                                [3, 52, 59],
                                [31, 18, 97],
                                [79, 91, 63],
                                [93, 23, 23],
                                [44, 83, 22],
                            ],
                            marker: {
                                fillColor: {
                                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                                    stops: [
                                        [0, 'rgba(255,255,255,0.5)'],
                                        [1, 'rgba(69,114,167,0.5)'],
                                    ],
                                },
                            },
                        },
                        {
                            data: [
                                [42, 38, 20],
                                [6, 18, 1],
                                [1, 93, 55],
                                [57, 2, 90],
                                [80, 76, 22],
                                [11, 74, 96],
                                [88, 56, 10],
                                [30, 47, 49],
                                [57, 62, 98],
                                [4, 16, 16],
                                [46, 10, 11],
                                [22, 87, 89],
                                [57, 91, 82],
                                [45, 15, 98],
                            ],
                            marker: {
                                fillColor: {
                                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                                    stops: [
                                        [0, 'rgba(255,255,255,0.5)'],
                                        [1, 'rgba(170,70,67,0.5)'],
                                    ],
                                },
                            },
                        },
                    ],

                });
                $('#chart3').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                    },
                    title: {
                        text: 'Browser market shares at a specific website, 2010',
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            },
                        },
                    },
                    series: [
                        {
                            type: 'pie',
                            name: 'Browser share',
                            data: [
                                ['Firefox', 45.0],
                                ['IE', 26.8],
                                {
                                    name: 'Chrome',
                                    y: 12.8,
                                    sliced: true,
                                    selected: true,
                                },
                                ['Safari', 8.5],
                                ['Opera', 6.2],
                                ['Others', 0.7],
                            ],
                        },
                    ],
                });

            });
        };
        init();
    }
}
