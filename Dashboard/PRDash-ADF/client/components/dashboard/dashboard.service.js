'use strict';

angular.module('ui.DashboardUtil',[])
angular.module('ui.DashboardUtil')  
  
    /* jshint ignore:end */
  .factory('Dashboard', function ($location, $rootScope, $http, $q) {

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
     saveDashboard: function(dash, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.post('/api/dashboard', {
          dashboard: dash
        }).
        success(function(data) {
          //$cookieStore.put('token', data.token);
          //$cookieStore.put('user', data.user.data);
          //localStorage.setItem("user", JSON.stringify(data.user.data));
          //currentUser = data.user; //User.get();
          //$rootScope.globals.userObj = data.user;
          //$rootScope.globals['userObj'] = data.user.data;
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          console.log("Login error: ", err);
          //this.logout();          
          //var properMessage = '';
          //if (err.indexOf('Max login attempts reached') != -1)
            //properMessage = 'Invalid username/password combination. Please try again.';
          //else
            //properMessage = err;
          //var response = {message: properMessage};
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
     loadDashboard: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          //$cookieStore.put('token', data.token);
          //$cookieStore.put('user', data.user.data);
          localStorage.setItem("user", JSON.stringify(data.user.data));
          currentUser = data.user; //User.get();
          //$rootScope.globals.userObj = data.user;
          $rootScope.globals['userObj'] = data.user.data;
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
      }
    };
});