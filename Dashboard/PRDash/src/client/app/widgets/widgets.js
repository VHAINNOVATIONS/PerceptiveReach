angular.module('perceptiveReachApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('widgets', {
        url: '/widgets',
        templateUrl: 'app/widgets/widgets.html',
        controller: 'WidgetCtrl',
        authenticate: true
      });
  });