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
  .directive('wtVismRoster', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/vismRoster/vismRoster.html',
      
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('lfrti')
            .withScroller()
            .withOption('deferRender', true)
            // Do not forget to add the scrollY option!!!
            .withOption('scrollY', 200)
            .withOption('paging',false)
            .withOption('order', [0, 'asc']);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
			      DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3)
          ];
      },
      link: function postLink(scope) {
        scope.$on("bindEvents", function (){
          $('#tblVismRoster tbody').on( 'click', 'tr', function (event) {
            if($(this).hasClass('selected')){
            }
            else{
              $('tr.selected').removeClass('selected');
              $(this).addClass('selected');
              // get common data object
              var commonData = scope.widget.dataModelOptions.common;
              console.log("commonData",commonData);
              console.log("clickEvent",event);
              // update common data object with new patient object
              var visnId = event.currentTarget.cells[0];
              /*var obj = jQuery.grep(scope.patientList, function( n, i ) {
                return ( n.ReachID == vetId );
              });*/
              console.log("VISN ID Selected: ",visnId);
              //delete obj[0].OutreachStatusSelect;
              commonData.data.visnSelected = visnId;
              console.log("CommonDataAfterClick: ", commonData);
              // broadcast message throughout system
              scope.$parent.$broadcast('commonDataChanged', commonData);
            }
            scope.$apply();
          });
        });
        scope.$watch('widgetData', function(data){
          if(data != null && data.length >0){
              scope.data = data;
              $timeout(function(){
                scope.$emit('bindEvents');
              },1500)            
            }
        });
      }
    };
  });