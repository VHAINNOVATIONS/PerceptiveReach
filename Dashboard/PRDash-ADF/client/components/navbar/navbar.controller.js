'use strict';

angular.module('app')
  .controller('NavBarCtrl', function($scope, $route) {
    	$scope.$route = $route;
  });