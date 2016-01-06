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
      
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, DTInstances) {
        $scope.dtInstanceAbstract = DTInstances;
        $scope.dtInstance = null;
        $scope.patientList = $scope.widgetData;
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
              return new Promise( function(resolve, reject){
                if ($scope.widgetData)
                  resolve($scope.widgetData);
                else
                  resolve([]);
              });
 
          })//.fromSource($scope.widgetData) newOptions().
            .withDOM('lfrti')
            .withScroller()
            .withOption('deferRender', true)
            // Do not forget to add the scorllY option!!!
            .withOption('scrollY', 200)
            .withOption('bDestroy',true)
            .withOption('paging',false);
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('Name').withTitle('Name'),
            DTColumnBuilder.newColumn('SSN').withTitle('SSN'),
            DTColumnBuilder.newColumn('HomePhone').withTitle('Phone'),
            DTColumnBuilder.newColumn('DateIdentifiedAsAtRisk').withTitle('Date First Identified'),
            DTColumnBuilder.newColumn('RiskLevel').withTitle('Statistical Risk Level'),
            DTColumnBuilder.newColumn('OutreachStatus').withTitle('Outreach Status')
        ];
        $scope.columns = [
          {"Name" : "Name"},
          {"Name" : "SSN"},
          {"Name" : "Phone"},
          {"Name" : "Date First Identified"},
          {"Name" : "Statistical Risk Level"},
          {"Name" : "Outreach Status"}
        ];
		
      },
      link: function postLink(scope, element, attr) {
        scope.$on("updateSelectMenu", function (){
          var datamodelList = {};
          var patientList = scope.widgetData[1];          
          $( "select[id^='vet_']" ).on("change",function(e,ui){
            var selectedIndex = this.value;
            var selectedreachId = $(e.currentTarget).attr('id').replace("vet_","");
            $('#Outreach_' + selectedreachId).text(selectedIndex);
            var commonData = scope.widget.dataModelOptions.common;
            scope.widget.dataModel.saveOutreachData(parseInt(selectedIndex),selectedreachId,commonData.data.facilitySelected.facility);
          } );
		  		 	  
		  $($('#patientRosterDiv table')[0]).find('th').each(function(){
                $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
				$(this).attr('scope','col');
        $(this).attr('tabindex','-1');
            });
			
		$('#tblPatient_info').attr('title','Patient Table: Tab to move to the next control');
    
    $('#patientRosterDiv .dataTables_scrollHeadInner,#patientRosterDiv .dataTables_scrollHeadInner table').css({'width':''});       
		  
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

          $('#tblPatient tbody').on( 'click', 'tr', function (event) {
            if($(this).hasClass('selected')){
            }
            else{
              $('tr.selected').removeClass('selected');
              $(this).addClass('selected');
              // get common data object
              var commonData = scope.widget.dataModelOptions.common;
              // update common data object with new patient object
              var vetId = event.currentTarget.cells[5].children[1].id.replace("vet_","");
              var obj = jQuery.grep(scope.patientList, function( n, i ) {
                return ( n.ReachID == vetId );
              });
              console.log("ReachID Vet Selected: ",vetId);
              delete obj[0].OutreachStatus;
              commonData.data.veteranObj = obj[0];
              commonData.data.veteranObj.OutreachStatus = $('#Outreach_' + vetId).text();
              console.log("CommonDataAfterClick: ", commonData);
              // broadcast message throughout system
              scope.$parent.$parent.$parent.$broadcast('commonDataChanged', commonData);
            }
            scope.$apply();
          });  
        });
        //scope.dtrender.showLoading();
        scope.$watch('widgetData', function(v){
          var opts = {
          lines: 13, // The number of lines to draw
          length: 20, // The length of each line
          width: 10, // The line thickness
          radius: 30, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#000', // #rgb or #rrggbb or array of colors
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: '50%', // Top position relative to parent
          left: '50%' // Left position relative to parent
        };
          
        if(v != null && v.length >0){
            scope.outreachStatusList = scope.widgetData[2];
            scope.patientList = scope.widgetData[1];
            var outreachStatus = scope.outreachStatusList;
            var patientsBysta3N = scope.patientList;

            for(var patient in patientsBysta3N){
              var selected = ' selected="selected"';
              var options = "";
              var temp = "";
              for(var outreachStat in outreachStatus){
                if(patientsBysta3N[patient].OutreachStatus == outreachStatus[outreachStat].OutReachStatusID)
                  temp = "<option value=" + outreachStatus[outreachStat].OutReachStatusID + selected + ">" + outreachStatus[outreachStat].StatusDesc + "</option>";
                else{
                  temp = "<option value=" + outreachStatus[outreachStat].OutReachStatusID + ">" + outreachStatus[outreachStat].StatusDesc + "</option>";
                  //console.log("outreachStatusString: ",  temp);
                }
                options += temp;                
              }
              var select = "<select class='form-control' style='width: 180px;' id='vet_" + patientsBysta3N[patient].ReachID + "'><option value=''></option>"+ options+ "</select>";
              //patientsBysta3N[patient].OutreachStatusSelect = select;
              patientsBysta3N[patient].OutreachStatus = "<span id='Outreach_" + patientsBysta3N[patient].ReachID + "' hidden>"+ patientsBysta3N[patient].OutreachStatus +"</span> " +  select;
              
            }
            
            scope.patientList = patientsBysta3N;
            var promise = new Promise( function(resolve, reject){
                  if (scope.patientList)
                    resolve(scope.patientList);
                  else
                    resolve([]);
                });
            if(scope.dtInstance)
              scope.dtInstance.changeData(promise);
            else {
              scope.dtInstanceAbstract.getList().then(function(dtInstances){
                dtInstances.tblPatient._renderer.changeData(promise)              
              });
            }
            
            $timeout(function(){
              $.fn.dataTable.ext.errMode = 'throw';
              scope.$emit('updateSelectMenu'); 
              var commonData = scope.widget.dataModelOptions.common;
              if(!commonData.data.veteranObj)
              {
                $('#tblPatient').find( "tbody>tr:first" ).click();
              }
              else
              {
                $('#tblPatient').find( "tbody>tr td:contains('"+commonData.data.veteranObj.Name+"')" ).parent().click();
              }
            },500)            
          }
        });
      }
    };
  });