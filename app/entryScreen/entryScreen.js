var moment = require('moment');
angular.module('entryScreen', ['ui.bootstrap'])
  .directive('entryScreen', function() {
    return {
    	templateUrl: 'entryScreen/entryScreen.html',
    	controller: function($scope, $location, db, dataService) {
    		$scope.timerActive = false;
    		$scope.selectedDate = moment();
    		$scope.otherActivities = [];
  			$scope.activity = {
      			_id: $scope.selectedDate.toISOString(),
      			name: "",
      			duration: 0,
      			notes: "",
      			date: $scope.selectedDate.toISOString(),
      			startTime: null,
      			endTime: null
      		};

      		dataService.getData().then(function(data) {
      			$scope.otherActivities = data.map(function(e) {
      				return e.name
      			}).sort().reduce(function(prev, curr, index){
      				if (index == 1) {
      					prev = [prev]
      				}
      				if (prev[prev.length-1] == curr) {
      					return prev;
      				}
      				else {
      					return prev.concat(curr)
      				}
      			});
      		})
      		$scope.previousDay = function(){
      			$scope.selectedDate.subtract(1, 'days');
      			$scope.activity._id = $scope.selectedDate.toISOString();
      			$scope.activity.date = $scope.selectedDate.toISOString();
      		}
      		$scope.nextDay = function(){
      			$scope.selectedDate.add(1, 'days');
      			$scope.activity._id = $scope.selectedDate.toISOString();
      			$scope.activity.date = $scope.selectedDate.toISOString();
      		}
      		$scope.startActivity = function(){
      			$scope.activity.startTime = new Date().toISOString();
      			$scope.timerActive = true;
      		}
      		$scope.endActivity = function(){
      			$scope.activity.endTime = new Date().toISOString();
      			$scope.timerActive = false;
      			var s = moment($scope.activity.startTime),
      				e = moment($scope.activity.endTime);
      			$scope.activity.duration = (e.diff(s)/1000)/60;//.asMinutes(); //milli to minutes
      		}
      		$scope.submit = function(){
      			db.put($scope.activity, function(err, res) {
  					if (err) {
  						console.log(err);
  					}
  					toastr.info("Logged it!");
  					$(".entryContainer").slideUp(500);
  					$scope.$apply(function(){
  						$scope.activity = {
			      			_id: $scope.selectedDate.toISOString(),
			      			name: "",
			      			duration: 0,
			      			notes: "",
			      			date: $scope.selectedDate.toISOString(),
			      			startTime: null,
			      			endTime: null
			      		};
  					});
  					$(".entryContainer").slideDown(500);
      			});
      		}
      		$scope.isToday = function(){
      			return moment().startOf('day').diff($scope.selectedDate.startOf('day'), 'days') == 0;
      		}
		}
    }
  });
