'use strict';

/* App Module */

var app = angular.module('myApp', []);

/* $http ajax calls really belongs in a service, 
but I'll be using them inside the controller for this assessment */ 

app.controller('myCtrl', function($scope, $http) {
  /*$http.get('path/to/json').then(function(data) {
    $scope.survays = data;
  });*/
  //inputting json directly for this example
	$scope.survays = [{
		title: "What do you like?",
		pointValue: 35,
		description: "Sample survey to handle gathering basic user info",
		questions: [{ title: "What is your favorite color"}, 
					{ title: "What is your favorite sport?"}]
	}];
	$scope.tempQuestion = [];
	
	/* Save the survays object into a JSON file. */
	$scope.save = function() {
		/*$http.post('path/to/server/file/to/save/json', $scope.survays).then(function(data) {
		  $scope.msg = 'Data saved';
		});*/
		$scope.msg = 'Data sent: '+ JSON.stringify($scope.survays);
	};
  
	$scope.getSurvays = function () {
		return $scope.survays.length;
	};
  
	/*Add all questions to a temp object. */
	$scope.addQuestions = function () {
		$scope.tempQuestion.push({title: $scope.formQuestionText});
		console.log($scope.tempQuestion);
		$scope.formQuestionText = '';
	};
	
	/* Add the survay to the survays object */
	$scope.addSurvay = function () {
		$scope.survays.push({title:$scope.formSurvayText, pointValue:$scope.formPointText, description: $scope.formDescText, questions:$scope.tempQuestion});
		$scope.formSurvayText = '';
		$scope.formPointText = '';
		$scope.formDescText = '';
		$scope.tempQuestion = [];
	};
  
  
});