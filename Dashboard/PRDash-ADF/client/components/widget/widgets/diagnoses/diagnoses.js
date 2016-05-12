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
  .directive('wtDiagnoses', function ($timeout) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/diagnoses/diagnoses.html',
      scope: {
        data: '=',
      },
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging',false)
            .withOption('bDestroy',true)
            .withOption('order', [1, 'desc']);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2)
        ];
        /*$resource('data.json').query().$promise.then(function(persons) {
            vm.persons = persons;
        });*/
      },
	link: function postLink(scope, element) {
        scope.$on("bindEvents", function (){
          $($('#diagnosisDiv table')[0]).find('th').each(function(){
            $(this).attr('tabindex','-1');
          });
         
          $timeout(function(){
            $('#diagnosisDiv .dataTables_scrollHeadInner,#diagnosisDiv table').css({'width':''});  
            var containerHeight = parseInt($('#diagnosisDiv').parent().css('height'),10);
            $('#diagnosisDiv .dataTables_scrollBody').css('height',.78 * containerHeight);  
          },2500);
        });

        $timeout(function(){
            scope.$emit('bindEvents');
            
        },1500);

       
        

        scope.$watch('data', function (data) {
          $.fn.dataTable.ext.errMode = 'throw';
          if (data) {
             scope.data = data;  
        }
        });
      }
    };
  });