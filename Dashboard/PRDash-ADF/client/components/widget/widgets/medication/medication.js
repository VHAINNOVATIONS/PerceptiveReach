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
  .directive('wtMedication', function ($timeout) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/medication/medication.html',
      scope: {
        data: '=',
      }, 
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging',false);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0)
        ];
        /*$resource('data.json').query().$promise.then(function(persons) {
            vm.persons = persons;
        });*/
      },
	link: function postLink(scope, element) {
    		scope.$on("bindEvents", function (){
    			$($('#medicationDiv table')[0]).find('th').each(function(){
    			  $(this).attr('tabindex','-1');
    			});
    		});
        $timeout(function(){
          scope.$emit('bindEvents');      
        },1500);          

        $timeout(function(){
          $('#medicationDiv .dataTables_scrollHeadInner,#medicationDiv table').css({'width':''});
          var containerHeight = parseInt($('#medicationDiv').parent().css('height'),10);
          $('#medicationDiv .dataTables_scrollBody').css('height',.78 * containerHeight);
        },2500);

        scope.$watch('data', function (data) {
          if (data) {
            scope.data = data;
          }
        });
      }
    };
  });