angular.module('entryScreen', [])
  .directive('entryScreen', function() {
    return {
    	templateUrl: 'entryScreen/entryScreen.html',
    	controller: function($scope, $location) {
  			$scope.activity = {
      			name: "",
      			duration: 0,
      			notes: ""
      		};
      		$scope.test = 'hello world from test directive';
		}
    }
  });
