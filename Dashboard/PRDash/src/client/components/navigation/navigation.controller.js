'use strict';

angular.module('perceptiveReachApp')
  .controller('NavigationCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    $scope.currentUser = Auth.getCurrentUser();
    console.log($scope.currentUser);
    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });