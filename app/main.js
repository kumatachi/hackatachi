require('./headerBar/headerBar')
require('./home/home')

angular.module('hackatachi', [
  'headerBar',
  'home',
  'ngRoute']
)
  .config(function($routeProvider) {
  	$routeProvider.
      when('/', {
        template: '<home></home>',
      }).
      otherwise({
        redirectTo: '/'
      });
  });
