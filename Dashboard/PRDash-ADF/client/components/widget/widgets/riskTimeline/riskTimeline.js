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

angular.module('ui.widgets')
  .directive('wtRiskTimeline', function ($filter) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/riskTimeline/riskTimeline.html',
      scope: {
        data: '=data',
        date: '@',
        showLegend: '@',
        initialDuration: '=?',
        initialDurationType: '=?',
        load: '&'
      },
      controller: function ($scope) {
        var filter = $filter('date');
        var numberFilter = $filter('number');

        $scope.xAxisTickFormatFunction = function () {
          return function (d) {
            return filter(d, 'yyyy-MM-dd');
          };
        };

        $scope.yAxisTickFormatFunction = function () {
          return function (d) {
            return numberFilter(d);
          };
        };

        $scope.xFunction = function () {
          return function (d) {
            return d.date;
          };
        };
        $scope.yFunction = function () {
          return function (d) {
            return d.value;
          };
        };
        $scope.toolTipContentFunction = function() {
          return function(key, x, y, e) {
              var type = e.point.type;
              var line0 = 'Date: ' + x;
              var line1 = type + ' Score: ' + y;
              var line2 = type + ': ' + e.point.description;
              return line0 + '<br>' + line1 + '<br>' + line2;
            };
        };
        $scope.showLegend = true;

        $scope.refresh = function() {
          $scope.load({dateRange: $scope.date});
        };
        $scope.limitny = function(year) {
          var startDate = moment().subtract(year, 'years').toDate();
          var endDate = moment().toDate();
          $scope.date = {startDate: startDate, endDate: endDate};
        };
        $scope.limit1y = function() {
          $scope.limitny(1);
        };
        $scope.limit2y = function() {
          $scope.limitny(2);
        };
        $scope.limit3y = function() {
          $scope.limitny(3);
        };
      },
      link: function postLink(scope, element, attrs) {
        var duration = (attrs.initialDuration && parseInt(attrs.initialDuration)) || 3;
        var durationType = attrs.initialDurationType || 'years';
        scope.date = {
          startDate: moment().subtract(duration, durationType).toDate(), 
          endDate: moment().toDate()
        };
        scope.$watch('date', function (date) {
          scope.load({dateRange: date});
        });
        scope.$watch('data', function (data) {
          scope.chart = data.chart;
        });
     }
    };
  });