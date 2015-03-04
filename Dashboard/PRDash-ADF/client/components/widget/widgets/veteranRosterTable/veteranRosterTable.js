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
      link: function postLink(scope, element, attr) {
        var unwatch = scope.$watch('widgetData', function(v){
          console.log("inside veteran roster directive before check");
          console.log(v);
            if(v != null && v.length >0){
                unwatch();
                console.log("inside veteran roster directive after check is positive");
                console.log(scope.widgetData);
                var dataTableVet = $(element).children().dataTable( {
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
                        dataTableVet.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        //scope.hideVetDetBtn = false;
                        //$('#veteranView').show();
                        //$('#facilityInfo').hide();
                        //scope.getVeteran(event.currentTarget.cells[4].innerText);
                    }
                    scope.$apply();
                    console.log(event.currentTarget.cells[4].innerText);
                } );
            }
            
        });
      }
    };
  });