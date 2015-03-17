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
        //data: '=data',
        showLegend: '@',
        showTimeRange: '=?'
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
          return function(key, x, y, e, graph) {
              return 'Date: ' + x + '<br>' + 'Risk: ' + y + '<br>' + 'Medication: ' + e.point.medication;
            };
        };
      },
      link: function postLink(scope, element, attrs) {
        if (!_.has(attrs, 'showTimeRange')) {
          scope.showTimeRange = true;
        }

        var filter = $filter('date');
        var mockValues = [];
        for (var year=2011; year<2015; ++year) {
          for (var month=1; month<12; ++month) {
            var day = Math.floor(Math.random() * 26) + 1;
            var value = Math.floor(Math.random() * 100);
            var element = {
              date: new Date(year, month, day),
              value: value,
              medication: 'Aspirin',
              series: 0
            };

            mockValues.push(element);
          }
        }

        var mockData = [{
          "key": "Risk",
          "values": mockValues
        }];

        scope.data = mockData;

        if (mockData && mockData[0] && mockData[0].values && (mockData[0].values.length > 1)) {
          var timeseries = _.sortBy(mockData[0].values, function (item) {
            return item.date;
          });
          var start = timeseries[0].date;
          var end = timeseries[timeseries.length - 1].date;
          scope.start = start;
          scope.end = end;
        }
      }
    };
  });