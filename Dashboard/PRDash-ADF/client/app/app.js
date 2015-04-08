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
    'ui.dashboard',
    'ui.widgets',
    'ui.models',
    'btford.markdown'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['Authorization'] = '';
    /*
    $routeProvider
      .otherwise('/');*/
    var interceptor = ['$rootScope', '$q', '$location', function (scope, $q, $location) {
 
        function success(response) {
            return response;
        }
 
        function error(response) {
            var status = response.status;
 
            if (status === 401) {
              console.log("401 received" + repsonse);
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

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },
      // Response code
      response: function(response){
        if (response.status === 401){
          console.log("Response 401");
        }
        return response || $q.when(response);
      },
      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          console.log("Response Error 401", response);
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
        }
        return $q.reject(response);
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in    
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
