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
                            if (prev.length > 0 && prev[prev.length - 1].name == cur.name) {
                                prev[prev.length - 1].duration += cur.duration;
                            }
                            else {
                                prev.push(cur);
                            }

                            return prev;

                        }, []).forEach(function (datapoint) {
                                activityTime += datapoint.duration;
                                var tempObj = {
                                    label: datapoint.name,
                                    data: [datapoint.duration],
                                    dataVal: datapoint.duration,
                                    date: datapoint.date
                                };
                                $scope.dataset.push(tempObj);
                            })
                        $scope.predicate = 'dataVal';
                        $scope.dataset = sort($scope.dataset, $scope.predicate);
                    });
                };

                $scope.activityView = function activityView(activity) {
                    var today = moment().startOf('day');
                    var week = [];

                    for (var i = 7; i > 0; --i) {
                        week.push(today.clone().subtract(i, 'days'));
                    }

                    var mapping = week.map(function(day) {
                        return $scope.rawData.filter(function(activity) {
                            return moment(activity.date).format('YYYY-MM-DD') == day.format('YYYY-MM-DD');
                        });
                    })

                    console.log(mapping);
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
                                    return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + slice.color + ";'>" + label + "<br/>" + Math.round(slice.percent) + "%</div>";
                                }
                            }
                        }
                    },
                    grid: {
                        //hoverable: true,
                        //clickable: true
                    },
                    legend: {
                        show: false,
                        labelFormatter: function(label, series){
                            return label;
                        }
                    }
                };


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
