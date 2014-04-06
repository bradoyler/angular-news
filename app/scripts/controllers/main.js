'use strict';

var apihost = 'http://newsapi-proxy.herokuapp.com/api';

// Controllers
angular.module('ngnewsApp')
	.controller('MainCtrl', function($scope, $http, $rootScope) {

		// $scope.isCollapsed = true;
		// $scope.toggleMenu = function() {
		// 	$scope.isCollapsed = $scope.isCollapsed === false ? true: false;
		// };

		if ($rootScope.coverRes) {
			$scope.articles = $rootScope.coverRes.results;
		} else {
			$http({
				method: 'GET',
				url: apihost + '/curatedcover'
			}).success(function(data, status, headers, config) {
				$scope.articles = data.results;
				$rootScope.coverRes = data;
			}).error(function(data, status, headers, config) {});
		}

	});


angular.module('ngnewsApp')
	.controller('ArticleCtrl', function($scope, $http, $routeParams, $rootScope, $filter, $anchorScroll) {

		if ($rootScope.coverRes) {
			var thisArticle = $filter('filter')($rootScope.coverRes.results, {
				externalId: $routeParams.externalId
			});
			$scope.item = thisArticle[0];
		} else {
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

// Services
angular.module('ngnewsApp')
	.factory('Articles', function() {
		return [];
	});