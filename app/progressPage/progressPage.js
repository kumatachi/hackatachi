angular.module('progressPage', [])
  .directive('progressPage', function() {
    return {
      templateUrl: 'progressPage/progressPage.html',
      controller: function($scope, dataService) {
          $scope.pieShow = true;
          $scope.barShow = false;
          $scope.dataset = [];
          var dataProcess = function(){
              dataService.getData().then(function(data) {
                  data.map(function(entry) {
                    return {
                      name: entry.name,
                      duration: entry.duration
                    };
                  }).sort(function(a, b) {
                    a = a.name; b = b.name;
                    if (a == b) {
                      return 0;
                    }
                    return a < b ? -1 : 1;
                  }).reduce(function(prev, cur, idx){
                    if (idx == 1) {
                      prev = [prev];
                    }
                    if (prev[prev.length-1].name == cur.name) {
                      prev[prev.length-1].duration += cur.duration
                    }
                    else {
                      prev.push(cur);
                    }

                    return prev;

                  }).forEach(function(datapoint){
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
