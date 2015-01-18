var moment = require('moment');
angular.module('entryScreen', ['ui.bootstrap'])
  .directive('entryScreen', function($interval, db, dataService) {
    return {
    	templateUrl: 'entryScreen/entryScreen.html',
      link: function(scope, elem) {
      },
    	controller: function($scope, $location) {

        var setDuration = function() {
          var s = moment($scope.activity.startTime),
            e = moment();
          var duration = Math.ceil(e.diff(s)/1000);
          var m = moment().startOf('day').add(duration, 'seconds');
          $scope.durationHours = m.hour();
          $scope.durationMinutes = m.minute();
          $scope.durationSeconds = m.second();
        };

    		$scope.timerActive = false;
        	$scope.durationHours = $scope.durationMinutes = $scope.durationSeconds = 0
    		$scope.selectedDate = moment();
    		$scope.otherActivities = [];
  			$scope.activity = {
          _id: $scope.selectedDate.toISOString(),
          name: "",
          notes: "",
          date: $scope.selectedDate.toISOString(),
          startTime: null,
          endTime: null
        };

        var interval;
        var generateOtherActivities = function(){
        	dataService.getData().then(function(data) {
	          	$scope.otherActivities = data.map(function(e) {
	            	return e.name
	          	}).sort().reduce(function(prev, curr, index){
	            if (prev[prev.length-1] == curr) {
	            	return prev;
	            }
	            else {
	            	return prev.concat(curr)
	            }
	        	}, []);
        	});
        }
        generateOtherActivities();
        $scope.previousDay = function(){
          $scope.selectedDate.subtract(1, 'days');
          $scope.activity._id = $scope.selectedDate.toISOString();
          $scope.activity.date = $scope.selectedDate.toISOString();
        };
        $scope.nextDay = function(){
          $scope.selectedDate.add(1, 'days');
          $scope.activity._id = $scope.selectedDate.toISOString();
          $scope.activity.date = $scope.selectedDate.toISOString();
        };
        $scope.startActivity = function(){
          $scope.activity.startTime = new Date().toISOString();
          $scope.timerActive = true;

          setDuration();
          if (!angular.isDefined(interval)) {
            interval = $interval(function() {
              setDuration();
            }, 1000)
          }
        };
        $scope.endActivity = function(){
          $scope.activity.endTime = new Date().toISOString();
          $scope.timerActive = false;
          if (angular.isDefined(interval)) {
            $interval.cancel(interval);
            interval = undefined;
          }
          setDuration();
        };


        $scope.$on('$destroy', function() {
          if (angular.isDefined(interval)) {
            $interval.cancel(interval);
            interval = undefined;
          }
        });

        $scope.submit = function(){
          $scope.activity.duration = $scope.durationHours * 60 + $scope.durationMinutes;
          db.put($scope.activity, function(err, res) {
            if (err) {
              console.log(err);
            }
            else {
              console.log(res);
              toastr.info("Logged it!");
              $(".entryContainer").slideUp(500);
              $scope.$apply(function(){
              	generateOtherActivities();
                $scope.durationHours = $scope.durationMinutes = $scope.durationSeconds = 0
                $scope.selectedDate = moment();
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
            }
          });
        };
        $scope.isToday = function(){
          return moment().startOf('day').diff($scope.selectedDate.startOf('day'), 'days') == 0;
        }
		  }
    }
  });
