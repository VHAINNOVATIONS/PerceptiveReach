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
     
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.facilityList = $scope.widgetData;
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
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('STA3N').withTitle('VAMC'),
            DTColumnBuilder.newColumn('VAMC_Name').withTitle('VAMC Name'),
            DTColumnBuilder.newColumn('StateAbbr').withTitle('State'),
            DTColumnBuilder.newColumn('VISN').withTitle('VISN'),
            DTColumnBuilder.newColumn('Total').withTitle('Patients'),
            DTColumnBuilder.newColumn('AtRisk').withTitle('At-Risk Persons'),
            DTColumnBuilder.newColumn('Prediction').withTitle('Prediction Alert'),
          ];
      },
      link: function postLink(scope, element, attr) {
        scope.$on("bindEvents", function (){

          scope.dtInstance.changeData(function() {
                return new Promise( function(resolve, reject){
                  if (scope.facilityList)
                  {
                    resolve(scope.facilityList);
                  }
                  else
                  {
                    resolve([]);
                  }
                });
              });

          $($('#facilityRosterDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+',Down/Up arrows to navigate, Spacebar to select and Tab to Exit rows">'+$(this).text()+'</a>');
            $(this).attr('scope','col');
            $(this).attr('tabindex','-1');
          }); 

          $($('#facilityRosterDiv table')[0]).find('th').keydown(function(event){ 
          if (event.keyCode == 40 || event.key == 'Down' || event.keyCode == 38 || event.key == 'Up') {
            var isRowAtFocus = $('#tblFacilityRoster').find('tr.rowAtFocus');
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
              $($('#tblFacilityRoster>tbody>tr')[0]).addClass('rowAtFocus');
              $($('#tblFacilityRoster>tbody>tr')[0]).css('backgroundColor','#f5f5f5');
            }
            return false;
          }

          if (event.keyCode == '32' || event.key == 'Spacebar') {
            $('#tblFacilityRoster').find('tr.rowAtFocus').css('backgroundColor','');
            $('#tblFacilityRoster').find('tr.rowAtFocus').click();
            return false;
          }

        });
		
          $('#tblFacilityRoster').on( 'click', 'tr', function (event) {
            if(scope.eventTimer == event.timeStamp) return;
			
            scope.eventTimer = event.timeStamp;
            var facilityId = null;
            var facilityName = null;
            var commonData = scope.widget.dataModelOptions.common;
            var activeView = commonData.data.activeView;
            //if(scope.previousSelectedRowIndex == event.currentTarget.rowIndex){
            if($(this).hasClass('selected')){
              if(activeView != "facility"){
                $(this).removeClass('selected');  
                //$('tr.selected').removeClass('selected');
                $(this).removeClass('selected').removeClass('selected');
                var activeView = commonData.data.activeView;
                facilityId = '';  
                facilityName = '';
              } 
              else
                facilityId = commonData.data.facilitySelected.facility;             
                facilityName = commonData.data.facilitySelected.facilityName;             
            }
            else{
              console.log("tableroster:",$('#tblFacilityRoster'));//.cells().nodes().removeClass('selected');
              console.log("facilityroster has class:",$('#tblFacilityRoster tbody tr').hasClass('selected'));
              console.log("facilityroster tr:",$('#tblFacilityRoster tbody tr'));
              $('#tblFacilityRoster tbody tr').filter(['.selected'].join()).removeClass('selected');
              $(this).addClass('selected');      
              // update common data object with new patient object
              console.log("eventClick:", event);
              facilityId = parseInt(event.currentTarget.cells[0].innerText);
              facilityName = event.currentTarget.cells[1].innerText;
              /*var obj = jQuery.grep(scope.patientList, function( n, i ) {
                return ( n.ReachID == vetId );
              });*/
              console.log("Facility ID Selected: ",facilityId);
              //delete obj[0].OutreachStatusSelect;              
            }
            
            if(activeView == "surveillance")
            {
              commonData.data.facilitySelected.surveillance = facilityId;
              commonData.data.facilitySelected.surveillanceName = facilityName;
            }
            else if(activeView == "facility")
            {
              if(commonData.data.facilitySelected && commonData.data.facilitySelected.facility != facilityId )
              {
                commonData.data.veteranObj = '';
              }
              commonData.data.facilitySelected.facility = facilityId;
              commonData.data.facilitySelected.facilityName = facilityName;
            }
            // broadcast message throughout system
            scope.$root.$broadcast('commonDataChanged', commonData);
          });

          $('#facilityRosterDiv .dataTables_scrollHeadInner,#facilityRosterDiv table').css({'width':''});
          var containerHeight = parseInt($('#facilityRosterDiv').parent().css('height'),10);
        });
		

        scope.$watch('widgetData', function(data){
          if(data != null && data.length >0){
              scope.data = data;
              scope.facilityList = data;
               scope.$emit('bindEvents');

              $timeout(function(){               
                $.fn.dataTable.ext.errMode = 'throw';
                var commonData = scope.widget.dataModelOptions.common;
                var activeView = commonData.data.activeView;
                var selectedRow = null; 
                if(activeView == "facility"){
                  if(commonData.data.facilitySelected.facility == null || commonData.data.facilitySelected.facility.toString().length == 0)
                  {
                    $('#tblFacilityRoster').find( "tbody>tr:first" ).click();
                  }
                  else
                  {
                    $('#tblFacilityRoster tbody tr').each(function(){
                        var textcolumn = $(this).find('td').eq(0).text();
                        if($(this).find('td').eq(0).text() == commonData.data.facilitySelected.facility){
                            selectedRow = $(this);
                            selectedRow.click();
                        }
                    }); 
                  }  
                }
                else if(activeView == "surveillance"){
                  if(commonData.data.facilitySelected.surveillance != null && commonData.data.facilitySelected.surveillance.toString().length > 0)
                  {
                    $('#tblFacilityRoster tbody tr').each(function(){
                        var textcolumn = $(this).find('td').eq(0).text();
                        if($(this).find('td').eq(0).text() == commonData.data.facilitySelected.surveillance){
                            selectedRow = $(this);
                            selectedRow.addClass('selected');
                        }
                    });                                
                  }  
                }

                if(selectedRow)
                {
                  var rowPosition = selectedRow[0].rowIndex-8;
                  if(rowPosition > 0 && $('#facilityRosterDiv').parent().scrollTop() == 0)
                  {
                    $('#facilityRosterDiv').parent().animate({  
                      scrollTop: $('#tblFacilityRoster tbody tr').eq(rowPosition).offset().top
                    },500);
                  }
                }
                
              },1500)            
            }
        });
      }
    };
  });