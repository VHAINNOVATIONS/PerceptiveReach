'use strict';

angular.module('app')
  .controller('NavBarCtrl', function($scope, $route, Auth) {
    	$scope.$route = $route;
    	$scope.Logout =  function () {
    		Auth.Logout();
    	}
  });