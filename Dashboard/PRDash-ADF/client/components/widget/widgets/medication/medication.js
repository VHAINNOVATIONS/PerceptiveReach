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
  .directive('wtMedication', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/medication/medication.html',
      scope: {
        data: '=',
      },
      controller: function ($scope) {
        $scope.tableOptions = {
          loading: true,
          noRowsText: 'No Medications Found',
          loadingText: 'Load...',
          bodyHeight: 200,
          /*initialSorts: [
            { id: 'Name', dir: '+' }
          ]*/
        };
        $scope.columns = [
          { id: 'Name', key: 'Name', label: 'Medication', sort: 'string', filter: 'like', width: '200px'},
        ];
      },
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data) {
            scope.items = data;
          }
        });
      }
    };
  });