'use strict';

var apihost = 'http://newsapi-proxy.herokuapp.com/api';

// Controllers
angular.module('ngnewsApp')
	.controller('MainCtrl', function($scope, $http, $rootScope, $location) {
		$scope.$path = $location.path.bind($location);

		$http({
			method: 'GET',
			url: apihost + '/curatedcover'
		}).success(function(data, status, headers, config) {
			$scope.articles = data.results;
			$rootScope.coverRes = data;
		}).error(function(data, status, headers, config) {});

	});

angular.module('ngnewsApp')
	.controller('SectionCtrl', function($scope, $http, $routeParams, $rootScope, $location) {

		$http({
			method: 'GET',
			url: apihost + '/entriesbysection?section=' + $routeParams.sectionSlug
		}).success(function(data, status, headers, config) {
			$scope.articles = data.results;
			$rootScope.sectionRes = data;
		}).error(function(data, status, headers, config) {});

	});

angular.module('ngnewsApp')
	.controller('TopicCtrl', function($scope, $http, $routeParams, $rootScope, $location) {

		$http({
			method: 'GET',
			url: apihost + '/entriesbytopic?topic=' + $routeParams.topicSlug
		}).success(function(data, status, headers, config) {
			$scope.articles = data.results;
			$rootScope.sectionRes = data;
		}).error(function(data, status, headers, config) {});

	});

angular.module('ngnewsApp')
	.controller('ArticleCtrl', function($scope, $http, $routeParams, $rootScope, $filter, $anchorScroll) {

		var thisArticle=null;
		if ($rootScope.coverRes) {
			thisArticle = $filter('filter')($rootScope.coverRes.results, {
				externalId: $routeParams.externalId
			});
		}

		if(thisArticle[0]){
			$scope.item = thisArticle[0];
		}
		else {
			$http({
				method: 'GET',
				url: apihost + '/entrybyid?articleId=NewsCms%2Fentry%2F' + $routeParams.externalId
			}).success(function(data, status, headers, config) {
				$scope.item = data.results[0];
			}).error(function(data, status, headers, config) {});
		}

		$anchorScroll();

	});


// Directives 
angular.module('ngnewsApp')
	.directive('adaptiveImage', function() {
		return {
			restrict: 'EAC',
			link: function(scope, elm, attrs) {
				scope.$watch(attrs.adaptiveImage, function(imgurl) {

					var width = '520';
					var height = '240';
					if (typeof imgurl !== 'undefined') {
						imgurl = imgurl.toLowerCase().replace('/i/', '/j/').replace('.jpg', '.nbcnews-fp-' + width + '-' + height + '.jpg')
							.replace('.png', '.nbcnews-fp-' + width + '-' + height + '.png');
					}
					elm.prop('src', imgurl);
				});
			}
		};
	});

angular.module('ngnewsApp')
	.directive('panelA', function() {
		return {
			templateUrl: 'views/partials/panel-a.html'
		};
	});

angular.module('ngnewsApp')
	.directive('loadingIndicator', function() {
		return {
			restrict: 'A',
			template: '<div>Loading...</div>',
			link: function(scope, element, attrs) {
				scope.$on('loading-started', function(e) {
					element.css({
						'display': ''
					});
				});

				scope.$on('loading-complete', function(e) {
					element.css({
						'display': 'none'
					});
				});

			}
		};
	});

// Services
angular.module('ngnewsApp')
	.factory('Articles', function() {
		return [];
	});