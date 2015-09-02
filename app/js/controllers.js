'use strict';

/* Controllers */
var krossOverAssessment = angular.module('krossOverAssessment',[]);

var currentTime = {};
currentTime.Hour = '';
currentTime.Minute = '';
currentTime.Second = '';

currentTime.clockKrossOver = function ($scope,$timeout) {
    
    $scope.onClock = function(){
		var currentClock = new Date();
		
		var currentHours = currentClock.getHours ( );
		var currentMinutes = currentClock.getMinutes ( );
		var currentSeconds = currentClock.getSeconds ( ); 
		
		currentTime.Hour = currentHours;
		currentTime.Minute = currentMinutes;
		currentTime.Second = currentSeconds;
		
		// Pad the minutes and seconds with leading zeros, if required
		currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;;
		currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

		// Choose either "AM" or "PM" as appropriate
		var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
		
		// Convert the hours component to 12-hour format if needed
		currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
		
		// Convert an hours component of "0" to "12"
		currentHours = ( currentHours == 0 ) ? 12 : currentHours;
		
		// Compose the string for display
		$scope.currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
		
		// Update the time display
		myCurrentTime = $timeout($scope.onClock,1000);
    }
    var myCurrentTime = $timeout($scope.onClock,1000);
	
	$scope.stop = function(){
        $timeout.cancel(myCurrentTime);
    }
	
	$scope.reset= function(){
        myCurrentTime = $timeout($scope.onClock,1000);
    }
}
krossOverAssessment.controller(currentTime);

var alermTime = {};
alermTime.Hour = '';
alermTime.Minute = '';
alermTime.Second = '';


alermTime.alermHour = function ($scope, $rootScope) {
	$scope.alarmHours = function() {
		var hours = 12;
		var hour = [];
		for(var i=0;i<hours;i++) {
		  hour.push(i+1);
		}		
		return hour;
	}
	$scope.selectAction = function() {
		alermTime.Hour = $scope.myHour;
	}
}
alermTime.alermMinute = function ($scope) {
	$scope.alermMinutes = function() {
		var minutes = 60;
		var minute = [];
		for(var i=0;i<minutes;i++) {
		  minute.push(i);
		}		
		return minute;
	}
	$scope.selectAction = function() {
		alermTime.Minute = $scope.myMinute;
	}
}
alermTime.alermSecond = function ($scope) {
	$scope.alermSeconds = function() {
		var seconds = 60;
		var second = [];
		for(var i=0;i<seconds;i++) {
		  second.push(i);
		}		
		return second;
	}
	$scope.selectAction = function() {
		alermTime.Second = $scope.mySecond;
	}
}
alermTime.alermSet = function ($scope,$timeout) {
	
	$scope.setAlarm = function() {
	 
	  if(currentTime.Hour == alermTime.Hour && currentTime.Minute == alermTime.Minute && currentTime.Second == alermTime.Second)
	  {
		//console.log("Alerm");
		window.location.href="http://www.hardibhatt.org/"; 
	  }
      
	  // Update the time display
		myAlermTime = $timeout($scope.setAlarm,1000);
    }
	var myAlermTime = $timeout($scope.setAlarm,1000);
	
}
krossOverAssessment.controller(alermTime);
