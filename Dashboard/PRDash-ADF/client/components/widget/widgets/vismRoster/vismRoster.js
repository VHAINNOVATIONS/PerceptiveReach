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
      
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, DTInstances) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        $scope.dtInstanceAbstract = DTInstances;
        $scope.dtInstance = null;
        $scope.visnList = $scope.widgetData;
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
            // Do not forget to add the scrollY option!!!
            .withOption('scrollY', 200)
            .withOption('paging',false)
            .withOption('order', [0, 'asc']);
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('VISN').withTitle('VISN'),
            DTColumnBuilder.newColumn('NetworkName').withTitle('Network Name'),
            DTColumnBuilder.newColumn('RegionServed').withTitle('Region Served'),
            DTColumnBuilder.newColumn('Total').withTitle('Total Patients')
        ];    
        $scope.eventTimer = null;
      },
      link: function postLink(scope, element, attr) {
        scope.$on("bindEvents", function (){
		$($('#VISNRosterDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
			$(this).attr('scope','col');
      $(this).attr('tabindex','-1');
        });
		
          $('#tblVismRoster').on( 'click', 'tr', function (event) {
            if(scope.eventTimer == event.timeStamp) return;
			
            scope.eventTimer = event.timeStamp;
            var visnId = null;
            var commonData = scope.widget.dataModelOptions.common;
            
            //if(scope.previousSelectedRowIndex == event.currentTarget.rowIndex){
            if($(this).hasClass('selected')){
              $(this).removeClass('selected');  
              //$('tr.selected').removeClass('selected');
              $(this).removeClass('selected').removeClass('selected');
              visnId = '';
              //scope.previousSelectedRowIndex = null;
            }
            else{
              //$('tr.selected').removeClass('selected');
              //$(this).addClass('selected');      
               $('#tblVismRoster tbody tr').filter(['.selected'].join()).removeClass('selected');
               console.log("VISNRoster selected:",$(this));
              $(this).addClass('selected');      
              // update common data object with new patient object
              visnId = parseInt(event.currentTarget.cells[0].innerText);
              /*var obj = jQuery.grep(scope.patientList, function( n, i ) {
                return ( n.ReachID == vetId );
              });*/
              console.log("VISN ID Selected: ",visnId);
              //delete obj[0].OutreachStatusSelect;              
            }

            var activeView = commonData.data.activeView;
            if(activeView == "surveillance"){
              commonData.data.visnSelected.surveillance = visnId;
              commonData.data.facilitySelected.surveillance = null; 
            }
              
            else if(activeView == "facility")
              commonData.data.visnSelected.facility = visnId;
            //console.log("CommonDataAfterClick: ", commonData);

            // broadcast message throughout system
            scope.$root.$broadcast('commonDataChanged', commonData);
            //scope.$apply();
          });
        });
        scope.$watch('widgetData', function(data){
          if(data != null && data.length >0){
              scope.data = data;
              scope.visnList = data;
              var promise = new Promise( function(resolve, reject){
                    if (scope.visnList)
                      resolve(scope.visnList);
                    else
                      resolve([]);
                  });
              if(scope.dtInstance)
                scope.dtInstance.changeData(promise);
              else {
                scope.dtInstanceAbstract.getList().then(function(dtInstances){
                  dtInstances.tblVismRoster._renderer.changeData(promise)              
                });
              }
              $timeout(function(){
                scope.$emit('bindEvents');
                var commonData = scope.widget.dataModelOptions.common;
                var activeView = commonData.data.activeView;
                if(activeView == "surveillance"){
                  if(commonData.data.visnSelected.surveillance != null && commonData.data.visnSelected.surveillance.toString().length > 0)
                  {
                    var selectedRow = $('#tblVismRoster').find( "tbody>tr:contains('"+commonData.data.visnSelected.surveillance+"') td:eq(0)" ).parent();
                    console.log("VISN Roster selected:", selectedRow);
                    console.log("VISNRoster selected row index:", selectedRow[0].rowIndex);
                    selectedRow.addClass('selected');//click();
                    //selectedRow[0].click();//.dataTables_scrollBody
                    $('.dataTables_scrollBody').animate({
                      scrollTop: $('#tblVismRoster tbody tr').eq(selectedRow[0].rowIndex).offset().top
                    },500)
                  }    
                }                
              },1500)            
            }
        });
      }
    };
  });