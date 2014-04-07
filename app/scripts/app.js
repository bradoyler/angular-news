'use strict';

angular
  .module('ngnewsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularMoment',
    'angularShamSpinner',
    'ui.bootstrap'
  ])
  .config(function($routeProvider, $anchorScrollProvider, $locationProvider, $httpProvider) {

    // $anchorScrollProvider.disableAutoScrolling();
    // $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        title: 'The News: Home'
      })
      .when('/article/:externalId', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      })
      .when('/storyline/:storylineSlug', {
        templateUrl: 'views/main.html',
        controller: 'StorylineCtrl'
      })
      .when('/:sectionSlug', {
        templateUrl: 'views/main.html',
        controller: 'SectionCtrl'
      })
      .when('/:sectionSlug/:topicSlug', {
        templateUrl: 'views/main.html',
        controller: 'TopicCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
