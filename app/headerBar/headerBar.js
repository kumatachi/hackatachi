angular.module('headerBar', [])
  .directive('headerBar', function() {
    return {
      templateUrl: 'headerBar/headerBar.html',
      controller: function($scope, $location, dataService) {
        $scope.home = function() {
          $location.path('/')
        }
        $scope.progress = function() {
          $location.path('progress/')
      	}
		    $scope.new = function() {
          $location.path('new/')
      	}
        $scope.hasProgress = function(){
          return ($scope.models != null && $scope.models.length != 0)
        }
        dataService.getData().then(function(data) {
          //yes this is super ineffecient
          $scope.models = data
        })
      }
    }
  });
