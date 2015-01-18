require('./headerBar/headerBar')
require('./entryScreen/entryScreen')
require('./home/home')
require('./progressPage/progressPage')

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
        template: '<progress-page></progress-page>'
      }).
      otherwise({
        redirectTo: '/'
      });
  });
