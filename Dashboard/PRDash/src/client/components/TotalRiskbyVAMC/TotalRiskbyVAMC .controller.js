'use strict';

angular.module('perceptiveReachApp')
  .controller('TotalRisksbyVAMCCtrl', function ($scope, $http) {
        $scope.widgetTitle2 = "Pie Chart Widget: Total Risks by VAMC";
                
        var VAMC_Id = 1; //VA Medical Facility ID
        
        function getTotalRiskbyVAMCPieChart (id){
            $http.get('/api/totalRiskByVAMCPieChart?id='+ id).success(function(totalRisksbyVAMCPieChart) {
            //console.log(totalRisksbyVAMC);

                console.log("TotalRisksbyVAMCCtrl totalRisksbyVAMCPieChart:" + JSON.stringify(totalRisksbyVAMCPieChart));
                
                    /*
                    $scope.totalRisksbyVAMCPieChart = [
                        { Key: "One", y: 5 },
                        { key: "Two", y: 2 },
                        { key: "Three", y: 9 },
                        { key: "Four", y: 7 },
                        { key: "Five", y: 4 },
                        { key: "Six", y: 3 },
                        { key: "Seven", y: 9 }
                    ];
                    */
                

                $scope.totalRisksbyVAMCPieChart = totalRisksbyVAMCPieChart;
                        
            });

            $scope.xFunction = function(){
                return function(d) {
                    return d.key;
                };
            }

            $scope.yFunction = function(){
                return function(d){
                    return d.y;
                };
            }

            $scope.toolTipContentFunctionPieChart = function(){
                return function(key, x, y, e, graph) {
                        console.log("key:" + key);
                        return  '<h3>' + x + '</h3>' +
                        '<p>' +  y  + '</p>';
                }
            }
            
        }
        
    getTotalRiskbyVAMCPieChart(VAMC_Id);  
  });