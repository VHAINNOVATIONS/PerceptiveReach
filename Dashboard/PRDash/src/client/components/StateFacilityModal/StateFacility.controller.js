'use strict';

angular.module('perceptiveReachApp')
  .controller('StateFacilityModalCtrl', function ($scope, $modalInstance,$http, data, modalService) {
        $scope.modalOptions = data.options;
        $scope.dataSet;
        $scope.modalOptions.ok = function (result) {
            $modalInstance.close(result);
            function facilityIndividualView (id) {

                var custName = 'Andal'//$scope.customer.firstName + ' ' + $scope.customer.lastName;

                var optionsChoice = {};
                var modalOptions = {
                //closeButtonText: 'Cancel',
                //actionButtonText: 'Delete Customer',
                //headerText: 'Delete ' + custName + '?',
                //bodyText: 'Are you sure you want to delete this customer?'
                };
                var modalDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    controller: 'FacilityIndividualModalCtrl',
                    resolve:{
                        data: function () {
                            return {options: modalOptions,id:id};
                        }
                    },
                    windowClass: 'app-modal-window',
                    templateUrl: 'components/FacilityIndividualModal/FacilityIndividualModal.html'
                };
                modalService.showModal(modalDefaults, {}).then(function (result) {
           
                });
            }
            facilityIndividualView ($scope.facilitySelected);
        };
        $scope.modalOptions.close = function (result) {
            $modalInstance.dismiss('cancel');
        };
    
        function getFacilityByState (id){
            $http.get('/api/facilitiesByState?id='+ id).success(function(facilitiesByState) {
            //console.log(veteransByVAMC);
                var output = [];
                var vamc = "";
                for (var facility in facilitiesByState) {
                    //vamc = veteransByVAMC[0].VAMC
                    //console.log("branchName: " + veteransByBranch[branchCount].key + " count: " + veteransByBranch[branchCount].y);
                    //output[veteransByBranch[branchCount].key.replace(/\s/g,'')]=veteransByBranch[branchCount].y;
                    var record = [];
                    //var fullName = veteransByVAMC[veteran].LastName + ", " +veteransByVAMC[veteran].FirstName + " " + veteransByVAMC[veteran].MiddleName; 
                    record.push(String(facilitiesByState[facility].VAMCID));
                    record.push(String(facilitiesByState[facility].VAMC));
                    record.push(String(facilitiesByState[facility].STA3N));
                    record.push(String(facilitiesByState[facility].NetworkName));
                    record.push(String(facilitiesByState[facility].RegionServed));   
                    record.push(String(facilitiesByState[facility].Veteran_Count_at_facility));
                    output.push(record);
                }
                //$scope.VAMC = vamc;
                //console.log($scope.VAMC);
                $scope.dataSet = output;
                console.log($scope.dataSet);
                //return output;
            });
        }
        getFacilityByState (String(data.id));
    
        function getHighRiskByVAMC (id){
            $http.get('/api/scoreSummaryByVAMC?id='+ id).success(function(risksByVAMC) {
                console.log(risksByVAMC);
                var objectRisk = risksByVAMC[0];
                console.log(objectRisk);
                //console.log(objectRisk.ExtremeRisk);
                //return objectRisk;
                $scope.risks = objectRisk;
                //console.log($scope.dataSet);
            });
        }
        
    //var VAMC_Id = 1; //VA Medical Facility ID
    //var Vet_Id = 127; //Veteran Reach ID
    //getVeteranByVAMC(VAMC_Id);//FacilityIndividualService.getVeteranByVAMC(1); 
    //getHighRiskByVAMC(VAMC_Id);
    //getVeteranData(Vet_Id);
    //$scope.getVeteran(Vet_Id);
    //console.log($scope.risks);
  })
  .directive('dataTablesFacility', function(){
    var linker = function(scope,element, attr){
        var unwatch = scope.$watch('dataSet', function(v){
            if(v){
                unwatch();
                var dataTableState = $(element).dataTable( {
                    "data": scope.dataSet,
                    "scrollY":        "200px",
                    "scrollCollapse": true,
                    "paging":         false,
                    "columns": [
                        { "title": "VAMC ID" },
                        { "title": "VA Medical Center" },
                        { "title": "STA3N" },
                        { "title": "Network Name", "class": "center" },
                        { "title": "Region Served", "class": "center" },
                        { "title": "Veteran Count in Facility", "class": "center" }
                        //{ "title": "Last VA Clinician Visit", "class": "center" }
                    ],
                    dom: 'T<"clear">lfrtip',
                    tableTools: {
                        "sRowSelect": "single"
                    }
                });
                $('#exampleFacility tbody').on( 'click', 'tr', function (event) {
                    //console.log( dataTableVet.row( this ).data() );
                    if($(this).hasClass('selected')){
                        $(this).removeClass('selected');
                        //$('#veteranView').hide();
                        //$('#facilityInfo').show();
                    }
                    else{
                        dataTableState.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        //$('#veteranView').show();
                        //$('#facilityInfo').hide();
                        //scope.getVeteran(event.currentTarget.cells[0].innerText); //Launch different service
                        console.log(event.currentTarget.cells[0].innerText);
                        scope.facilitySelected = event.currentTarget.cells[0].innerText;
                    }
                    
                    //console.log(event.currentTarget.cells[4].innerText);
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