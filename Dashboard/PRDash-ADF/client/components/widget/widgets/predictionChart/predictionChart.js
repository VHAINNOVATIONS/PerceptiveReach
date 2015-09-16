/* globals d3 */
'use strict';

angular.module('ui.widgets').directive('predictionChart', function () {
return {
    restrict: 'A',
    replace: true,
    templateUrl: 'client/components/widget/widgets/predictionChart/predictionChart.html',
    scope: {
      data: '=data'
    },
    controller: function ($scope) {
      $scope.xAxisTickFormatFunction = function () {
        return function (d) {
          return d3.format('.02f')(d);
        };
      };
      $scope.yAxisTickFormatFunction = function () {
        return function (d) {
          return d3.format('.02f')(d);
        };
      };
      $scope.xFunction = function () {
        return function (d) {
          return d.x;
        };
      };
      $scope.yFunction = function () {
        return function (d) {
          return d.y;
        };
      };
    }
  };
});
