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
            "getting watery eyed about ",
            "fighting ",
            "licking ",
            "shouting at ",
            "dancing to ",
            "wrestling ",
            "stroking ",
            "cheering on ",
            "launching ",
            "hacking "
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
            "sushi rolls",
            "the pentagon",
            "crayons",
            "32-bit floating point numbers",
            "base conversion",
            "lamps",
            "quadrocopters",
            "inside jokes",
            "deadly mice",
            "no-tear shampoos",
            "flippy floppies"
          ];
          var currDay = moment();
          var saveThis = [];
          var recentActions = [];
          var variety = 15;
          for(var x = 0; x < 50; x++){
            currDay = currDay.subtract(Math.floor(x/5),"days");
            var a = ((x * 23) + moment().millisecond()) % actions.length;
            var n = ((x * 41) + moment().millisecond()) % nouns.length;
            if(recentActions.length <= variety){
              recentActions.push(actions[a] + nouns[n]);
              if (actions.length > 5) {
                actions.splice(a, 1);
              }
              if (nouns.length > 5) {
                nouns.splice(n, 1);
              }
            }
            var activity = {
              _id: currDay.toISOString(),
              name: recentActions[x%variety],
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
            }else{
              console.log("successful generation");
            }
          });



        }
        
		  }
    }
  });
