/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.dashboard')
  .controller('VeteranRosterTableWidgetSettingsCtrl', ['$scope', '$modalInstance', '$http','widget', function ($scope, $modalInstance, $http, widget) {
    // add widget to scope
    $scope.widget = widget;
    console.log(widget);
    // set up result object
    $scope.result = jQuery.extend(true, {}, widget);
    console.log($scope.result);


    $http.get('/api/getListOfVAMC')
        .success(function(listOfVAMC) {
          $scope.listOfVAMC = listOfVAMC;
        });

    $scope.ok = function () {      
      $modalInstance.close($scope.result);
      $scope.widget.dataModel.updateVAMC($scope.result.dataModel.vamc);
      $scope.widget.dataModel.getData();

    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);