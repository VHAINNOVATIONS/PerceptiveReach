'use strict';

angular.module('perceptiveReachApp')
  .controller('WidgetCtrl', function ($scope, $http, modalService, Auth) {
    $scope.awesomeThings = [];
    $scope.dataSetTable = [];
    $scope.currentUser = Auth.getCurrentUser();
    var nationalData = [];
    
    /*$http.get('http://localhost:3000/FacilitiesStateCount').success(function(FacilitiesStateCount) {
        $scope.setupMap(FacilitiesStateCount); 
    });*/
})