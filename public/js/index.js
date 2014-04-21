$(document).foundation();

var ngModule = angular.module('aptjs', ['ngRoute']);

ngModule.factory({
  Socket: require('./services/socket'),
  Flash: require('./services/flash')
});

ngModule.directive({
  contenteditable: require('./directives/contenteditable')
});

ngModule.config([
	'$routeProvider',

  '$locationProvider',
  
  function (  $routeProvider,     $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider

      .when('/install', {
        template: 'Installing what?'
      });

    $routeProvider
      .otherwise({
        template: 'Hello'
      });
  }]);

ngModule.run(function ($rootScope) {
  
});