var moment = require('moment')

angular.module('entryScreen', [])
  .directive('entryScreen', function() {
    return {
    	templateUrl: 'entryScreen/entryScreen.html',
    	controller: function($scope, $location, db) {
        $scope.model = {};
  			$scope.activity = {
      			name: "",
      			duration: 0,
      			notes: ""
      		};
        $scope.test = 'hello world from test directive';
        $scope.submit = function() {
          if (!$scope.model._id) {
            $scope.model._id = new Date().toISOString()
          }
          if (!$scope.model.date) {
            $scope.model.date = new Date().toISOString()
          }
          console.log($scope.model)
          db.put($scope.model, function(err, result) {
            if (!err) {
              console.log("success")
            }
            else {
              console.log(err)
            }
          })
        }
		}
    }
  });
