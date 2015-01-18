var moment = require('moment');
angular.module('progressPage', [])
    .directive('progressPage', function () {
        return {
            templateUrl: 'progressPage/progressPage.html',
            controller: function ($scope, dataService, $filter) {
                $scope.pieShow = true;
                $scope.barShow = false;
                $scope.rawData = [];
                $scope.dataset = [];
                var sort = $filter('orderBy');
                var dataProcess = function () {
                    dataService.getData().then(function (data) {
                        var activityTime = 0;
                        $scope.rawData = data;
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
                                activityTime += datapoint.duration;
                                var tempObj = {
                                    label: datapoint.name,
                                    data: [datapoint.duration],
                                    dataVal: datapoint.duration,
                                    date: datapoint.date
                                };
                                $scope.dataset.push(tempObj);
                            });
//                        var undocumented = 10080 - activityTime;
//                        $scope.dataset.push({
//                            label: 'Undocumented/Other',
//                            data: [undocumented],
//                            dataVal: undocumented
//                        });
//                        console.log($scope.rawData);
                        $scope.predicate = 'dataVal';
                        $scope.dataset = sort($scope.dataset, $scope.predicate);
                    });
                };

                $scope.activityView = function activityView(activity) {
                    $scope.barData = [];
                    $scope.today = moment();
                    var dayVals = [];
                    var lastWeek = $scope.today.subtract(7, "days");
                  angular.forEach($scope.rawData, function(raw){
                      var eventMoment = moment(raw.date);
                      var withinWeek = !eventMoment.isBefore(lastWeek);
                    if(raw.name == activity && withinWeek == true){
//                        if(eventMoment.day( )> $scope.today.day()){
//
//                        } else {
//
//                        }
                        console.log(eventMoment.diff($scope.today, 'days'));
//                        dayVals[eventMoment.day()-1] =  {
//                            val: raw.duration,
//                            day: eventMoment.day()
//                        };

//                        $scope.barData.push(tempObj);
                    }
                  });
//                    $scope.populateBarData(dayVals, 7);
//                    $scope.switchViews('bars');
                };

                $scope.populateBarData = function populateBarData(dayVals, range){
                    $scope.barData = [];
                    for(var i=0;i<7;i++){
                        $scope.barData[i] = {
                            data: [i, dayVals[i].val],
                            bars: {show: true, barWidth:1, fillColor: '#00b9d7', order: 1, align: "center" }
                        }
                  }
                };

                $scope.switchViews = function switchViews(view){
                    if(view === 'bars'){
                        $scope.pieShow = false;
                        $scope.barShow = true;
                    }else if(view === 'pie'){
                        $scope.barShow = false;
                        $scope.pieShow = true;
                    }
                };

                $scope.pieOptions = {
                    series: {
                        pie: {
                            show: true,
                            label: {
                                show: true,
                                formatter: function(label, slice) {
//                                    console.log(label);
//                                    console.log(slice);
                                    return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + slice.color + ";'><button ng-click='testAlarm();'>" + label + "</button><br/>" + Math.round(slice.percent) + "%</div>";
                                }
                            }
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    },
                    legend: {
                        show: false,
                        labelFormatter: function(label, series){
                            return label;
                        }
                    }
                };

//                var daftPoints = [[0, 4]],
//                    punkPoints = [[1, 20]],
//                    punkPoints2 = [[2, 33]];
//
//                var data1 = [
//                    {
//                        data: daftPoints,
//                        bars: {show: true, barWidth:1, fillColor: '#00b9d7', order: 1, align: "center" }
//                    },
//                    {
//                        data: punkPoints,
//                        bars: {show: true, barWidth:1, fillColor: '#3a4452', order: 2, align: "center" }
//                    },
//                    {
//                        data: punkPoints2,
//                        bars: {show: true, barWidth:1, fillColor: '#3a4452', order: 2, align: "center" }
//                    }
//                ];

//                $scope.data = data1;

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

                dataProcess();
            }
        }
    });
