var moment = require('moment');

angular.module('entryScreen', [])
  .directive('entryScreen', function() {
    return {
    	templateUrl: 'entryScreen/entryScreen.html',
    	controller: function($scope, $location) {
  			$scope.activity = {
      			name: "",
      			duration: 0,
      			notes: "",
      			date: moment(),
      			timerActive: false,
      			startTime: null,
      			endTime: null
      		};
      		$scope.startActivity = function(){
      			
      			$scope.activity.startTime = moment();
      			$scope.activity.timerActive = true;
      		}
      		$scope.endActivity = function(){
      			$scope.activity.endTime = moment();
      			$scope.activity.timeActive = false;
      		}
		}
    }
  });
