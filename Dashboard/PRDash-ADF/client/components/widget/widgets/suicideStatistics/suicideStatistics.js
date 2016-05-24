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
  .directive('wtExternalSuicideStatistics', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/suicideStatistics/suicideStatistics.html',
      
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = DTInstances;
        $scope.dtInstance = {};
        $scope.suicideStatusList = $scope.widgetData;
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return new Promise( function(resolve, reject){
            if ($scope.widgetData)
              resolve($scope.widgetData);
            else
              resolve([]);
          });
        })
        .withOption('paging',false)
        .withOption('bDestroy',true)
        .withOption('order', [0, 'asc']);
            //.withPaginationType('full_numbers').withDisplayLength(100);
			
        $scope.dtColumns = [
          DTColumnBuilder.newColumn('Age').withTitle('Age Range'),
          DTColumnBuilder.newColumn('Gender').withTitle('Gender'),
          DTColumnBuilder.newColumn('Value').withTitle('2013 Total Suicide Deaths Per 100K'),
          DTColumnBuilder.newColumn('Ethnicity').withTitle('Ethnicity')
        ];
      },
     link: function postLink(scope, element, attr) {
	
        scope.$on("bindEvents", function (){
		$($('#suicideStatisticsDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
			$(this).attr('scope','col');
			$(this).attr('tabindex','-1');
        });
		});
		
        scope.$watch('widgetData', function (data) {
		$timeout(function(){
      $.fn.dataTable.ext.errMode = 'throw';
                scope.$emit('bindEvents');
          if (data != null && data.length >0) {
            scope.data = data;
            scope.suicideStatusList = data;
            var promise = new Promise( function(resolve, reject){
              if (scope.suicideStatusList)
                resolve(scope.suicideStatusList);
              else
                resolve([]);
            });
           scope.dtInstance.changeData(function() {
                  return promise;
              });

          }
		      },1000)
        });

        $timeout(function(){
          $('#suicideStatisticsDiv .dataTables_scrollHeadInner,#suicideStatisticsDiv table').css({'width':''});
          var containerHeight = parseInt($('#suicideStatisticsDiv').parent().css('height'),10);
          $('#suicideStatisticsDiv .dataTables_scrollBody').css('height',.78 * containerHeight);  
        },2500);
      }
    };
  });