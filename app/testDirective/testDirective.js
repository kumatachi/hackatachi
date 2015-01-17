angular.module('testDirective', [])
  .directive('testDirective', function() {
  return {
    templateUrl: 'testDirective/testDirective.html',
    controller: function($scope) {
      $scope.test = 'hello world from test directive'
    },
    restrict: 'AE'
  }
});
