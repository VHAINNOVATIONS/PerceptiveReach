'use strict';

angular.module('ui.Idle',['ngIdle'])
angular.module('ui.Idle')
  .factory('IdleServ', function($rootScope, Idle, Keepalive, $modal){
      var AuthService = null;
      $rootScope.started = false;

      $rootScope.$on('IdleStart', function() {
        closeModals();

        $rootScope.warning = $modal.open({
          templateUrl: 'components/idle/warning-dialog.html',
          windowClass: 'modal-danger'
        });
      });

      $rootScope.$on('IdleEnd', function() {
        closeModals();
      });

      $rootScope.$on('IdleTimeout', function() {
        closeModals();
        AuthService.logout();
        /*$rootScope.timedout = $modal.open({
          templateUrl: 'components/idle/timedout-dialog.html',
          windowClass: 'modal-danger'
        });*/
      });


      function closeModals() {
        if ($rootScope.warning) {
          $rootScope.warning.close();
          $rootScope.warning = null;
        }

        if ($rootScope.timedout) {
          $rootScope.timedout.close();
          $rootScope.timedout = null;
        }
      }

      return {
        start: function(anAuthService) {
          closeModals();
          Idle.watch();
          $rootScope.started = true;
          AuthService = anAuthService;
        },

        stop: function() {
          closeModals();
          Idle.unwatch();
          $rootScope.started = false;
        }  
      }
    })
    .config(function(IdleProvider, KeepaliveProvider) {      
      IdleProvider.idle(15*60); // required 15 mins
      IdleProvider.timeout(10);
      KeepaliveProvider.interval(10);
      //console.log('IdleProvider: ', IdleProvider);
      //console.log('KeepaliveProvider: ', KeepaliveProvider);
    });