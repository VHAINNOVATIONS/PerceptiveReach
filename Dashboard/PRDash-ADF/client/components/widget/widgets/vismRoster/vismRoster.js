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
      
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.visnList = $scope.widgetData;
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
            
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('VISN').withTitle('VISN'),
            DTColumnBuilder.newColumn('NetworkName').withTitle('Network Name'),
            DTColumnBuilder.newColumn('RegionServed').withTitle('Region Served'),
            DTColumnBuilder.newColumn('Total').withTitle('Patients'),
            DTColumnBuilder.newColumn('AtRisk').withTitle('At-Risk Persons')
        ];    
        $scope.eventTimer = null;
      },
      link: function postLink(scope, element, attr) {
          scope.$on("bindEvents", function (){
      
          scope.dtInstance.changeData(function() {
              return new Promise( function(resolve, reject){
                if (scope.visnList)
                  resolve(scope.visnList);
                else
                  resolve([]);
              });
          });


          $($('#VISNRosterDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
            $(this).attr('scope','col');
            $(this).attr('tabindex','-1');
          });

        $($('#VISNRosterDiv table')[0]).find('th').keydown(function(event){ 
          if (event.keyCode == 40 || event.key == 'Down' || event.keyCode == 38 || event.key == 'Up') {
            var isRowAtFocus = $('#tblVismRoster').find('tr.rowAtFocus');
            if(isRowAtFocus.length > 0)
            {
              isRowAtFocus.removeClass('rowAtFocus');
              isRowAtFocus.css('backgroundColor','');
              if(event.keyCode == 40)
              {
                if(isRowAtFocus.next())
                {
                  isRowAtFocus.next().addClass('rowAtFocus');
                  isRowAtFocus.next().css('backgroundColor','#f5f5f5');  
                }  
              }
              else
              {
                if(isRowAtFocus.prev())
                {
                  isRowAtFocus.prev().addClass('rowAtFocus');
                  isRowAtFocus.prev().css('backgroundColor','#f5f5f5');  
                }
              }
            }
            else
            {
              $($('#tblVismRoster>tbody>tr')[0]).addClass('rowAtFocus');
              $($('#tblVismRoster>tbody>tr')[0]).css('backgroundColor','#f5f5f5');
            }
            $('#VISNRosterDiv .dataTables_scrollBody').animate({ scrollTop: $('#tblVismRoster').find('tr.rowAtFocus')[0].offsetTop }, 500);
            return false;
          }

          if (event.keyCode == '32' || event.key == 'Spacebar') {
            $('#tblVismRoster').find('tr.rowAtFocus').css('backgroundColor','');
            $('#tblVismRoster').find('tr.rowAtFocus').click();
            return false;
          }

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
              commonData.data.facilitySelected.surveillanceName = null; 
              commonData.data.facilitySelected.surveillance = null; 
            }
              
            else if(activeView == "facility")
              commonData.data.visnSelected.facility = visnId;
            //console.log("CommonDataAfterClick: ", commonData);

            // broadcast message throughout system
            scope.$root.$broadcast('commonDataChanged', commonData);
            //scope.$apply();
          });

          $('#VISNRosterDiv .dataTables_scrollHeadInner,#VISNRosterDiv table').css({'width':''}); 
          var containerHeight = parseInt($('#VISNRosterDiv').parent().css('height'),10);
          $('#VISNRosterDiv .dataTables_scrollBody').css('height',.78 * containerHeight);
        });
        scope.$watch('widgetData', function(data){
          if(data != null && data.length >0){
              scope.data = data;
              scope.visnList = data;
              scope.$emit('bindEvents');                           
              $timeout(function(){
                $.fn.dataTable.ext.errMode = 'throw';
                var commonData = scope.widget.dataModelOptions.common;
                var activeView = commonData.data.activeView;
                if(activeView == "surveillance"){
                  if(commonData.data.visnSelected.surveillance != null && commonData.data.visnSelected.surveillance.toString().length > 0)
                  {
                    var selectedRow = null; 
                    $('#tblVismRoster tbody tr').each(function(){
                        var textcolumn = $(this).find('td').eq(0).text();
                        if($(this).find('td').eq(0).text() == commonData.data.visnSelected.surveillance){
                            selectedRow = $(this);
                            selectedRow.addClass('selected');//click();
                            //selectedRow[0].click();//.dataTables_scrollBody
                            var rowPosition = selectedRow[0].rowIndex - 6;
                            if(rowPosition > 0)
                            {
                              $('#VISNRosterDiv').parent().animate({
                                scrollTop: $('#tblVismRoster tbody tr').eq(rowPosition).offset().top
                              },500)
                            }
                        }
                    });  
                  }    
                }                
              },1500)            
            }
        });
      }
    };
  });