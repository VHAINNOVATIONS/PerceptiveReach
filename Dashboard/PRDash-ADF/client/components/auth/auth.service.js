'use strict';

angular.module('app')
  .factory('Auth',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout','$location',
    function (Base64, $http, $cookieStore, $rootScope, $timeout, $location) {
        var service = {};
 
        service.Login = function (username, password, callback) {
 
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            /*$timeout(function(){
                var response = { success: username === 'test' && password === 'test' };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);*/
 
 
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });
           
            var authdata = Base64.encode(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $http.post('/auth/local', {
              email: username,
              password: password
            }).
            success(function(data) {
              console.log(data);
              var response = { success: data };
              $rootScope.globals['userObj'] = data;
              console.log("inside rootScoope.globals.userObj: ",$rootScope.globals.userObj);
              console.log("inside rootScoope.globals: ",$rootScope.globals);
             /* $cookieStore.put('token', data.token);
              currentUser = data.user; //User.get();
              console.log(currentUser);
              deferred.resolve(data);
              return cb();*/
              callback(response);
            }).
            error(function(err) {
              /*console.log("Login error: ", err);
              this.logout();
              deferred.reject(err);
              return cb(err);*/
              var response = { error: err };
              callback(response);
            });

           
 
        };
        service.setUser = function (user) {
            $rootScope.globals['userObj'] = user;
            //$cookieStore.remove('globals');
            //$http.defaults.headers.common.Authorization = 'Basic ';
        };

        service.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);
  
            $rootScope.globals['currentUser'] = {
                    username: username,
                    authdata: authdata
            };
  
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };
  
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        service.Logout = function () {
          this.ClearCredentials(); 
          $location.path('/login'); 
        }
  
        return service;
    }])
  
.factory('Base64', function () {
    /* jshint ignore:start */
  
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
  
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
  
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
  
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
  
            return output;
        },
  
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
  
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
  
                output = output + String.fromCharCode(chr1);
  
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
  
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
  
            } while (i < input.length);
  
            return output;
        }
    };
  
    /* jshint ignore:end */
  //.factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {

    /*var currentUser = {};
    if($cookieStore.get('token')) {
      //currentUser = User.get();
    }

    return {*/

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
     /* login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = data.user; //User.get();
          console.log(currentUser);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          console.log("Login error: ", err);
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },
*/
      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      /*logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },*/

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      /*createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },*/

      /*
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      /*getCurrentUser: function() {
        return currentUser;
      },*/

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      /*isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },*/

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      /*isLoggedInAsync: function(cb) {
        console.log("inside loginAsync");*/
        /*if(currentUser.hasOwnProperty('$promise') && $cookieStore.get('token')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role') && $cookieStore.get('token')) {
          cb(true);
        } else {
          cb(false);
        }*/

        /*if(!currentUser || !$cookieStore.get('token')) {
          cb(false);        
        } else if(!currentUser || $cookieStore.get('token')) {
          cb(true);
        } else if(!currentUser.data.UserRole || $cookieStore.get('token')) {
          cb(false);
        } else {
          cb(true);
        }
      },*/

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      /*isAdmin: function() {
        return currentUser.data.role === 'admin';
      },*/

      /**
       * Get auth token
       */
     /* getToken: function() {
        return $cookieStore.get('token');
      }
    };*/
  });