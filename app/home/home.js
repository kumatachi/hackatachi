angular.module('home', [])
  .directive('home', function() {
  return {
    templateUrl: 'home/home.html',
    controller: function($scope, $location, dataService) {
      $scope.models = null;
      $scope.new = function() {
        $location.path('new/')
      }
      $scope.progress = function() {
        $location.path('progress/')
      }
      dataService.getData().then(function(data) {
        $scope.models = data
      })
    },
    restrict: 'AE'
  }
});
