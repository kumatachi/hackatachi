require('./headerBar/headerBar')
require('./entryScreen/entryScreen')
require('./home/home')

angular.module('hackatachi', [
  'headerBar',
   'entryScreen',
  'home',
  'ngRoute']
)
  .config(function($routeProvider) {
  	$routeProvider.
      when('/', {
        template: '<home></home>',
      }).
      when('/new', {
        template: '<entry-screen></entry-screen>'
      }).
      otherwise({
        redirectTo: '/'
      });
  });
