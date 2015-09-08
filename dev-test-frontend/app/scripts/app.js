'use strict';

/**
 * @ngdoc overview
 * @name micApp
 * @description
 * # micApp
 *
 * Main module of the application.
 */
angular
  .module('micApp', [
    'smart-table',
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
