var moment = require('moment');

angular.module('entryScreen', [])
  .directive('entryScreen', function() {
    return {
    	templateUrl: 'entryScreen/entryScreen.html',
    	controller: function($scope, $location) {
    		$scope.timerActive = false;
  			$scope.activity = {
      			name: "",
      			duration: 0,
      			notes: "",
      			date: new Date().toISOString(),
      			startTime: null,
      			endTime: null
      		};
      		$scope.startActivity = function(){
      			$scope.activity.startTime = new Date().toISOString();
      			$scope.timerActive = true;
      		}
      		$scope.endActivity = function(){
      			$scope.activity.endTime = new Date().toISOString();
      			$scope.timerActive = false;
      			var s = moment($scope.activity.startTime),
      				e = moment($scope.activity.endTime);
      			$scope.activity.duration = e.diff(s).asMinutes(); //milli to minutes
      		}
		}
    }
  });
