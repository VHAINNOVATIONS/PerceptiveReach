'use strict';

angular.module('perceptiveReachApp')
  .controller('MainCtrl', function ($scope, $http, modalService) {
    $scope.awesomeThings = [];
    $scope.dataSetTable = [];
    var nationalData = [];
    
    $http.get('http://localhost:3000/FacilitiesStateCount').success(function(FacilitiesStateCount) {
      var facByState = convertToRightStateObj(FacilitiesStateCount);
      $scope.vetsInState = facByState;
      // Instanciate the map
      $('#map').vectorMap({
          map: 'us_mill_en',  
          onRegionTipShow: function(e, el, code){
              el.html(el.html()+' (Facilities - '+facByState[code]+')');
              //$scope.vetsByBranch = getUpdatedBranchNumbers($http, code); 
              updateTotalRiskTableByState(String(code).replace("US-",""));
              //$scope.dataTableNational.fnDraw();
          },
          onRegionClick: function(event, code){
            stateView(String(code).replace("US-",""));  
          },
          onRegionOut: function(e, code){
            //$scope.vetsByBranch = masterBranchValues;
              var count = 0;
              for(var element in nationalData){
                $scope.dataTableNational.fnUpdate(nationalData[element],element); 
              }
          }
      });
    });
    
    $http.get('http://localhost:3000/totalRiskByState').success(function(risksAtNational) {
    //console.log(veteransByVAMC);
        var output = [];
        var vamc = "";
        for (var risk in risksAtNational) {
            //vamc = veteransByVAMC[0].VAMC
            //console.log("branchName: " + veteransByBranch[branchCount].key + " count: " + veteransByBranch[branchCount].y);
            //output[veteransByBranch[branchCount].key.replace(/\s/g,'')]=veteransByBranch[branchCount].y;
            var record = [];
            record.push("PTSD");
            record.push(String(risksAtNational[risk].PTSD));
            record.push(String(risksAtNational[risk].PTSD_PCT) + "%");
            output.push(record);
            record = [];
            record.push("Substance Abuse");
            record.push(String(risksAtNational[risk].SubstanceAbuseHistory));
            record.push(String(risksAtNational[risk].SubstanceAbuseHistory_PCT) + "%");
            output.push(record);
            record = [];
            record.push("Previous Hospitalization");
            record.push(String(risksAtNational[risk].Hospitilized));
            record.push(String(risksAtNational[risk].Hospitilized_PCT) + "%");
            output.push(record);
            record = [];
            record.push("Previous Attempt(s)");
            record.push(String(risksAtNational[risk].PreviousAttempts));
            record.push(String(risksAtNational[risk].PreviousAttempts_PCT) + "%");
            output.push(record);
            record = [];
            record.push("TBI Diagnosis");
            record.push(String(risksAtNational[risk].DiagnosedTBI));
            record.push(String(risksAtNational[risk].DiagnosedTBI_PCT) + "%");
            output.push(record);
            record = [];
            record.push("Total High-Risk Veteran Population");
            record.push(String(risksAtNational[risk].TotalHighRisk_National));
            record.push("100%");
            output.push(record);
            record = [];            
        }
        //$scope.VAMC = vamc;
        //console.log($scope.VAMC);
        $scope.dataSetTable = output;
        nationalData = output;
        console.log($scope.dataSetTable);
        console.log($scope);
        
        $scope.dataTableNational = $('#exampleNational').dataTable( {
                    "data": $scope.dataSetTable,
                    "scrollY":        "300px",
                    "scrollCollapse": false,
                    "paging":         false,
                    "bFilter":         false,
                    "info":         false,
                    "columns": [
                        { "title": "Factor*" },
                        { "title": "Count**" },
                        //{ "title": "STA3N" },
                        { "title": "Percentage (Count / Total High Risk Population)***", "class": "center" }
                        //{ "title": "Region Served", "class": "center" },
                        //{ "title": "Veteran Count in Facility", "class": "center" }
                        //{ "title": "Last VA Clinician Visit", "class": "center" }
                    ],
                    dom: 'T<"clear">lfrtip',
                    tableTools: {
                        "sRowSelect": "single"
                    }
                });
        //return output;
    });
    
    function updateTotalRiskTableByState (state){
        $http.get('http://localhost:3000/totalRiskByState?id=%27'+ state + '%27').success(function(risksAtNational) {
        //console.log(veteransByVAMC);
            var output = [];
            var vamc = "";
            for (var risk in risksAtNational) {
                //vamc = veteransByVAMC[0].VAMC
                //console.log("branchName: " + veteransByBranch[branchCount].key + " count: " + veteransByBranch[branchCount].y);
                //output[veteransByBranch[branchCount].key.replace(/\s/g,'')]=veteransByBranch[branchCount].y;
                var record = [];
                record.push("PTSD");
                record.push(String(risksAtNational[risk].PTSD));
                record.push(String(risksAtNational[risk].PTSD_PCT) + "%");
                output.push(record);
                $scope.dataTableNational.fnUpdate(record,0);
                record = [];
                record.push("Substance Abuse");
                record.push(String(risksAtNational[risk].SubstanceAbuseHistory));
                record.push(String(risksAtNational[risk].SubstanceAbuseHistory_PCT) + "%");
                output.push(record);
                $scope.dataTableNational.fnUpdate(record,1);
                record = [];
                record.push("Previous Hospitalization");
                record.push(String(risksAtNational[risk].Hospitilized));
                record.push(String(risksAtNational[risk].Hospitilized_PCT) + "%");
                output.push(record);
                $scope.dataTableNational.fnUpdate(record,2);
                record = [];
                record.push("Previous Attempt(s)");
                record.push(String(risksAtNational[risk].PreviousAttempts));
                record.push(String(risksAtNational[risk].PreviousAttempts_PCT) + "%");
                output.push(record);
                $scope.dataTableNational.fnUpdate(record,3);
                record = [];
                record.push("TBI Diagnosis");
                record.push(String(risksAtNational[risk].DiagnosedTBI));
                record.push(String(risksAtNational[risk].DiagnosedTBI_PCT) + "%");
                output.push(record);
                $scope.dataTableNational.fnUpdate(record,4);
                record = [];
                record.push("Total High-Risk Veteran Population");
                record.push(String(risksAtNational[risk].TotalHighRisk_National));
                record.push("100%");
                output.push(record);
                $scope.dataTableNational.fnUpdate(record,5);
                record = [];            
            }
            //$scope.VAMC = vamc;
            //console.log($scope.VAMC);
            //$scope.dataSetTable = output;
            //console.log($scope.dataSetTable);
            //console.log($scope);
        });
    }
    
    function getFacilityByState (id){
        $http.get('http://localhost:3000/facilityByState?id=%27'+ id + '%27').success(function(facilitiesByState) {
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
    
    
    function stateView (id) {

        var custName = 'Andal'//$scope.customer.firstName + ' ' + $scope.customer.lastName;

        var optionsChoice = {};
        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Ok',
            headerText: 'State Facility View - ' + id
            //bodyText: 'Are you sure you want to delete this customer?'
        };
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            controller: 'StateFacilityModalCtrl',
            resolve:{
                data: function () {
                    return {options: modalOptions, id:id};
                }
            },
            windowClass: 'app-modal-window',
            templateUrl: 'components/StateFacilityModal/StateFacilityModal.html'
        };
        modalService.showModal(modalDefaults, modalOptions).then(function (result) {
           
        });
    }
    //stateView("TX");
    
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
    
    function convertToRightStateObj(facilityByState) {
    var states = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District Of Columbia': 'DC',
    'Federated States Of Micronesia': 'FM',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Marshall Islands': 'MH',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands': 'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Palau': 'PW',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
    };
    
    var output = {};
    
    //loop through vets by state and populate correct state codes and values 
    /*for (var stateCombo in veteranByState) {
        for (var stateName in states) {
            //console.log("stateNme: " + stateName + "  stateCombo: " + stateCombo);
           output["US-" + states[veteranByState[stateCombo].State]]=veteranByState[stateCombo].Total;
            //console.log(output);
        }
    }*/
    for (var stateCombo in facilityByState) {
        output["US-" + facilityByState[stateCombo].State]=facilityByState[stateCombo].Total;    
    }
    return output;
}

  })
  .directive('dataTablesNational', function(){    
    var linker = function(scope,element, attr){
        console.log("inside dataTableNational Directive");
        console.log(scope.dataSetTable);
        /*var unwatch = scope.$watch('dataSetTable', function(v){
            if(v){
                console.log("inside watch dataTableNational Directive");
                console.log(scope.dataSetTable);
                unwatch();
                var dataTableNational = $(element).dataTable( {
                    "data": scope.dataSetTable,
                    "scrollY":        "200px",
                    "scrollCollapse": true,
                    "paging":         false,
                    "columns": [
                        { "title": "Factor*" },
                        { "title": "Count**" },
                        //{ "title": "STA3N" },
                        { "title": "Percentage (Count / Total High Risk Population)***", "class": "center" }
                        //{ "title": "Region Served", "class": "center" },
                        //{ "title": "Veteran Count in Facility", "class": "center" }
                        //{ "title": "Last VA Clinician Visit", "class": "center" }
                    ],
                    dom: 'T<"clear">lfrtip',
                    tableTools: {
                        "sRowSelect": "single"
                    }
                });
                $('#exampleNational tbody').on( 'click', 'tr', function (event) {
                    //console.log( dataTableVet.row( this ).data() );
                    if($(this).hasClass('selected')){
                        $(this).removeClass('selected');
                        //$('#veteranView').hide();
                        //$('#facilityInfo').show();
                    }
                    else{
                        dataTableNational.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        //$('#veteranView').show();
                        //$('#facilityInfo').hide();
                        //scope.getVeteran(event.currentTarget.cells[0].innerText); //Launch different service
                        console.log(event.currentTarget.cells[0].innerText);
                        scope.facilitySelected = event.currentTarget.cells[0].innerText;
                    }
                    
                    //console.log(event.currentTarget.cells[4].innerText);
                });
            }
        });*/
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
