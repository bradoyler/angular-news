'use strict';

angular.module('ngnewsApp')
	.controller('MainCtrl', function($scope, $http) {

		$http({
			method: 'GET',
			url: 'http://newsapi-proxy.herokuapp.com/api/curatedcover'
		}).success(function(data, status, headers, config) {
			$scope.results = data.results;
		}).error(function(data, status, headers, config) {
		});

	});

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