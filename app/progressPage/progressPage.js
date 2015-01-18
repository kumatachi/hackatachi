var moment = require('moment');
angular.module('progressPage', [])
    .directive('progressPage', function () {
        return {
            templateUrl: 'progressPage/progressPage.html',
            controller: function ($scope, dataService, $filter) {
                $scope.pieShow = true;
                $scope.barShow = false;
                $scope.data = [];
                var sort = $filter('orderBy');
                var dataProcess = function () {
                    dataService.getData().then(function (data) {
                        var activityTime = 0;
                        $scope.data = data;
                        $scope.dataSet = data.map(function (entry) {
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

                        }, []).map(function (datapoint) {
                                activityTime += datapoint.duration;
                                return {
                                    label: datapoint.name,
                                    data: [datapoint.duration],
                                    dataVal: datapoint.duration,
                                    date: datapoint.date
                                };
                            });
                        $scope.predicate = 'dataVal';
                        $scope.dataSet = sort($scope.dataSet, $scope.predicate);
                    });
                };

                $scope.activityView = function activityView(activityName) {
                    var today = moment().startOf('day');
                    var week = [];

                    for (var i = 7; i > 0; --i) {
                        week.push(today.clone().subtract(i, 'days'));
                    }
                    console.log(activityName)
                    var mapping = week.map(function(day) {
                        return $scope.data.filter(function(a) {
                            return a.name == activityName && moment(a.date).format('YYYY-MM-DD') == day.format('YYYY-MM-DD');
                        });
                    });

                    console.log(mapping);

                  var dummy = [{
                    label: 'fuck',
                      data: [[0, 4]],
                  },
                  {
                    label: 'you',
                      data: [[1, 20]],
                  }];

                  $scope.dataSet = mapping.map(function(activities, idx) {
                    console.log(activities)
                    return {
                      label: today.clone().subtract(idx, 'days').format('dddd'),
                      data: [[idx,activities.reduce(function(prev, curr){
                        return prev + curr.duration;
                      }, 0)]]
                    }
                  })

                  $scope.switchViews('bars')
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
                  series: {
                    bars: {
                      show: true
                    }
                  }
                };

                dataProcess();
            }
        }
    });
