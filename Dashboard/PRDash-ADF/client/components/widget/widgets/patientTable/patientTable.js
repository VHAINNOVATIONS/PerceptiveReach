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
      
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder, DTInstances) {
        //console.log("inside patient roster controller");
        //console.log($scope.widgetData);
        $scope.dtinstance = DTInstances;
        $scope.patientList = $scope.widgetData;
        //console.log("dtoptionsbuilder, dtcolumnsdefbuilder, dtinstances");
        //console.log(DTOptionsBuilder);
        //console.log(DTColumnDefBuilder);
        //console.log(DTInstances);
        $scope.dtOptions = DTOptionsBuilder.newOptions()//.fromSource($scope.widgetData)
            .withDOM('lfrti')
            .withScroller()
            .withOption('deferRender', true)
            // Do not forget to add the scorllY option!!!
            .withOption('scrollY', 200)
            .withOption('paging',false);
        $scope.dtColumns = [
          DTColumnDefBuilder.newColumnDef(0),
          DTColumnDefBuilder.newColumnDef(1),
          DTColumnDefBuilder.newColumnDef(2),
          DTColumnDefBuilder.newColumnDef(3),
          DTColumnDefBuilder.newColumnDef(4),
          DTColumnDefBuilder.newColumnDef(5)
            /*DTColumnBuilder.newColumn('Name').withTitle('Name'),
            DTColumnBuilder.newColumn('SSN').withTitle('SSN'),
            DTColumnBuilder.newColumn('Phone').withTitle('Phone'),
            DTColumnBuilder.newColumn('DateIdentifiedRisk').withTitle('Date First Identified'),
            DTColumnBuilder.newColumn('RiskLevel').withTitle('Statistical Risk Level'),
            DTColumnBuilder.newColumn('OutreachStatus').withTitle('Outreach Status')*/
        ];
        //console.log("dtoptions:  ");
        //console.log($scope.dtOptions);
        //console.log("dtcolumns:  ");
        //console.log($scope.dtColumns);
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
        //console.log("scope::");
        //console.log("patientTable widgetScope", scope);
        
        scope.$on("updateSelectMenu", function (){
          console.log("--inside updateSelectMenu--");
          //scope.$apply();
          //scope.dtInstance = dtInstance;
          //while($('#vet_').length < 1){} 
          //console.log("before select menu");
          var datamodelList = {};
          var patientList = scope.widgetData[1];

          for(patient in scope.patientList){
            //console.log('#vet_' + scope.patientList[patient].ReachID);
            var reachID = scope.patientList[patient].ReachID;
            datamodelList[scope.patientList[patient].ReachID] = scope.patientList[patient]; 
            $('#vet_' + reachID).val(scope.patientList[patient].OutreachStatus);
            //console.log('#vet_' + reachID,$('#vet_' + reachID).val());
            $('#vet_' + reachID).selectmenu({
              select: function( event, ui ) {
                // Write back selection to the patient Risk table for the patient
                //console.log(ui);
                //console.log(ui.item.element.context.parentElement.id.replace("vet_",""));
                scope.widget.dataModel.saveOutreachData(ui.item.index, ui.item.element.context.parentElement.id.replace("vet_",""));                    
              }
            });
            //datamodelList[scope.patientList[patient].ReachID] = scope.patientList[patient].OutreachStatus; 
          }
          
          $('#sampleVet tbody').on( 'click', 'tr', function (event) {
            //console.log( dataTableVet.row( this ).data() );
            if($(this).hasClass('selected')){
                //$(this).removeClass('selected'); // removes selected highlighting
                //scope.hideVetDetBtn = true;
                //$('#patientView').hide();
                //$('#facilityInfo').show();
            }
            else{
              $('tr.selected').removeClass('selected');
              $(this).addClass('selected');
              // get common data object
              var commonData = scope.widget.dataModelOptions.common;
              console.log("CommonDataBeforeClick: ", commonData);
              // update common data object with new patient object
              console.log("ReachID Vet Selected: ", event.currentTarget.cells[5].firstElementChild.id.replace("vet_",""));
              commonData.data.veteranObj = datamodelList[event.currentTarget.cells[5].firstElementChild.id.replace("vet_","")];
              console.log("CommonDataAfterClick: ", commonData);
              // broadcast message throughout system
              scope.$parent.$broadcast('commonDataChanged', commonData);
              //scope.hideVetDetBtn = false;
              //$('#patientView').show();
              //$('#facilityInfo').hide();
              //scope.getpatient(event.currentTarget.cells[4].innerText);
            }
            scope.$apply();
            //console.log("ReachID selected: " + event.currentTarget.cells[5].firstElementChild.id.replace("vet_",""));//innerText);
            //console.log(event);
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
        //var spinner = new Spinner(opts).spin($("#spinner"));

          //console.log("inside patient roster directive before check");
          //console.log("logg v:",v); 
          
          //console.log(DTOptionsBuilder);
        if(v != null && v.length >0){
            //unwatch();
            //console.log("--inside watch for roster-");                
            //console.log("inside patient roster directive after check is positive");
            //console.log(scope.widgetData);
            //scope.dtInstance.changeData(scope.widgetData[1]);
            scope.outreachStatusList = scope.widgetData[2];
            scope.patientList = scope.widgetData[1];
            
            /*for(var patient in scope.patientList){
              datamodelList[scope.patientList[patient].ReachID] = scope.patientList[patient]; 
            }*/
            //scope.dataModelObj = datamodelList;
            //console.log("datamodelobj:::");
            //console.log(scope.dataModelObj);
            //var dataTableVet = $(element).children(); scope.$apply();
            //dataTableVet.dataTable();
            /*var dataTableVet = $(element).children().dataTable( {
                "data": scope.widgetData[1],
                "scrollY":        "200px",
                "scrollCollapse": true,
                "paging":         false,
                "columns": [
                    { "title": "Name" },
                    { "title": "SSN" },
                    { "title": "Phone" },
                    { "title": "Date First identified", "class": "center" },
                    { "title": "Statistical Risk Level", "class": "center" },
                    { "title": "Outreach Status", "class": "center" }
                    //{ "title": "Last VA Clinician Visit", "class": "center" }
                ],
                dom: 'T<"clear">lfrtip',
                tableTools: {
                    "sRowSelect": "single"
                }
            });*/
            /*scope.dtinstance.getLast().then(function(dtInstance) {
              
            });*/
            //scope.$apply();
            $timeout(function(){
              scope.$emit('updateSelectMenu');  
            })            
          }
        });
      }
    };
  });