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
  .directive('wtNationalMilitaryBranch', function () {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nationalMilitaryBranch/nationalMilitaryBranch.html',
       
	controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, DTInstances) {

	//$scope.dtOptions = DTOptionsBuilder.newOptions()
	$scope.dtInstanceAbstract = DTInstances;
        $scope.dtInstance = null;
        $scope.militaryBranchList = $scope.widgetData;
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return new Promise( function(resolve, reject){
            if ($scope.widgetData)
              resolve($scope.widgetData);
            else
              resolve([]);
          });
        })
		.withDOM('lfrti')
		.withScroller()
		.withOption('deferRender', true)
		.withOption('paging',false)
		.withOption('order', [1, 'desc']);
	//.withPaginationType('full_numbers').withDisplayLength(5);
	$scope.dtColumns = [
        DTColumnBuilder.newColumn('BranchDesc').withTitle('Branch'),
        DTColumnBuilder.newColumn('Total').withTitle('Total Number of Patients per Branch')
	];
  },
 link: function postLink(scope, element, attr) {
	scope.$watch('widgetData', function (data) {
	  if (data != null && data.length >0) {
		scope.data = data;
		scope.militaryBranchList = data;
        var promise = new Promise( function(resolve, reject){
              if (scope.militaryBranchList)
                resolve(scope.militaryBranchList);
              else
                resolve([]);
            });
        if(scope.dtInstance)
          scope.dtInstance.changeData(promise);
        else {
          scope.dtInstanceAbstract.getList().then(function(dtInstances){
            dtInstances.tblMilitaryBranch._renderer.changeData(promise)              
          });
        }
	  }
	});
  }
};
});
	 /* controller: function ($scope) {
		console.log("First log stmt:", $scope.data);
		$scope.toolTipContentFunction = function(){
		return function(key, x, y, e, graph) {
			return  'Super New Tooltip' +
				'<h1>' + key + '</h1>' +
				'<p>' +  y + ' at ' + x + '</p>'
			};
		};

        $scope.xFunction = function(){
          return function(d) {
			console.log("Label console stmt:",d.Label);
            return d.Label;
          };
        };
        $scope.yFunction = function(){
          return function(d) {
			console.log("Value console stmt:", d.Value);
            return d.Value;
          };
        };
      }
    };
  });*/