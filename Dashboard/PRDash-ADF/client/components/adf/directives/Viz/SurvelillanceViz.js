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
        scope.gridsterOpt = {
            columns: 30, // the width of the grid, in columns
            pushing: true, // whether to push other items out of the way on move or resize
            floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
            swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
            width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
            colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            //margins: [10, 10], // the pixel distance between each widget
            outerMargin: true, // whether margins apply to outer edges of the grid
            defaultSizeX: 2, // the default width of a gridster item, if not specifed
            defaultSizeY: 2, // the default height of a gridster item, if not specified
            minSizeX: 2, // minimum column width of an item
            maxSizeX: null, // maximum column width of an item
            minSizeY: 2, // minumum row height of an item
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

        scope.resetAll = function(chartName){
          scope.usChart.filterAll();
          scope.visnBarChart.filterAll();
          scope.genderChart.filterAll();
          scope.maritalChart.filterAll();
          scope.riskChart.filterAll();
          scope.militaryChart.filterAll();
          scope.totalCount.filterAll();
          scope.vamcBubbleChart.filterAll();
          dc.redrawAll();
        };

      }],
      link: function (scope) {

        scope.usChart = dc.geoChoroplethChart("#us-chart");
        scope.vamcBubbleChart = dc.bubbleChart('#vamc-bubble-chart');
        scope.visnBarChart = dc.barChart('#visnBar-chart');
        //var vamcBarChart = dc.barChart('#vamcBar-chart');
        //scope.visnDataTable = dc.dataTable('#dc-data-table');
        scope.genderChart = dc.pieChart('#gender-chart');
        scope.maritalChart = dc.rowChart('#marital-chart');
        scope.riskChart = dc.pieChart('#risk-chart');
        scope.militaryChart = dc.rowChart('#military-chart');
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


          var vamcDim = ndx.dimension(function (d) {
            return d.STA3N;
          });

          var vamcGroup = vamcDim.group().reduce(
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
              .translate([width/2, height/1.95]);

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
            var visnBarHeight = parseInt(d3.select('#visnBar-chart').style('height'));
            
            scope.visnBarChart
              .width(visnBarWidth)
              .height(visnBarHeight/1.3)
              .margins({ top: 10, right: 50, bottom: 30, left: 50 })
              .dimension(visnBarChartDim)
              .group(visnBarGroup)
              .elasticY(true)
              .gap(3)
              .x(d3.scale.ordinal().domain(data.map(function (d) { return parseInt(d.VISN); })))
              .ordering(d3.descending)
              .renderHorizontalGridLines(true)
              .brushOn(false)
              .xUnits(dc.units.ordinal)
              .xAxis().tickFormat();

            var genderChartWidth = parseInt(d3.select('#gender-chart').style('width'));
            var genderChartHeight = parseInt(d3.select('#gender-chart').style('height'));

            scope.genderChart
              .width(genderChartWidth)
              .height(genderChartHeight)
              .radius(genderChartWidth/3)
              .dimension(genderDim)
              .group(genderGroup);

            var riskChartWidth = parseInt(d3.select('#risk-chart').style('width'));
            var riskChartHeight = parseInt(d3.select('#risk-chart').style('height'));

            scope.riskChart
              .width(riskChartWidth)
              .height(riskChartHeight)
              .radius(genderChartWidth/3)
              .dimension(riskDim)
              .group(riskGroup);

            var militaryChartWidth = parseInt(d3.select('#military-chart').style('width'));
            var militaryChartHeight = parseInt(d3.select('#military-chart').style('height'));
            var colorScale = d3.scale.ordinal().range(['#99d6ff', '#99d6ff', '#99d6ff', '#99d6ff', '#80ccff', '#66c2ff', '#4db8ff', '#33adff', '#1aa3ff', '#0099ff', '#008ae6', '#007acc', '#006bb3', '#005c99', '#004c80', '#003d66', '#002e4d', '#001f33']);
            scope.militaryChart 
               .width(militaryChartWidth)
               .height(militaryChartHeight - 40)
               .margins({ top: 20, left: 10, right: 10, bottom: 20 })
               .group(militaryGroup)
               .dimension(militaryDim)
               .colors(colorScale)
               .label(function (d) {
                 return d.key;
               })
               .title(function (d) {
                 return d.value;
               })
               .elasticX(true)
               .xAxis().ticks(4);

            var maritalChartWidth = parseInt(d3.select('#marital-chart').style('width'));
            var maritalChartHeight = parseInt(d3.select('#marital-chart').style('height'));
            scope.maritalChart
              .width(maritalChartWidth-20)
              .height(maritalChartHeight - 40)
              .margins({ top: 20, left: 10, right: 10, bottom: 20 })
              .group(maritalGroup)
              .dimension(maritalDim)
              .label(function (d) {
                return d.key;
              })
              .title(function (d) {
                return d.value;
              })
              .elasticX(true)
              .xAxis().ticks(4);

            var vamcBubbleChartWidth = parseInt(d3.select('#vamc-bubble-chart').style('width'));
            var vamcBubbleChartHeight = parseInt(d3.select('#vamc-bubble-chart').style('height'));
            scope.vamcBubbleChart
              .width(vamcBubbleChartWidth)
              .height(vamcBubbleChartHeight - 40)
              .margins({ top: 10, right: 50, bottom: 30, left: 40 })
              .dimension(vamcDim)
              .group(vamcGroup)
              .keyAccessor(function (p) {
                return p.value.PatientCount;
              })
              .valueAccessor(function (p) {
                return p.value.AtRisk;
              })
              .radiusValueAccessor(function (p) {
                return .01;
              })
              .maxBubbleRelativeSize(.3)
              .x(d3.scale.linear().range([0, 50000]))
              .y(d3.scale.linear().domain([0, 50000]))
              .r(d3.scale.linear().range([0, 1]))
              .elasticY(true)
              .elasticX(true)
              .yAxisPadding(100)
              .xAxisPadding(500)
              .renderHorizontalGridLines(true)
              .renderVerticalGridLines(true)
              .xAxisLabel('Total Patients')
              .yAxisLabel('At Risk')
              .renderLabel(true)
              .label(function (p) {
                return p.key;
              })
              .renderTitle(true)
              .colors(colorbrewer.RdYlGn[9])
              .colorDomain([0, 1000])
              .colorAccessor(function (d) {
                return d.value.AtRisk;
              })
              .title(function (p) {
                return [
                  p.key
                ].join('\n');
            });
         
            dc.renderAll();
            $('.LoadingDiv').hide();
          });
         
      });



      }
    };
  });
