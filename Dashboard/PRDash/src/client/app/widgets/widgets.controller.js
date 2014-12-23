'use strict';

angular.module('perceptiveReachApp')
  .controller('WidgetCtrl', function ($scope, $http, modalService, Auth) {
    $scope.awesomeThings = [];
    $scope.dataSetTable = [];
    $scope.currentUser = Auth.getCurrentUser();
    var store = "";
    var nationalData = [];

     $scope.widgetTitle1 = "Bar Chart Widget: Total Risks by VAMC";

                
        var VAMC_Id = 1; //VA Medical Facility ID
        
        function getTotalRiskbyVAMC (id){
            $http.get('/api/totalRiskbyVAMC?id='+ id).success(function(totalRisksbyVAMC) {
            //console.log(totalRisksbyVAMC);

                console.log("WidgetCtrl totalRisksbyVAMC:" + JSON.stringify(totalRisksbyVAMC));
                $scope.totalRisksbyVAMC = totalRisksbyVAMC;
                        
            });

            $scope.xAxisTickFormatFunction = function(){
                return function(d){
                    console.log("xAxis:" + d);
                    return d;
                }
            }

            $scope.toolTipContentFunction = function(){
                return function(key, x, y, e, graph) {
                        console.log("key:" + key);
                        return  '<h3>' + x + '</h3>' +
                        '<p>' +  y  + '</p>';
                }
            }
        }
        
    getTotalRiskbyVAMC(VAMC_Id);
    
    /*$http.get('http://localhost:3000/FacilitiesStateCount').success(function(FacilitiesStateCount) {
        $scope.setupMap(FacilitiesStateCount); 
    });*/
});

