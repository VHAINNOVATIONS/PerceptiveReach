/**
 * Master Controller
 */
angular.module('Dashboard')
    .controller('AttemptsCtrl', ['$scope', '$http', AttemptsCtrl])
    .controller('ScoreChartCtrl', ['$scope', '$http', ScoreChartCtrl])
    .controller('MasterCtrl', ['$scope', '$cookieStore', MasterCtrl]);

function MasterCtrl($scope, $cookieStore) {
    /**
     * Sidebar Toggle & Cookie Control
     *
     */
    var mobileView = 992;

    $scope.getWidth = function() { return window.innerWidth; };

    $scope.$watch($scope.getWidth, function(newValue, oldValue)
    {
        if(newValue >= mobileView)
        {
            if(angular.isDefined($cookieStore.get('toggle')))
            {
                if($cookieStore.get('toggle') == false)
                {
                    $scope.toggle = false;
                }            
                else
                {
                    $scope.toggle = true;
                }
            }
            else 
            {
                $scope.toggle = true;
            }
        }
        else
        {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() 
    {
        $scope.toggle = ! $scope.toggle;

        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() { $scope.$apply(); };
}

function AttemptsCtrl($scope, $http){
    
    console.log("ScoreData: TEST");
    $http.get('http://localhost:3000/attempts').success(function(data) {
        console.log("attemptsData:" + JSON.stringify(data));
        $scope.attemptsData = data;
            
    });

    /*$scope.attemptsData = [
        {
            "key": "ATTEMPTS",
            "values": [ [ 'HIGH' , 223] , [  'MEDIUM'  , 102] , [ 'LOW'  , 46] ]
        },
        {
            "key": "ACTUALS",
            "values": [ [ 'HIGH' , 150] , [  'MEDIUM'  , 88] , [ 'LOW'  , 22] ]
        },
    ];*/

    $scope.xAxisTickFormatFunction = function(){
        return function(d){
            console.log("xAxis:" + d);
            return d;
        }
    }

    $scope.toolTipContentFunction = function(){
        return function(key, x, y, e, graph) {
                return  '<h3>' + key + '</h3>' +
                '<p>' +  y + ' for ' + x + '</p>'
        }
    }

}

function ScoreChartCtrl($scope, $http) {
    console.log("ScoreData: TEST");
    $http.get('http://localhost:3000/score').success(function(data) {
        console.log("ScoreData:" + JSON.stringify(data));
        $scope.scoreChart = data;
            
    });

    $scope.xFunction = function(){
        return function(d) {
            return d.key;
        };
    }
        $scope.yFunction = function(){
            return function(d) {
                return d.y;
            };
        }

    $scope.descriptionFunction = function(){
        return function(d){
            return d.key;
        }
    }
}