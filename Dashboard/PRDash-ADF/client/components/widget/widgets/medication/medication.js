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
  .directive('wtMedications', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/medications/medications.html',
      scope: {
        data: '=data'
      }     
    };
  })
  .controller('MedCtrl', function($scope, $filter, ngTableParams) { //['ngTable']
    var show = "";
    var data = [
  {
    "ReachID": 1,
    "Active": 1,
    "RxID": 1,
    "Name": "Prescription 1",
    "Dosage": "100mg"
  },
  {
    "ReachID": 1,
    "Active": 0,
    "RxID": 2,
    "Name": "Prescription 2",
    "Dosage": "200mg"
  },
  {
    "ReachID": 1,
    "Active": 1,
    "RxID": 3,
    "Name": "Prescription 3",
    "Dosage": "300mg"
  },
  {
    "ReachID": 1,
    "Active": 1,
    "RxID": 4,
    "Name": "Prescription 4",
    "Dosage": "400mg"
  },
  {
    "ReachID": 1,
    "Active": 0,
    "RxID": 5,
    "Name": "Prescription 5",
    "Dosage": "500mg"
  },
  {
    "ReachID": 1,
    "Active": 1,
    "RxID": 1,
    "Name": "Prescription 1",
    "Dosage": "100mg"
  },
  {
    "ReachID": 1,
    "Active": 0,
    "RxID": 2,
    "Name": "Prescription 2",
    "Dosage": "200mg"
  },
  {
    "ReachID": 1,
    "Active": 1,
    "RxID": 3,
    "Name": "Prescription 3",
    "Dosage": "300mg"
  },
  {
    "ReachID": 1,
    "Active": 1,
    "RxID": 4,
    "Name": "Prescription 4",
    "Dosage": "400mg"
  },
  {
    "ReachID": 1,
    "Active": 0,
    "RxID": 5,
    "Name": "Prescription 5",
    "Dosage": "500mg"
  }
];

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 5           // count per page
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                    $filter('orderBy')(data, params.orderBy()) :
                    data;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
});