"use strict";angular.module("ngnewsApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider","$anchorScrollProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/article/:externalId",{templateUrl:"views/article.html",controller:"ArticleCtrl"}).otherwise({redirectTo:"/"})}]);var apihost="http://newsapi-proxy.herokuapp.com/api";angular.module("ngnewsApp").controller("MainCtrl",["$scope","$http","$rootScope",function(a,b,c){c.coverRes?a.articles=c.coverRes.results:b({method:"GET",url:apihost+"/curatedcover"}).success(function(b){a.articles=b.results,c.coverRes=b}).error(function(){})}]),angular.module("ngnewsApp").controller("ArticleCtrl",["$scope","$http","$routeParams","$rootScope","$filter","$anchorScroll",function(a,b,c,d,e,f){if(d.coverRes){var g=e("filter")(d.coverRes.results,{externalId:c.externalId});a.item=g[0]}else b({method:"GET",url:apihost+"/entrybyid?articleId=NewsCms%2Fentry%2F"+c.externalId}).success(function(b){a.item=b.results[0]}).error(function(){});f()}]),angular.module("ngnewsApp").directive("adaptiveImage",function(){return{restrict:"EAC",link:function(a,b,c){a.$watch(c.adaptiveImage,function(a){var c="520",d="240";"undefined"!=typeof a&&(a=a.toLowerCase().replace("/i/","/j/").replace(".jpg",".nbcnews-fp-"+c+"-"+d+".jpg").replace(".png",".nbcnews-fp-"+c+"-"+d+".png")),b.prop("src",a)})}}}),angular.module("ngnewsApp").factory("Articles",function(){return[]});