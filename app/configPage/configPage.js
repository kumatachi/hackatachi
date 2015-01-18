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
        };

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

          var uniqueActivities = [];
          var variety = 5;
          var currDay = moment();

          for (var i = 0; i < variety; ++i) {
            var activity = actions[0] + nouns[0]
            actions.splice(0, 1);
            nouns.splice(0, 1);
            uniqueActivities.push(activity);
          }

          console.log(uniqueActivities);

          var saveThis = [];
          for (var i = 0; i < 15; ++i) {
            uniqueActivities.forEach(function(activityName) {
              var randomNumber = Math.floor(Math.random() * 7);
              var activity = {
                _id: new Date().toISOString(),
                name: activityName,
                notes: "",
                date: currDay.clone().subtract(randomNumber, 'days').toISOString(),
                duration: Math.floor(480 * Math.random()),
                startTime: null,
                endTime: null
              }
              console.log(activity)
              saveThis.push(activity)
            })
          }

          /*var currDay = moment();
          var saveThis = [];
          var recentActions = [];
          for(var x = 0; x < 100; x++){
            currDay = currDay.clone().subtract(Math.floor(x%5),"days");
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
          }*/
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
