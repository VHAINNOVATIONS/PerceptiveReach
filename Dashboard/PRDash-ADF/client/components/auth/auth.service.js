'use strict';

angular.module('app')
  
  
    /* jshint ignore:end */
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {

    var currentUser = {};
    if($cookieStore.get('token')) {
      //currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
     login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {          
          localStorage.setItem("user", JSON.stringify(data.user.data));
          //delete data.user.data['DashboardData'];
          $cookieStore.put('token', data.token);
          //$cookieStore.put('user', data.user.data);
          currentUser = data.user; //User.get();
          //$rootScope.globals.userObj = data.user;
          $rootScope.globals['userObj'] = data.user.data;
          console.log("Returned Logged In User: ",currentUser);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          //console.log("Login error: ", err);
          this.logout();          
          var properMessage = '';
          if (err.indexOf('Max login attempts reached') != -1)
            properMessage = 'Invalid username/password combination. Please try again.';
          else
            properMessage = err;
          var response = {message: properMessage};
          deferred.reject(response);
          return cb(response);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        //$cookieStore.remove('user');
        currentUser = {};
        //$http.defaults.headers.common.Authorization = 'Basic ';
        $location.path('/login');
        $('#navHeader').hide();
        $('#dashboardDescription').hide();
        localStorage.clear();
      },

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
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        console.log("inside loginAsync");
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

        if(!currentUser || !$cookieStore.get('token')) {
          cb(false);        
        } else if(!currentUser || $cookieStore.get('token')) {
          cb(true);
        } else if(!currentUser.data.UserRole || $cookieStore.get('token')) {
          cb(false);
        } else {
          cb(true);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.data.UserRole === 'ADM';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });