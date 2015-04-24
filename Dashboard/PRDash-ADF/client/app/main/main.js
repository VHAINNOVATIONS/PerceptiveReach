'use strict';

angular.module('app')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'LayoutsDemoExplicitSaveCtrl',
        title: 'Home',
        description: 'This view showcases the home dashboard layouts ',
        authenticate: true
      });
  });
