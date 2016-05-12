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
  .directive('wtNationalAgeGroups', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nationalAgeGroups/nationalAgeGroups.html',
     
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.ageGroupsList = $scope.widgetData;
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
        .withOption('order', [1, 'desc']);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('AgeRange').withTitle('Age Groups'),
            DTColumnBuilder.newColumn('RiskLevelDescription').withTitle('Risk Level Group'),
            DTColumnBuilder.newColumn('Total').withTitle('At-Risk Persons')
        ];
      },
     link: function postLink(scope, element, attr) {
	
        scope.$on("bindEvents", function (){
      		$($('#ageGroupDiv table')[0]).find('th').each(function(){
      			$(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort 			by '+ $(this).text()+'">'+$(this).text()+'</a>');
      			$(this).attr('scope','col');
      			$(this).attr('tabindex','-1');
          });
          
          $timeout(function(){
            $('#ageGroupDiv .dataTables_scrollHeadInner,#ageGroupDiv table').css({'width':''});
            var containerHeight = parseInt($('#ageGroupDiv').parent().css('height'),10);
            $('#ageGroupDiv .dataTables_scrollBody').css('height',.78 * containerHeight);
          },2500);
    		});
        scope.$watch('widgetData', function (data) {
          $timeout(function(){
            $.fn.dataTable.ext.errMode = 'throw';
            scope.$emit('bindEvents');
            if (data != null && data.length >0) {
              scope.data = data;
              scope.ageGroupsList = data;
              var promise = new Promise( function(resolve, reject){
                    if (scope.ageGroupsList)
                      resolve(scope.ageGroupsList);
                    else
                      resolve([]);
                  });
              
              scope.dtInstance.changeData(function() {
                  return promise;
              });
                
            }
          },1000)
        });

       
      }
    };
  });