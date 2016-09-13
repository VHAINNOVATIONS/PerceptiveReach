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
          return d;
        };
      };
      $scope.yAxisTickFormatFunction = function () {
        return function (d) {
          return d;
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
      $scope.xAxisTickValuesFunction = function () {
        return function () {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 17];
         };
      }; 
    },
  };
});
