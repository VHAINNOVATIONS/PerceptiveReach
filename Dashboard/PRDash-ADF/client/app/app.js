/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('app', [
    'ngRoute',
    'ngCookies',
    'ngSanitize',
    'ui.bootstrap',
    'ui.Idle',
    'ui.util',
    'ui.DashboardUtil',
    'ui.dashboard',
    'ui.widgets',
    'ui.models',
    'btford.markdown',
    'angular-loading-bar',
    'sticky',
    'ngFileSaver'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    //$httpProvider.defaults.headers.common['Authorization'] = '';
    /*
    $routeProvider
      .otherwise('/');*/

    var interceptor = ['$rootScope', '$q', '$location', function (scope, $q, $location) {
 
        function success(response) {
            return response;
        }
 
        function error(response) {
            var status = response.status;
 
            if (status === 401 || status == 403) {
                var deferred = $q.defer();
                var req = {
                    config: response.config,
                    deferred: deferred
                };
                //scope.requests401.push(req);
                //scope.$broadcast('event:auth-loginRequired');
                $location.path('/login');
                return deferred.promise;
            }
            // otherwise
            return $q.reject(response);
        }
        return function (promise) {
            return promise.then(success, error);
        }
    }];
    $locationProvider.html5Mode(true);
    //$httpProvider.interceptors.push(interceptor); 
    $httpProvider.interceptors.push('authInterceptor');    
  })

  .factory('authInterceptor', function ($rootScope, $q, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if (sessionStorage.getItem('token')) {
          config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
          config.headers.prSessionKey = sessionStorage.getItem('prSessionKey');
        }
        return config;
      },
      // Response code
      response: function(response){
        if (response.status === 401){
          console.log("Response 401");
        }
        if (response.status === 403){
          console.log("Response 403");
        }
        return response || $q.when(response);
      },
      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          //console.log("Response Error 401", response);
          $location.path('/login');
          // remove any stale tokens
          sessionStorage.removeItem('token');
        }
        if(response.status === 403) {
          //console.log("Response Error 403", response);
          $location.path('/login');
          // remove any stale tokens
          sessionStorage.removeItem('token');
        }
        return $q.reject(response);
      }
    };
  })

  .run(function ($rootScope, $location, $http, Auth, Idle) {
    // keep user logged in after page refresh
    Idle.watch();
    //IdleServ.start();
    Auth.RegenerateSessionPing();
    
    $rootScope.globals = sessionStorage.getItem('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint
		$http.defaults.headers.common['Set-Cookie'] = HttpOnly, Secure;
		ignore:line
    }
    // Redirect to login if route requires auth and you're not logged in    
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // redirect to login page if not logged in
      /*if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          console.log("rootScoope.globals.userObj: ",$rootScope.globals.userObj);
          $location.path('/login');
      }*/
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $rootScope.globals.isLogggedIn = false;
          $('#navHeader').hide();
          $('#dashboardDescription').hide();
          $location.path('/login');

        }
        else{
          if(loggedIn){
            $rootScope.globals.isLogggedIn = true;
            $rootScope.globals['userObj'] = JSON.parse(sessionStorage.user);
            $('#navHeader').show();
            $('#dashboardDescription').show();
          }
        }
      });
    });
  });
