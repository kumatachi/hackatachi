require('./testDirective/testDirective')

angular.module('hackatachi', ['testDirective'])
  .run(function($rootScope) {
  });
