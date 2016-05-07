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
  .directive('wtPatientRosterTable', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/patientTable/patientTable.html',
      
      controller: function ($scope,$compile, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.patientList = $scope.widgetData;
        $scope.OutreachMap = {};
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
              return new Promise( function(resolve, reject){
                if ($scope.widgetData)
                  resolve($scope.widgetData);
                else
                  resolve([]);
              });
 
          })//.fromSource($scope.widgetData) newOptions().
            .withOption('createdRow', function(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            })
            .withOption('rowCallback', rowCallback)
            .withDOM('lfrti')
            .withScroller()
            .withOption('deferRender', true)
            // Do not forget to add the scorllY option!!!
            .withOption('scrollY', 200)
            .withOption('bDestroy',true)
            .withPaginationType('full_numbers')
            .withDOM('frtip')
            .withButtons([
                { extend: 'csv', text: '<a name="PatientExport" class="glyphicon glyphicon-export"></a>' }
            ]);
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('Name').withTitle('Name').withOption('width', '20%'),
            DTColumnBuilder.newColumn('SSN').withTitle('SSN').withOption('width', '15%'),
            DTColumnBuilder.newColumn('HomePhone').withTitle('Phone').withOption('width', '10%'),
            DTColumnBuilder.newColumn('DateIdentifiedAsAtRisk').withTitle('Date First Identified').withOption('width', '15%'),
            DTColumnBuilder.newColumn('RiskLevel').withTitle('Statistical Risk Level').withOption('width', '10%'),
            DTColumnBuilder.newColumn(null).withTitle('Outreach Status').withOption('width', '30%').renderWith(function(data, type, full, meta) {
               var template = '<select id=vet_' + data.ReachID + ' ng-options="item as item.StatusDesc for item in outreachStatusList" ng-change="UpdateOutreachStatus(OutreachMap['+data.ReachID+'])" ng-model="OutreachMap['+data.ReachID+']"></select>';
               var hiddenSpan = "<span id='Outreach_" + data.ReachID + "' hidden>"+ data.OutreachStatus +"</span> "
               return hiddenSpan + template;
            })
        ];
     
        $scope.UpdateOutreachStatus = function(selected){
          var commonData = $scope.widget.dataModelOptions.common;
          var ReachId = commonData.data.veteranObj.ReachID;
          var OutReachStatusID = selected.OutReachStatusID;
          $scope.widget.dataModel.saveOutreachData(OutReachStatusID,ReachId,commonData.data.facilitySelected.facility);
        }

        $scope.rowClickHandler= function(info) {
          if($scope.common.data.EnterDataIsUnsaved == true){
              $(".unsavedDataAlert").fadeIn();
              return;
          }

          var selectedRow = $("#tblPatient tr:contains('"+info.SSN+"')");
          if(selectedRow.hasClass('selected'))
          {
            return;
          } 
          else
          {
            $('#tblPatient tr.selected').removeClass('selected');
            selectedRow.addClass('selected');
            var commonData = $scope.widget.dataModelOptions.common;
            var vetId = info.ReachID;
            var obj = jQuery.grep($scope.patientList, function( n, i ) {
              return ( n.ReachID == vetId );
            });
            commonData.data.veteranObj = obj[0];
            console.log("CommonDataAfterClick: ", commonData);
            // broadcast message throughout system
            $scope.$parent.$parent.$parent.$broadcast('commonDataChanged', commonData);

          }

        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
          $('td', nRow).unbind('click');
          $('td', nRow).bind('click', function() {
              $scope.$apply(function() {
                  $scope.rowClickHandler(aData);
              });
          });
          return nRow;
        }

      },
      link: function postLink(scope, element, attr) {
        scope.$on("updateSelectMenu", function (){
          var datamodelList = {};
          var patientList = scope.widgetData[1];          	 	  
    		  $($('#patientRosterDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
    				$(this).attr('scope','col');
            $(this).attr('tabindex','-1');
          });
			
		      $('#tblPatient_info').attr('title','Patient Table: Tab to move to the next control');
    
          $('#patientRosterDiv .dataTables_scrollHeadInner,#patientRosterDiv .dataTables_scrollHeadInner table').css({'width':''});   
          var containerHeight = parseInt($('#patientRosterDiv').parent().css('height'),10);
          $('#patientRosterDiv .dataTables_scrollBody').css('height',.78 * containerHeight);    
		  
    		  $('#tblPatient tbody>tr select').keydown(function(event){ 
            if (event.keyCode == '13' || event.key == 'Enter') {
              $(this).closest('tr').click();
              return false; 
            } 
            if (event.keyCode == '27' || event.key == 'Cancel') {
              $('#tblPatient_info').focus();
              $('#tblPatient_info').tooltip().mouseover();
              return false; 
            } 		  
          });

        });
        scope.$watch('widgetData', function(v){  
          if(v != null && v.length >0){
            scope.outreachStatusList = scope.widgetData[2];
            scope.patientList = scope.widgetData[1];

            var outreachStatus = scope.outreachStatusList;
            var patientsBysta3N = scope.patientList;

            scope.patientList.map(function(obj){
              scope.OutreachMap[obj.ReachID] = obj.OutreachStatus != null ?  $.grep(scope.outreachStatusList,function(e){
                                                                                      return e.OutReachStatusID == obj.OutreachStatus
                                                                                    })[0] : null;

          });
  
            scope.patientList = patientsBysta3N;
            var promise = new Promise( function(resolve, reject){
                  if (scope.patientList)
                    resolve(scope.patientList);
                  else
                    resolve([]);
                });
            scope.dtInstance.changeData(function() {
                  return promise;
              });
            
            $timeout(function(){
              $.fn.dataTable.ext.errMode = 'throw';
              scope.$emit('updateSelectMenu'); 
              var commonData = scope.widget.dataModelOptions.common;
              if(!commonData.data.veteranObj)
              {
                $($('#tblPatient').find( "td" )[1]).click()
              }
              else
              {
                $('#tblPatient').find( "tbody>tr td:contains('"+commonData.data.veteranObj.Name+"')" ).click();
              }
            },500)            
          }
        });
      }
    };
  });