'use strict';

angular.module('perceptiveReachApp')
  .controller('FacilityIndividualModalCtrl', function ($scope, $modalInstance,$http, data) {
        $scope.modalOptions = data.options;
        $scope.dataSet;
        $scope.modalOptions.ok = function (result) {
            $modalInstance.close(result);
        };
        $scope.modalOptions.close = function (result) {
            $modalInstance.dismiss('cancel');
        };
        
        var VAMC_Id = data.id; //VA Medical Facility ID
        function getVeteranByVAMC (id){
            $http.get('/api/veteransByVAMC?id='+ id).success(function(veteransByVAMC) {
            //console.log(veteransByVAMC);
                var output = [];
                var vamc = "";
                for (var veteran in veteransByVAMC) {
                    vamc = veteransByVAMC[0].VAMC
                    //console.log("branchName: " + veteransByBranch[branchCount].key + " count: " + veteransByBranch[branchCount].y);
                    //output[veteransByBranch[branchCount].key.replace(/\s/g,'')]=veteransByBranch[branchCount].y;
                    var record = [];
                    var fullName = veteransByVAMC[veteran].LastName + ", " +veteransByVAMC[veteran].FirstName + " " + veteransByVAMC[veteran].MiddleName; 
                    record.push(String(fullName));
                    record.push(String(veteransByVAMC[veteran].SSN));
                    record.push(String(veteransByVAMC[veteran].Phone));
                    record.push(String(veteransByVAMC[veteran].DateIdentifiedRisk));
                    record.push(String(veteransByVAMC[veteran].ReachID));                
                    output.push(record);
                }
                $scope.VAMC = vamc;
                console.log($scope.VAMC);
                $scope.dataSet = output;
                console.log($scope.dataSet);
                //return output;
            });
        }
        function getTotalRiskbyVAMC (id){
            $http.get('/api/totalRiskbyVAMC?id='+ id).success(function(totalRisksbyVAMC) {
            //console.log(totalRisksbyVAMC);

                console.log("totalRisksbyVAMC:" + JSON.stringify(totalRisksbyVAMC));
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
        function getHighRiskByVAMC (id){
            $http.get('/api/scoreSummaryByVAMCID?id='+ id).success(function(risksByVAMC) {
                console.log(risksByVAMC);
                var objectRisk = risksByVAMC[0];
                console.log(objectRisk);
                //console.log(objectRisk.ExtremeRisk);
                //return objectRisk;
                $scope.risks = objectRisk;
                //console.log($scope.dataSet);
            });
        }
        $scope.getVeteran = function getVeteranData (id){
            $http.get('/api/veterans?id='+ id).success(function(veteranByID) {
                console.log(veteranByID);
                var objectVeteran = veteranByID[0];
                console.log(objectVeteran);
                //console.log(objectRisk.ExtremeRisk);
                //return objectRisk;
                $scope.veteran = objectVeteran;
                //console.log($scope.dataSet);
            });
        }
    //var VAMC_Id = 1; //VA Medical Facility ID
    //var Vet_Id = 127; //Veteran Reach ID
    getVeteranByVAMC(VAMC_Id);//FacilityIndividualService.getVeteranByVAMC(1); 
    getHighRiskByVAMC(VAMC_Id);
    getTotalRiskbyVAMC(VAMC_Id);
    //getVeteranData(Vet_Id);
    //$scope.getVeteran(Vet_Id);
    //console.log($scope.risks);
  })
  .directive('dataTables', function(){
    var linker = function(scope,element, attr){
        var unwatch = scope.$watch('dataSet', function(v){
            if(v){
                unwatch();
                var dataTableVet = $(element).dataTable( {
                    "data": scope.dataSet,
                    "scrollY":        "200px",
                    "scrollCollapse": true,
                    "paging":         false,
                    "columns": [
                        { "title": "Veteran Name" },
                        { "title": "Veteran SSN" },
                        { "title": "Veteran Phone" },
                        { "title": "Date First identified as High Risk", "class": "center" },
                        { "title": "Veteran Reach ID", "class": "center" }
                        //{ "title": "Last VA Clinician Visit", "class": "center" }
                    ],
                    dom: 'T<"clear">lfrtip',
                    tableTools: {
                        "sRowSelect": "single"
                    }
                });
                $('#example tbody').on( 'click', 'tr', function (event) {
                    //console.log( dataTableVet.row( this ).data() );
                    if($(this).hasClass('selected')){
                        $(this).removeClass('selected');
                        $('#veteranView').hide();
                        $('#facilityInfo').show();
                    }
                    else{
                        dataTableVet.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        $('#veteranView').show();
                        $('#facilityInfo').hide();
                        scope.getVeteran(event.currentTarget.cells[4].innerText);
                    }
                    
                    console.log(event.currentTarget.cells[4].innerText);
                } );
            }
            
        });
        //console.log(scope);
        //console.log(element);
        
        
        /*scope.$watch('scope.dataSet', handleModelUpdates, true);

            function handleModelUpdates(newData) {
                var data = newData || null;
                if (data) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(data);
                }
            }*/
    };
    return {
        restrict:'EAC',
        link: linker
    }
  });