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

angular.module('ui.widgets')
  .directive('wtAppointmentUI', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/appointmentUI/appointmentUI.html',
      scope: {
        data: '=',
      },
      controller: function ($scope, uiGridConstants) {

        $scope.gridOptions = {
          enableFiltering: true,
          onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
          },
          columnDefs: [
            // data layout: {"ReachID": 1,"ApptType": 1,"Apptdate": "2014-02-03T00:00:00.000Z","CancelationType": "0"}
            // default
            { field: 'ApptType', enableFiltering: false },
            // pre-populated search field
            { field: 'CancelationType'/*, filter: { 
                term: '1', 
                type: uiGridConstants.filter.SELECT, 
                selectOptions: [ { value: '0', label: 'Success'}, { value: '1', label: 'Canceled' }, { value: '2', label: 'No Show' } ]
              }, 
              cellFilter: 'mapCancelationType' */},                               
            // date filter
            { field: 'Apptdate'}
          ]
        };

        $scope.toggleFiltering = function(){
          $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
          $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
        };
      }/*.filter('mapCancelationType', function() {
        var cancelationTypeHash = {
          0: 'Success'
          1: 'Canceled',
          2: 'No Show'
        };

        return function(input) {
          if (!input){
            return '';
          } else {
            return cancelationTypeHash[input];
          }
        };
      });*/,
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data) {
            scope.gridOptions.data = data;
          }
        });
      }
    };
  });