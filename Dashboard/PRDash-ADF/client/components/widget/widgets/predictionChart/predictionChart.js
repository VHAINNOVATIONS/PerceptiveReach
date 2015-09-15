'use strict';

angular.module('ui.widgets')
  .directive('predictionChart', function ($filter) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/predictionChart/predictionChart.html',
      scope: {
        //data: '=data',
        showLegend: '@',
        timeAxisFormat: '=?'
      },
      controller: function ($scope) {
        var filter = $filter('date');
        var numberFilter = $filter('number');

        $scope.xAxisTickFormatFunction = function () {
          return function (d) {
            return filter(d, $scope.timeAxisFormat);
          };
        };

        $scope.yAxisTickFormatFunction = function () {
          return function (d) {
            if (d > 999) {
              var value;
              var scale;
              if (d < 999999) {
                value = Math.round(d/1000);
                scale = 'k';
              } else {
                value = Math.round(d/1000000);
                scale = 'm';
              }
              return numberFilter(value) + scale;
            } else {
              return numberFilter(d);
            }
          };
        };

        $scope.xFunction = function () {
          return function (d) {
            return d.timestamp;
          };
        };
        $scope.yFunction = function () {
          return function (d) {
            return d.value;
          };
        };
      },
      link: function postLink(scope, element, attrs) {
        scope.timeAxisFormat = scope.timeAxisFormat || 'HH:mm';

        
        var mockData = [{
          "key": "Data",
          "values": [{
              "timestamp": 1426519070387,
              "value": 79,
              "series": 0
          },
          {
              "timestamp": 1426519071389,
              "value": 59,
              "series": 0
          },
          {
              "timestamp": 1426519072390,
              "value": 54,
              "series": 0
          },
          {
              "timestamp": 1426519073391,
              "value": 58,
              "series": 0
          },
          {
              "timestamp": 1426519074392,
              "value": 41,
              "series": 0
          },
          {
              "timestamp": 1426519075394,
              "value": 33,
              "series": 0
          },
          {
              "timestamp": 1426519076395,
              "value": 23,
              "series": 0
          },
          {
              "timestamp": 1426519077396,
              "value": 39,
              "series": 0
          },
          {
              "timestamp": 1426519078398,
              "value": 44,
              "series": 0
          },
          {
              "timestamp": 1426519079399,
              "value": 52,
              "series": 0
          },
          {
              "timestamp": 1426519080400,
              "value": 42,
              "series": 0
          },
          {
              "timestamp": 1426519081401,
              "value": 25,
              "series": 0
          },
          {
              "timestamp": 1426519082400,
              "value": 8,
              "series": 0
          },
          {
              "timestamp": 1426519083402,
              "value": 0,
              "series": 0
          },
          {
              "timestamp": 1426519084404,
              "value": 20,
              "series": 0
          },
          {
              "timestamp": 1426519085405,
              "value": 14,
              "series": 0
          },
          {
              "timestamp": 1426519086407,
              "value": 31,
              "series": 0
          },
          {
              "timestamp": 1426519087409,
              "value": 35,
              "series": 0
          },
          {
              "timestamp": 1426519088410,
              "value": 35,
              "series": 0
          },
          {
              "timestamp": 1426519089412,
              "value": 36,
              "series": 0
          },
          {
              "timestamp": 1426519090412,
              "value": 19,
              "series": 0
          },
          {
              "timestamp": 1426519091414,
              "value": 38,
              "series": 0
          },
          {
              "timestamp": 1426519092416,
              "value": 51,
              "series": 0
          },
          {
              "timestamp": 1426519093417,
              "value": 45,
              "series": 0
          },
          {
              "timestamp": 1426519094418,
              "value": 47,
              "series": 0
          },
          {
              "timestamp": 1426519095420,
              "value": 55,
              "series": 0
          },
          {
              "timestamp": 1426519096421,
              "value": 46,
              "series": 0
          },
          {
              "timestamp": 1426519097422,
              "value": 38,
              "series": 0
          },
          {
              "timestamp": 1426519098424,
              "value": 18,
              "series": 0
          },
          {
              "timestamp": 1426519099425,
              "value": 22
          }]
        }]

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
