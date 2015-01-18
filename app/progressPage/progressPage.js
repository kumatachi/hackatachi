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
                        data.forEach(function (datapoint) {
                            var tempObj = {
                                label: datapoint.name,
                                data: [5, datapoint.duration],
                                hoverable: true
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
                    legend: {
                        show: false
                    }
                };


                $scope.barOptions = {
                    series: {
                        bars: {
                            barWidth: 5,
                            align: "left"
                        }
                    },
                    legend: {
                        show: false
                    }
                };

                dataProcess();
            }
        }
    });
