'use strict';

angular.module('perceptiveReachApp')
  .controller('MainCtrl', function ($scope, $http, modalService) {
    $scope.awesomeThings = [];
    
    $http.get('http://localhost:3000/veteransByState').success(function(veteransInStates) {
      var vetsByState = convertToRightStateObj(veteransInStates);
      $scope.vetsInState = vetsByState;
      // Instanciate the map
      $('#map').vectorMap({
          map: 'us_mill_en',  
          onRegionTipShow: function(e, el, code){
              el.html(el.html()+' (Veterans - '+vetsByState[code]+')');
              //$scope.vetsByBranch = getUpdatedBranchNumbers($http, code);               
          },
          onRegionClick: function(event, code){
            stateView(String(code).replace("US-",""));  
          },
          onRegionOut: function(e, code){
            //$scope.vetsByBranch = masterBranchValues;
          }
      });
    });
    
    function facilityIndividualView (id) {
        //var custName = 'Andal'//$scope.customer.firstName + ' ' + $scope.customer.lastName;
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
    //facilityIndividualView(1);
    
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
    
    
    function convertToRightStateObj(veteranByState) {
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
    for (var stateCombo in veteranByState) {
        for (var stateName in states) {
            //console.log("stateNme: " + stateName + "  stateCombo: " + stateCombo);
           output["US-" + states[veteranByState[stateCombo].State]]=veteranByState[stateCombo].Total;
            //console.log(output);
        }
    }
    return output;
};

  })
  /*.directive('dataTables', function(){
    var linker = function(scope,element, attr){
        console.log(scope.dataSet);
        element.dataTable( {
            "data": scope.dataSet,
            "scrollY":        "200px",
            "scrollCollapse": true,
            "paging":         false,
            "columns": [
                { "title": "Veteran Name" },
                { "title": "Veteran SSN" },
                { "title": "Veteran Phone" },
                { "title": "Date First identified as High Risk", "class": "center" },
                { "title": "Date Record Last Updated", "class": "center" },
                { "title": "Last VA Clinician Visit", "class": "center" }
            ]
        });    
    };
    return {
        restrict:'EAC',
        link: linker
    }
  });*/
