angular.module('headerBar', [])
  .directive('headerBar', function() {
    return {
      templateUrl: 'headerBar/headerBar.html',
      controller: function($scope, $location) {
        $scope.home = function() {
          $location.path('/')
        }
		$scope.progress = function() {
        $location.path('progress/')
      	}
		$scope.new = function() {
        $location.path('new/')
      	}
      }
    }
  });
