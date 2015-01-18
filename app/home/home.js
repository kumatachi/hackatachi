angular.module('home', [])
  .directive('home', function() {
  return {
    templateUrl: 'home/home.html',
    controller: function($scope, $location, db) {
      $scope.test = 'hello world from test directive'
      $scope.new = function() {
        $location.path('new/')
      }
      $scope.review = function() {
        $location.path('progress/')
      }

      db.allDocs({include_docs: true}, function(err, doc) {
        $scope.$apply(function() {
          $scope.models = doc.rows
        })
      })
    },
    restrict: 'AE'
  }
});
