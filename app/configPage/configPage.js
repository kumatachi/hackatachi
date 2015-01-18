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
          /*var actions = [
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
          }*/

          var durations = [30, 45, 60, 120, 15, 20, 25]
          var getDate = function(str) {
            return moment('2015-' + str, 'YYYY-MM-DD').add(1, 'seconds').toISOString()
          };

          var getActivity = function(name, date, duration) {
            var activity = {
              name: name,
              duration: duration ? duration : durations[Math.floor(Math.random() * durations.length)],
              date: getDate(date)
            };
            console.log(activity)
            return activity
          }

          db.bulkDocs([
            getActivity('Browsing Reddit', '01-18', 60),
            getActivity('Browsing Reddit', '01-17', 60),
            getActivity('Browsing Reddit', '01-16', 60 * 2),
            getActivity('Browsing Reddit', '01-15', 60 * 3),
            getActivity('Browsing Reddit', '01-14', 60 * 4),
            getActivity('Browsing Reddit', '01-13', 60 * 5),
            getActivity('Browsing Reddit', '01-12', 60 * 5),
            getActivity('Browsing Reddit', '01-11', 60 * 5),
            getActivity('Browsing Reddit', '01-10', 60 * 5),
            getActivity('Browsing Reddit', '01-09', 60 * 6),
            getActivity('Browsing Reddit', '01-08', 60 * 5),
            getActivity('Browsing Reddit', '01-07', 60 * 5),
            getActivity('Browsing Reddit', '01-06', 60 * 7),
            getActivity('Browsing Reddit', '01-05', 60 * 4),
            getActivity('Browsing Reddit', '01-04', 60 * 5),


            getActivity('Coding Practice', '01-18', 60 * 5),
            getActivity('Coding Practice', '01-17', 60 * 5),
            getActivity('Coding Practice', '01-16', 60 * 5),
            getActivity('Coding Practice', '01-15', 60 * 5),
            getActivity('Coding Practice', '01-14', 60 * 5),
            getActivity('Coding Practice', '01-13', 60 * 4),
            getActivity('Coding Practice', '01-12', 60 * 4),
            getActivity('Coding Practice', '01-11', 60 * 5),
            getActivity('Coding Practice', '01-10', 60 * 3),
            getActivity('Coding Practice', '01-09', 60 * 3),
            getActivity('Coding Practice', '01-08', 60 * 4),
            getActivity('Coding Practice', '01-07', 60 * 2),
            getActivity('Coding Practice', '01-06', 60 * 3),
            getActivity('Coding Practice', '01-05', 60 * 3),
            getActivity('Coding Practice', '01-04', 60 * 1),

            getActivity('Exercising', '01-18', 90),
            getActivity('Exercising', '01-17', 60),
            getActivity('Exercising', '01-16', 90 * 1),
            getActivity('Exercising', '01-13', 75 * 1),
            getActivity('Exercising', '01-11', 90 * 1),

            getActivity('Exercising', '01-10', 60 * 1),
            getActivity('Exercising', '01-07', 60 * 1),
            getActivity('Exercising', '01-04', 60 * 1),
          ], function(err, response) {
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
