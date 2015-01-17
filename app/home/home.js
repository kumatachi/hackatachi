angular.module('home', [])
  .directive('home', function() {
  return {
    templateUrl: 'home/home.html',
    controller: function($scope, $location) {
      $scope.test = 'hello world from test directive'
      $scope.new = function() {
        $location.path('new/')
      }
      $scope.review = function() {
        $location.path('review/')
      }
    },
    restrict: 'AE'
  }
});
