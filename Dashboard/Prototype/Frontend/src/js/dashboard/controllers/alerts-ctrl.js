/**
 * Alerts Controller
 */
angular.module('Dashboard').controller('AlertsCtrl', ['$scope', '$http', AlertsCtrl]);

function AlertsCtrl($scope, $http) {
    console.log("BranchData: TEST");
    $http.get('http://localhost:3000/branch').success(function(data) {
        console.log("branchData:" + JSON.stringify(data));
        $scope.branchData = data;
    

        /*for (var i = 0; i < data.length; i++) {
            console.log(data[i].key);
            switch (data[i].key) {
                case "AIR FORCE":
                    console.log("Air Force is Found" + data[i].y);
                    $scope.airForce = data[i].y;
                    console.log("Air Force from scope" + airForce);
                    break;
                case "ARMY":
                    $scope.army = data[i].y;
                    break;
                case "MARINE CORPS":
                    $scope.marine = data[i].y;
                    break;
                case "NAVY":
                    $scope.navy = data[i].y;
                    break;
            }
        }*/

    });
    
            
    /* $scope.alerts = [
        { type: 'success', msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!' },
        { type: 'danger', msg: 'Found a bug? Create an issue with as many details as you can.' }
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };*/
}