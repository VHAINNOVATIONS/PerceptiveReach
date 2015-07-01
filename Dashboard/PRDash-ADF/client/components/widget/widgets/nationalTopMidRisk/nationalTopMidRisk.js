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
  .directive('wtNationalTopMidRisk', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nationalTopMidRisk/nationalTopMidRisk.html',
      scope: {
        data: '=data'
      }, 
	controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

	$scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('lfrti')
		.withScroller()
		.withOption('deferRender', true)
		// Do not forget to add the scrollY option!!!
		.withOption('scrollY', 200)
		.withOption('paging',false)
		.withOption('order', [1, 'desc']);
	//.withPaginationType('full_numbers').withDisplayLength(5);
	$scope.dtColumnDefs = [
		DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1)
	];
  },
  link: function postLink(scope) {
	scope.$watch('data', function (data) {
	  if (data) {
		scope.data = data;
	  }
	});
  }
};
});
      /*controller: function ($scope) {
		
		$scope.toolTipContentFunction = function(){
		return function(key, x, y, e, graph) {
			return  'Super New Tooltip' +
				'<h1>' + key + '</h1>' +
				'<p>' +  y + ' at ' + x + '</p>'
			};
		};

        $scope.xFunction = function(){
          return function(d) {
            return d.label;
          };
        };
        $scope.yFunction = function(){
          return function(d) {
            return d.value;
          };
        };
      }
    };
  });*/