'use strict';

angular.module('perceptiveReachApp')
  .controller('RiskWidgetCtrl', function ($scope, $http) {
        $scope.widgetTitle3 = "Risk Widget: High Risk";
        $scope.widgetDesc = "Current High Risk Veterans";
                
        var VAMC_Id = 1; //VA Medical Facility ID
        
        function getScoreSummaryByVAMC (id){
            $http.get('/api/scoreSummaryByVAMC?id='+ id).success(function(scoreSummaryByVAMC) {
            console.log(scoreSummaryByVAMC);

                console.log("RiskWidgetCtrl scoreSummaryByVAMC:" + JSON.stringify(scoreSummaryByVAMC));
                
                $scope.scoreSummaryByVAMC = scoreSummaryByVAMC;
                        
            });
           
        }
        
    getScoreSummaryByVAMC(VAMC_Id);  
  });