var moment = require('moment');
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

        $scope.generateData = function(){
          var actions = [
            "sitting on ",
            "eating ",
            "writing about ",
            "making ",
            "programming ",
            "researching ",
            "testing ",
            "drinking via ",
            "watching a documentary about ",
            "pondering the meaning of ",
            "getting watery eyed about "
          ];
          var nouns = [
            "cats",
            "dogs",
            "spoons",
            "the multiverse",
            "children",
            "mints",
            "internships",
            "programs",
            "hackathons",
            "comets",
            "tim tams",
            "ducks",
            "glasses",
            "tie-dye sweaters",
            "itchy socks",
            "the tiny people",
            "the lost boys",
            "sushi rolls"
          ];
          var currDay = moment();
          var saveThis = [];
          for(var x = 0; x < 20; x++){
            currDay = currDay.subtract(Math.floor(x/5),"days");
            var a = (x * 23) % actions.length;
            var n = (x * 41) % nouns.length;
            var theAct = actions[a] + nouns[n];
            //console.log(theAct);
            var activity = {
              _id: currDay.toISOString(),
              name: theAct,
              notes: "",
              date: currDay.toISOString(),
              duration: (x * 27) % 300,
              startTime: null,
              endTime: null
            };
            saveThis.push(activity);
          }
          db.bulkDocs(saveThis, function(err, response) {
            if(err){
              console.log(err);
            }
            console.log("successful generation");
          });



        }
        
		  }
    }
  });
