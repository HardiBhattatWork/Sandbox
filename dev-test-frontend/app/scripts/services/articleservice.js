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

    // Return public API.
    return({
        getArticles: getArticles,
        getMoreArticles: getMoreArticles
    });


    function getArticles() {
	    var request = $http({
	        method : 'GET',
	        url : 'data/articles.json'
	    }).success(function(data, status, headers, config) {
	        return data;
	    });   

	    return ( request.then( handleSuccess, handleError ) ); 
	}
		
	function getMoreArticles() {
	    var request = $http.get('data/more-articles.json').success(function(data, status, headers, config) {
	        return data;
	    });   

	    return ( request.then( handleSuccess, handleError ) );; 
	}

	// I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError( response ) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    
	// I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
        return ( response.data );
    }
  }]);
