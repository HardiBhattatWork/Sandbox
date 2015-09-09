'use strict';

/**
 * @ngdoc function
 * @name micApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the micApp
 */
angular.module('micApp')
  .controller('MainCtrl', ['$scope', '$filter', 'articleService', function ($scope, filter, articleService) {

 //  	articleService.getArticles().then(function(response){
		
	// 	$scope.count = response.data.length;

 //  		$scope.rowCollection = response.data;
	// });

	$scope.loadMore = function(e) {
		articleService.getArticles({
            start: $scope.count,
            desiredPosts: 2
        }, function(data) {
        	console.log(data);
            if (data.length > 0) {
                // update list
                $scope.rowCollection = $scope.list.concat(data);
            }
        });

	}
  }]);
