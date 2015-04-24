'use strict';

angular.module('app')
  .controller('LoginCtrl',
    ['$scope', '$rootScope', '$location', 'Auth',
    function ($scope, $rootScope, $location, Auth) {
        $scope.user = {};
       $scope.errors = {};
        // reset login status
        Auth.ClearCredentials();
  
        $scope.login = function (form) {
            $scope.submitted = true;
            $scope.dataLoading = true;
            if(form.$valid){
              //Auth.SetCredentials($scope.user.email, $scope.user.password);
              Auth.Login($scope.user.email, $scope.user.password, function(response) {
                  if(response.success) {
                      Auth.SetCredentials($scope.user.email, $scope.user.password);
                      //console.log("LoginController rootScoope.globals: ",$rootScope.globals);
                      $location.path('/');
                      $('#navHeader').show();
                      $('#dashboardDescription').show();
                  } else {
                      $scope.errors.other = response.message;
                      $scope.dataLoading = false;
                  }
              });
            }
        };
    }]);
  /*.controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });*/