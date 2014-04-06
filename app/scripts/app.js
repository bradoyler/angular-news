'use strict';

angular
  .module('ngnewsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularMoment',
    'ui.bootstrap'
  ])
  .config(function($routeProvider, $anchorScrollProvider, $locationProvider) {

   // $anchorScrollProvider.disableAutoScrolling();

   // $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/article/:externalId', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
