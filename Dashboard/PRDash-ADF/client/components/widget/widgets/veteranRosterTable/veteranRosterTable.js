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
  .directive('wtVeteranRosterTable', function () {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/veteranRosterTable/veteranRosterTable.html',
      
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder, DTInstances, DTRendererService) {
        console.log("inside veteran roster controller");
        console.log($scope.widgetData);
        $scope.dtrender = DTRendererService;
        $scope.dtinstance = DTInstances;
        $scope.veteranList = $scope.widgetData;
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
            /*DTColumnBuilder.newColumn('Name').withTitle('Veteran Name'),
            DTColumnBuilder.newColumn('SSN').withTitle('Veteran SSN'),
            DTColumnBuilder.newColumn('Phone').withTitle('Veteran Phone'),
            DTColumnBuilder.newColumn('DateIdentifiedRisk').withTitle('Date First Identified'),
            DTColumnBuilder.newColumn('RiskLevel').withTitle('Statistical Risk Level'),
            DTColumnBuilder.newColumn('OutreachStatus').withTitle('Outreach Status')*/
        ];
        $scope.columns = [
          {"Name" : "Veteran Name"},
          {"Name" : "Veteran SSN"},
          {"Name" : "Veteran Phone"},
          {"Name" : "Date First Identified"},
          {"Name" : "Statistical Risk Level"},
          {"Name" : "Outreach Status"}
        ];
      },
      link: function postLink(scope, element, attr) {
        console.log("scope::");
        console.log(scope);
        
        //scope.dtrender.showLoading();
        scope.$watch('widget.dataModel.widgetScope.widgetData', function(v){
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
        var spinner = new Spinner(opts).spin($("#spinner"));

          console.log("inside veteran roster directive before check");
          console.log(v); 
          
          //console.log(DTOptionsBuilder);
            if(v != null && v.length >0){
                //unwatch();                
                console.log("inside veteran roster directive after check is positive");
                console.log(scope.widgetData);
                //scope.dtInstance.changeData(scope.widgetData[1]);
                scope.outreachStatusList = scope.widgetData[2];
                scope.veteranList = scope.widgetData[1];
                var datamodelList = {};
                for(veteran in scope.veteranList){
                  datamodelList[scope.veteranList[veteran].ReachID] = scope.veteranList[veteran].OutreachStatus; 
                }
                scope.dataModelObj = datamodelList;
                console.log("datamodelobj:::");
                console.log(scope.dataModelObj);
                var dataTableVet = $(element).children();
                
                /*var dataTableVet = $(element).children().dataTable( {
                    "data": scope.widgetData[1],
                    "scrollY":        "200px",
                    "scrollCollapse": true,
                    "paging":         false,
                    "columns": [
                        { "title": "Veteran Name" },
                        { "title": "Veteran SSN" },
                        { "title": "Veteran Phone" },
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

                scope.dtinstance.getLast().then(function(dtInstance) {
                  scope.dtInstance = dtInstance;
                  console.log("before select menu");
                  for(veteran in scope.veteranList){
                    //console.log('#vet_' + scope.veteranList[veteran].ReachID);
                    $('#vet_' + scope.veteranList[veteran].ReachID).val(scope.veteranList[veteran].OutreachStatus);
                    //datamodelList[scope.veteranList[veteran].ReachID] = scope.veteranList[veteran].OutreachStatus; 
                  }
                  $('select').selectmenu({
                          select: function( event, ui ) {
                            // Write back selection to the Veteran Risk table for the veteran
                            console.log(ui);
                            console.log(ui.item.element.context.parentElement.id.replace("vet_",""));
                            scope.widget.dataModel.saveOutreachData(ui.item.index, ui.item.element.context.parentElement.id.replace("vet_",""));                    
                          }
                        });
                        $('#sampleVet tbody').on( 'click', 'tr', function (event) {
                            //console.log( dataTableVet.row( this ).data() );
                            if($(this).hasClass('selected')){
                                $(this).removeClass('selected');
                                //scope.hideVetDetBtn = true;
                                //$('#veteranView').hide();
                                //$('#facilityInfo').show();
                            }
                            else{
                                $('tr.selected').removeClass('selected');
                                $(this).addClass('selected');
                                //scope.hideVetDetBtn = false;
                                //$('#veteranView').show();
                                //$('#facilityInfo').hide();
                                //scope.getVeteran(event.currentTarget.cells[4].innerText);
                            }
                            scope.$apply();
                            console.log(event.currentTarget.cells[4].innerText);
                        } );
                });

                
            }
            
        });
      }
    };
  });