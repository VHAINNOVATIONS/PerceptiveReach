'use strict';

angular.module('perceptiveReachApp')
  .controller('SidebarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    $scope.currentUser = Auth.getCurrentUser();

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });