'use strict';

angular.module('perceptiveReachApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.vetsInState = {};
    $scope.vetsInStateByBranch = {};
    $scope.vetsByBranch = {};
    var masterBranchValues = {};

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
    $http.get('http://localhost:3000/branch').success(function(veteransByBranch) {
        var output = {};
        for (var branchCount in veteransByBranch) {
            //console.log("branchName: " + veteransByBranch[branchCount].key + " count: " + veteransByBranch[branchCount].y);
            output[veteransByBranch[branchCount].key.replace(/\s/g,'')]=veteransByBranch[branchCount].y;
        }
        console.log(output);
        masterBranchValues = output;
        $scope.vetsByBranch = output;    
    });
    
    $http.get('http://localhost:3000/score').success(function(veteransByScore) {
        var outputList = [];
        
        for (var veteranCount in veteransByScore) {
            var outputObj = {};
            //console.log("branchName: " + veteransByBranch[branchCount].key + " count: " + veteransByBranch[branchCount].y);
            outputObj["label"]=veteransByScore[veteranCount].key;
            outputObj["value"]=veteransByScore[veteranCount].y;
            outputList.push(outputObj);
        }
        console.log(outputList);
        var donut = new Morris.Donut({
        element: 'sales-chart',
        resize: true,
        colors: ["#3c8dbc", "#f56954", "#00a65a"],
        data: outputList,
        hideHover: 'auto'
    });
        //masterBranchValues = output;
        //$scope.vetsByBranch = output;    
    });
    
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
          onRegionOut: function(e, code){
            $scope.vetsByBranch = masterBranchValues;
          }
      });
    });

  });
function getUpdatedBranchNumbers($http, stateCode) {
    var states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
    };
    
    var template = {"AIRFORCE": '0', "ARMY": '0', "MARINECORPS": '0', "NAVY": '0'};
    var state = '';
    for (var code in states) {
        if (stateCode.replace("US-","") == code)
            state = states[code];
    }
    //console.log(stateCode);
    $http.get('http://localhost:3000/veteransByState?id=' + state).success(function(veteransInStates) {
        //console.log(veteransInStates);
        for (var branch in template) {
            for (var branchReturn in veteransInStates) {
                if (branch == veteransInStates[branchReturn].Branch.replace(/\s/g,''))
                    template[branch] = veteransInStates[branchReturn].Total;
            }
        }
        console.log(template);
        return template;
    });
};

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


