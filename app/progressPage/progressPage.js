angular.module('progressPage', [])
    .directive('progressPage', function () {
        return {
            templateUrl: 'progressPage/progressPage.html',
            controller: function ($scope, dataService) {
                $scope.pieShow = true;
                $scope.barShow = false;
                $scope.dataset = [];
                var dataProcess = function () {
                    dataService.getData().then(function (data) {
                        data.map(function (entry) {
                            return {
                                name: entry.name,
                                duration: entry.duration
                            };
                        }).sort(function (a, b) {
                                a = a.name;
                                b = b.name;
                                if (a == b) {
                                    return 0;
                                }
                                return a < b ? -1 : 1;
                            }).reduce(function (prev, cur, idx) {
                                if (idx == 1) {
                                    prev = [prev];
                                }
                                if (prev[prev.length - 1].name == cur.name) {
                                    prev[prev.length - 1].duration += cur.duration
                                }
                                else {
                                    prev.push(cur);
                                }

                                return prev;

                            }).forEach(function (datapoint) {
                                var tempObj = {
                                    label: datapoint.name,
                                    data: [datapoint.duration]
                                };
                                $scope.dataset.push(tempObj);
                            })
                    });
                };

                $scope.pieOptions = {
                    series: {
                        pie: {
                            show: true
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    },
                    legend: {
                        show: false
                    }
                };
                var daftPoints = [[0, 4]],
                    punkPoints = [[1, 20]],
                    punkPoints2 = [[2, 33]];

                var data1 = [
                    {
                        data: daftPoints,
                        bars: {show: true, barWidth:1, fillColor: '#00b9d7', order: 1, align: "center" }
                    },
                    {
                        data: punkPoints,
                        bars: {show: true, barWidth:1, fillColor: '#3a4452', order: 2, align: "center" }
                    },
                    {
                        data: punkPoints2,
                        bars: {show: true, barWidth:1, fillColor: '#3a4452', order: 2, align: "center" }
                    }
                ];

                $scope.data = data1;


//
//                var d1 = [];
//                for (var i = 0; i <= 10; i += 1) {
//                    d1.push([i, parseInt(Math.random() * 30)]);
//                }
//                $scope.barData = {data: d1, lines: { show: true, fill: true }, stack: true };
//
//
                $scope.barOptions = {
                    series:{
                        bars:{show: true}
                    },
                    bars:{
                        barWidth:0.8
                    },
                    grid:{
                        backgroundColor: { colors: ["#919191", "#141414"] }
                    }
                };
//
//
//                console.log($scope.barData);
                dataProcess();
            }
        }
    });
