'use strict';

angular.module('ui.dashboard')

  .directive('viz', function () {

    return {
      restrict: 'A',
      templateUrl: function(element, attr) {
        return 'client/components/adf/directives/Viz/SurveillanceViz.html';
      },
      scope: true,

      controller: ['$scope', '$attrs', function (scope, attrs) {
        scope.gridsterOpts = {
            columns: 30, // the width of the grid, in columns
            pushing: true, // whether to push other items out of the way on move or resize
            floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
            swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
            width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
            colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            //margins: [10, 10], // the pixel distance between each widget
            outerMargin: true, // whether margins apply to outer edges of the grid
            defaultSizeX: 10, // the default width of a gridster item, if not specifed
            defaultSizeY: 6, // the default height of a gridster item, if not specified
            minSizeX: 5, // minimum column width of an item
            maxSizeX: null, // maximum column width of an item
            minSizeY: 5, // minumum row height of an item
            maxSizeY: null, // maximum row height of an item
            resizable: {
               enabled: false
            },
            draggable: {
               enabled: true, // whether dragging items is supported
            }
        };

        scope.resetChart = function(chartName){
          scope[chartName].filterAll();
          dc.redrawAll();
        };

      }],
      link: function (scope) {

        scope.usChart = dc.geoChoroplethChart("#us-chart");
        //var visnBubbleChart = dc.bubbleChart('#visn-bubble-chart');
        scope.visnBarChart = dc.barChart('#visnBar-chart');
        //var vamcBarChart = dc.barChart('#vamcBar-chart');
        //var visnDataTable = dc.dataTable('.dc-data-table');
        //var genderChart = dc.pieChart('#gender-chart');
        //var maritalChart = dc.rowChart('#marital-chart');
        //var riskChart = dc.pieChart('#risk-chart');
        //var militaryChart = dc.rowChart('#military-chart');
        scope.totalCount = dc.dataCount('.dc-data-count');

        $('.LoadingDiv').show();

        d3.json('/api/SurveillanceViz', function (data) {

          var ndx = crossfilter(data);
          var all = ndx.groupAll();

          var patientAll = ndx.groupAll().reduceSum(function(d) {
            return d["PatientCount"];
          });
          
          scope.totalCount /* dc.dataCount('.dc-data-count', 'chartGroup'); */
            .dimension(ndx)
            .group(patientAll);

          var states = ndx.dimension(function (d) {
            return d["StateAbbr"];
          });
          var stateTotalRisk = states.group().reduceSum(function (d) {
            return d["RiskLevel"] == null ? 0 : d["PatientCount"];
          });


          var visnDim = ndx.dimension(function (d) {
            return d.VISN;
          });

          var visnGroup = visnDim.group().reduce(
             function (p, v) {
               ++p.count;
               p.PatientCount += parseInt(v.PatientCount);
               if (v.RiskLevel != null) {
                 p.AtRisk += parseInt(v.PatientCount);
               }
               if (p.PatientCount > 0) {
                 p.radius = p.AtRisk / p.PatientCount;
               }
               return p;
             },
             function (p, v) {
               --p.count;
               p.PatientCount -= parseInt(v.PatientCount);
               if (v.RiskLevel != null) {
                 p.AtRisk -= parseInt(v.PatientCount);
               }
               if (p.PatientCount > 0) {
                 p.radius = p.AtRisk / p.PatientCount;
               }
               return p;
             },
             function () {
               return {
                 count: 0,
                 AtRisk:0,
                 PatientCount: 0,
                 radius:0
               };
             }
          );

          var visnBarChartDim= ndx.dimension(function (d) {
            return d.VISNBar;
          });

          var visnBarGroup = visnBarChartDim.group().reduceSum(function (d) {
            return d["PatientCount"];
          });

          var vamcBarChartDim = ndx.dimension(function (d) {
            return d.STA3N;
          });

          var vamcBarGroup = vamcBarChartDim.group().reduceSum(function (d) {
            return d["PatientCount"];
          });


          var genderDim = ndx.dimension(function (d) {
            if (d.Gender == 'F') {
              return 'Female';
            } else if (d.Gender == 'M') {
              return 'Male';
            } else {
              return 'Unknown';
            }
          });
          var genderGroup = genderDim.group().reduceSum(function (d) {
            return d["PatientCount"];
          });

          var maritalDim = ndx.dimension(function(d) {
            return d.MaritalStatus;
          });

          var maritalGroup = maritalDim.group().reduceSum(function (d) {
            return d["PatientCount"];
          });

          var militaryDim = ndx.dimension(function (d) {
            return d.MilitaryBranch;
          });
          var militaryGroup = militaryDim.group().reduceSum(function (d) {
            return d["PatientCount"];
          });

          var riskDim = ndx.dimension(function(d) {
            if (d.RiskLevel == null) {
              return "Not At Risk";
            } else {
              return "At Risk";
            }
          });


          var riskGroup = riskDim.group().reduceSum(function (d) {
            return  d["PatientCount"];
          });;
          
          d3.json("https://dc-js.github.io/dc.js/geo/us-states.json", function (statesJson) {

          
            var width = parseInt(d3.select('#us-chart').style('width'))
            , width = width
            , mapRatio = .5
            , height = width * mapRatio;

            var projection = d3.geo.albersUsa()
              .scale(width)
              .translate([width/2, height/1.6]);

            scope.usChart
             .width(width)
             .height(height)
             .dimension(states)
             .transitionDuration(1000)
             .group(stateTotalRisk)
             .projection(projection)
             .colors(d3.scale.quantize().domain([0, 2000]).range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
             .colorDomain([0, 2000])
             .colorCalculator(function (d) {
               return d ? scope.usChart.colors()(d) : '#ccc';
             })
             .overlayGeoJson(statesJson.features, "state", function (d) {
               return d.properties.name;
             })
             .title(function (d) {
               return "State: " + d.key + ",\n At Risk Patients: " + d.value;
             });

            var visnBarWidth = parseInt(d3.select('#visnBar-chart').style('width'));
            var visnBarHeight = parseInt(d3.select('#visnBar-chart').style('width'));
            
            scope.visnBarChart
              .width(visnBarWidth)
              .height(visnBarHeight/2.5)
              .margins({ top: 10, right: 50, bottom: 30, left: 50 })
              .dimension(visnBarChartDim)
              .group(visnBarGroup)
              .ordering(function (t) { return t.key; })
              .elasticY(true)
              .gap(3)
              .x(d3.scale.ordinal().domain(data.map(function (d) { return parseInt(d.VISN); })))
              .renderHorizontalGridLines(true)
              .brushOn(false)
              .xUnits(dc.units.ordinal)
              .xAxis().tickFormat();

         
            dc.renderAll();
            $('.LoadingDiv').hide();
          });
         
      });



      }
    };
  });
