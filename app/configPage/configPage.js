angular.module('configPage', [])
  .directive('configPage', function($interval, db, dataService) {
    return {
    	templateUrl: 'configPage/configPage.html',
      link: function(scope, elem) {
      },
    	controller: function($scope, $location, db) {
        $scope.destroyDB = function(){
          db.destroy();
        }
        
		  }
    }
  });
