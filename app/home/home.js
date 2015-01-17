angular.module('home', [])
  .directive('home', function() {
  return {
    templateUrl: 'home/home.html',
    controller: function($scope) {
      $scope.test = 'hello world from test directive'
    },
    restrict: 'AE'
  }
});
