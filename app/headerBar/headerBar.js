angular.module('headerBar', [])
  .directive('headerBar', function() {
    return {
      templateUrl: 'headerBar/headerBar.html',
      controller: function($scope, $location) {
        $scope.home = function() {
          $location.path('/')
        }
      }
    }
  });
