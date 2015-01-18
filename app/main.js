require('./headerBar/headerBar')
require('./entryScreen/entryScreen')
require('./home/home')
require('./progressPage/progressPage')

angular.module('hackatachi', [
  'headerBar',
   'entryScreen',
  'home',
        'progressPage',
  'ngRoute',
        'angular-flot']
)
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
