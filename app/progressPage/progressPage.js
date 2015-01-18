angular.module('progressPage', [])
  .directive('progressPage', function() {
    return {
      templateUrl: 'progressPage/progressPage.html',
      controller: function($scope, dataService) {
          $scope.dataset = [];
          var dataProcess = function(){
              dataService.getData().then(function(data) {
                  data.forEach(function(datapoint){
                      var tempObj = {
                          label: datapoint.name,
                          data: [datapoint.duration]
                      };
                      $scope.dataset.push(tempObj);
                  })
              });
          };

          $scope.options = {
              series: {
                  pie: {
                      show: true
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
