'use strict';

angular.module('ui.widgets')
  .directive('predictionChart', function ($filter) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/predictionChart/predictionChart.html',
      scope: {
        //data: '=data',
        showLegend: '@'
      },
      controller: function ($scope) {
        var numberFilter = $filter('number');

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
      },
      link: function postLink(scope, element, attrs) {
        /* Random Data Generator (took from nvd3.org) */
        var generateData = function(groups, points) { //# groups,# points per group
            var data = [];
            //var shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'];
            var random = Math.random;

            data = [{
              key: 'Upper Limit',
              values: []
            }, {
              key: 'Lower Limit',
              values: []
            }, {
              key: 'Prediction',
              values: []
            }, {
              key: 'Actual',
              values: []
            }, {
              key: 'Comparison',
              values: []
            }];

            for (var ju = 1; ju < 16; ++ju) {
              var yu = 70.0 + 30.0 * (ju / 16.0);
              data[0].values.push({
                x: ju,
                y: yu
              });
            }

            for (var jl = 1; jl < 16; ++jl) {
              var yl = 30.0 - 30.0 * (jl / 16.0);
              data[1].values.push({
                x: jl,
                y: yl
              });
            }

            for (var jp = 1; jp < 16; ++jp) {
              data[2].values.push({
                x: jp,
                y: 50
              });
            }

            for (var ja = 1; ja < 13; ++ja) {
                var ya = 30.0 + random() * 40;
                data[3].values.push({
                    x: ja,
                    y: ya
                });
            }

            for (var jc = 13; jc < 16; ++jc) {
                var yc = 30.0 + random() * 40;
                data[4].values.push({
                    x: jc,
                    y: yc
                });
            }

            return data;
        };

        var mockData = generateData(4, 40);
        scope.data = mockData;

        if (mockData && mockData[0] && mockData[0].values && (mockData[0].values.length > 1)) {
          var timeseries = _.sortBy(mockData[0].values, function (item) {
            return item.timestamp;
          });
          var start = timeseries[0].timestamp;
          var end = timeseries[timeseries.length - 1].timestamp;
          scope.start = start;
          scope.end = end;
        }

        //scope.$watch('data', function (data) {
        //  if (data && data[0] && data[0].values && (data[0].values.length > 1)) {
        //    var timeseries = _.sortBy(data[0].values, function (item) {
        //      return item.timestamp;
        //    });
        //
        //    var start = timeseries[0].timestamp;
        //    var end = timeseries[timeseries.length - 1].timestamp;
        //    scope.start = start;
        //    scope.end = end;
        //  }
        //});
      }
    };
  });
