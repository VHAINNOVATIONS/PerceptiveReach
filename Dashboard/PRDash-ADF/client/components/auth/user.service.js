'use strict';

angular.module('app')
  .factory('User', function () { // commented out $resource
    return null;
    /*return $resource('/api/user/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });*/
  });