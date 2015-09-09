'use strict';

/**
 * @ngdoc function
 * @name micApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the micApp
 */
angular.module('micApp')
  .controller('MainCtrl', ['$scope', '$filter', 'articleService', function ($scope, $filter, articleService) {

	  	$scope.rowCollection = [];
	  	var maxVal = 0;
	  	var loadMore = true;

	  	loadArticleData();

		var pagesShown = 1;
		var pageSize = 10;

		$scope.paginationLimit = function(data) {
	 		return pageSize * pagesShown;
		};

		$scope.hasMoreItemsToShow = function() {
			var moreTotal = true;
			if(loadMore == false && moreTotal == true) {
				console.log(moreTotal);
				var moreTotal = pagesShown < (maxVal / pageSize);
				console.log(moreTotal);
			}
			var total = pagesShown < (maxVal / pageSize);
			console.log(maxVal);
			if (maxVal != 0 && total == false && loadMore == true){
				loadMoreArticleData();
				loadMore = false;
				maxVal = 0;
				pagesShown += 3;
			}
			return moreTotal;
		};

		$scope.showMoreItems = function() {
			pagesShown = pagesShown + 1;       
		}; 	

	  	// I apply the remote data to the local scope.
	    function applyRemoteData( newArticles ) {
	    	maxVal = newArticles.length;
	        $scope.rowCollection = $scope.rowCollection.concat(newArticles);
	    }

		// I load the remote data from the server.
	    function loadArticleData() {
	        // The friendService returns a promise.
	        articleService.getArticles().then(
	            function( article ) {
	                applyRemoteData( article );
	            }
	        );
	    }

	    // I load the remote data from the server.
	    function loadMoreArticleData() {
	        // The friendService returns a promise.
	        articleService.getMoreArticles().then(
	            function( article ) {
	                applyRemoteData( article );
	            }
	        );
	    }
  }]);
