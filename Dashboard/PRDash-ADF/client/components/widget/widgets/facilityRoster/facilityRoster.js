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
  .directive('wtFacilityRoster', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/facilityRoster/facilityRoster.html',
     
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('lfrti')
            .withScroller()
            .withOption('deferRender', true)
            // Do not forget to add the scrollY option!!!
            .withOption('scrollY', 200)
            .withOption('paging',false)
            .withOption('order', [1, 'desc']);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
			      DTColumnDefBuilder.newColumnDef(2)
          ];
      },
      link: function postLink(scope) {
        scope.$on("bindEvents", function (){
          $('#tblFacilityRoster').on( 'click', 'tr', function (event) {
            if(scope.eventTimer == event.timeStamp) return;

            scope.eventTimer = event.timeStamp;
            var facilityId = null;
            var commonData = scope.widget.dataModelOptions.common;
            
            //if(scope.previousSelectedRowIndex == event.currentTarget.rowIndex){
            if($(this).hasClass('selected')){
              $(this).removeClass('selected');  
              //$('tr.selected').removeClass('selected');
              $(this).removeClass('selected').removeClass('selected');
              var activeView = commonData.data.activeView;
              facilityId = '';
              //scope.previousSelectedRowIndex = null;
            }
            else{
              //$('tr.selected').removeClass('selected');
              //$(this).hasClass('selected').removeClass('selected');
              console.log("tableroster:",$('#tblFacilityRoster'));//.cells().nodes().removeClass('selected');
              console.log("facilityroster has class:",$('#tblFacilityRoster tbody tr').hasClass('selected'));
              console.log("facilityroster tr:",$('#tblFacilityRoster tbody tr'));
              $('#tblFacilityRoster tbody tr').filter(['.selected'].join()).removeClass('selected');
              $(this).addClass('selected');      
              // update common data object with new patient object
              console.log("eventClick:", event);
              facilityId = parseInt(event.currentTarget.cells[0].innerText);
              /*var obj = jQuery.grep(scope.patientList, function( n, i ) {
                return ( n.ReachID == vetId );
              });*/
              console.log("Facility ID Selected: ",facilityId);
              //delete obj[0].OutreachStatusSelect;              
            }

            var activeView = commonData.data.activeView;
            if(activeView == "surveillance")
              commonData.data.facilitySelected.surveillance = facilityId;
            else if(activeView == "facility")
              commonData.data.facilitySelected.facility = facilityId;
            //console.log("CommonDataAfterClick: ", commonData);

            // broadcast message throughout system
            scope.$root.$broadcast('commonDataChanged', commonData);
            //scope.$apply();
          });
        });
        scope.$watch('widgetData', function(data){
          if(data != null && data.length >0){
              scope.data = data;
              $timeout(function(){
                scope.$emit('bindEvents');
                var commonData = scope.widget.dataModelOptions.common;
                var activeView = commonData.data.activeView;
                if(activeView == "facility"){
                  if(commonData.data.facilitySelected.facility == null || commonData.data.facilitySelected.facility.toString().length == 0)
                  {
                    $('#tblFacilityRoster').find( "tbody>tr:first" ).click();
                  }
                  else
                  {
                    $('#tblFacilityRoster').find( "tbody>tr td:contains('"+commonData.data.facilitySelected.facility+"')" ).parent().click();
                  }  
                }
                
              },1500)            
            }
        });
      }
    };
  });