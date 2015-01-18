angular.module('progressPage', [])
  .directive('progressPage', function() {
    return {
      templateUrl: 'progressPage/progressPage.html',
      controller: function($scope) {
          $scope.dataset = [{ data: [], yaxis: 1, label: "sin" }];
          $scope.options = {
              legend: {
                  container: "#legend",
                  show: true
              }
          };
          for (var i = 0; i < 14; i += 0.5) {
              $scope.dataset[0].data.push([i, Math.sin(i)]);
          }
          console.log($scope.dataset);
      }
    }
  });
