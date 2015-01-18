require('./headerBar/headerBar')
require('./entryScreen/entryScreen')
require('./home/home')
require('./progressPage/progressPage')

angular.module('persist', [])
.factory('db', function() {
    var db = new PouchDB('test');
    return db;
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
