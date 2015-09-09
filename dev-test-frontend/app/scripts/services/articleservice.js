'use strict';

/**
 * @ngdoc service
 * @name micApp.articleService
 * @description
 * # articleService
 * Service in the micApp.
 */
angular.module('micApp')
  .service('articleService', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
     this.getArticles = function() {
	    var promise = $http({
	        method : 'GET',
	        url : 'data/articles.json'
	    }).success(function(data, status, headers, config) {
	        return data;
	    });   

	    return promise; 
	};
		
	this.getMoreArticles = function() {
	    var promise = $http.get('data/more-articles.json').success(function(data, status, headers, config) {
	        return data;
	    });   

	    return promise; 
	};
  }]);
