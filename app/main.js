require('./headerBar/headerBar')
require('./entryScreen/entryScreen')
require('./home/home')
require('./progressPage/progressPage')
require('./configPage/configPage')

angular.module('persist', [])
.factory('db', function() {
    var db = new PouchDB('test2');
    return db;
  })
.factory('dataService', function($q, db) {
  return {
    getData: function() {
      var deferred = $q.defer();

      db.allDocs({include_docs: true}, function(err, doc) {
        if (!err) {
          var docs = doc.rows
            .map(function(row){return row.doc})
            .filter(function (doc) {
              return doc.name;
            });
          deferred.resolve(docs);
        }
        else {
          deferred.reject(err);
        }
      });

      return deferred.promise;
    }
  }
});

angular.module('hackatachi', [
  'headerBar',
  'entryScreen',
  'home',
  'angular-flot',
  'persist',
  'progressPage',
  'configPage',
  'ngRoute'])
  .config(function($routeProvider) {
  	$routeProvider.
      when('/', {
        template: '<home></home>',
      }).
      when('/new', {
        template: '<entry-screen></entry-screen>'
      }).
      when('/progress', {
        template: '<progress-page activity-name="activityName"></progress-page>',
        controller: function($scope, $routeParams) {
          $scope.activityName = $routeParams.activityName;
        }
      }).
      when('/config', {
        template: '<config-page></config-page>'
      }).
      otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope) {
    $rootScope.hasProgress = function(){
      return ($scope.models != null && $scope.models.length != 0)
    }
  });
