require('./testDirective/testDirective')
require('./home/home')

angular.module('hackatachi', ['home', 'ngRoute'])
  .config(function($routeProvider) {
  	$routeProvider.
      when('/', {
        template: '<home></home>',
      }).
      otherwise({
        redirectTo: '/'
      });
  });
