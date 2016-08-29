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
      
      controller: function ($scope, $compile, $filter, $http, $modal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder,FileSaver) {
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
            .withDOM('frtip')
            .withButtons([
                {
                  text: '<a name="PatientExport" class="glyphicon glyphicon-export"></a>',
                  action: function (e, dt, node, config) {
                      JSONToCSVConvertor($scope.patientList,'PatientRoster');
                  }
                }
            ])
            .withScroller()
            .withOption('deferRender', true)
            // Do not forget to add the scrollY option!!!
            .withOption('scrollY', 200)
            .withOption('scrollX', '100%')
            .withOption('bDestroy',true)
            .withOption('aaSorting', [
                [3, 'desc']
            ])
            .withLanguage({
              "sInfo": "Total Records: _TOTAL_"
            });

         function JSONToCSVConvertor(JSONData,title) {
            var exportHeaders = ['ReachID','FirstName','LastName','SSN','HomePhone','DateIdentifiedAsAtRisk','RiskLevel','CurrentStatus']
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            var d = new Date();

            var month = d.getMonth()+1;
            var day = d.getDate();
            var time = d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
            var fileDateTime = d.getFullYear() +
            (month<10 ? '0' : '') + month +
            (day<10 ? '0' : '') + day + "_" + time;
            var CSV = '';
            
            //Headers
            var row = "";
            for (var index in arrData[0]) {
              if($.inArray(index, exportHeaders) > 0)
              {
                row += index + ',';
              }
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
            
            //Rows-Data
            for (var i = 0; i < arrData.length; i++) {
                var row = "";
                for (var index in arrData[i]) {
                    if($.inArray(index, exportHeaders) > 0)
                    {
                      if(index === 'OutreachStatus')
                      {
                        var arrValue = arrData[i][index] == null ? "" : $filter('filter')($scope.outreachStatusList, {OutReachStatusID: 
                                                                                          parseInt(arrData[i][index]) })[0].StatusDesc;  
                      }
                      else
                      {
                        var arrValue = arrData[i][index] == null ? "" : arrData[i][index];  
                      }
                      row += arrValue + ',';
                    }
                }
                row.slice(0, row.length - 1);
                CSV += row + '\r\n';
            }
            
            var blob = new Blob([CSV], { type: "text/csv;charset=utf-8" });
            var user = JSON.parse(sessionStorage.user);
            var logMessage = 'User - ' + user.UserName;
            var params = {
              action:'Patient Roster Export'
            }

            $http.post('/api/audit',params)
            .success(function(data) {
               FileSaver.saveAs(blob, "PatientRoster_" + fileDateTime + ".csv");
            });
           
        };

        $scope.dtColumns = [
            DTColumnBuilder.newColumn('Name').withTitle('Name'),
            DTColumnBuilder.newColumn('SSN').withTitle('SSN'),
            DTColumnBuilder.newColumn('HomePhone').withTitle('Phone'),
            DTColumnBuilder.newColumn('DateIdentifiedAsAtRisk').withTitle('Date First Identified'),
            DTColumnBuilder.newColumn('RiskLevel').withTitle('Statistical Risk Level'),
            DTColumnBuilder.newColumn('CurrentStatus').withTitle('Outreach Status').withOption('width', '10%').notSortable().renderWith(function(data, type, full, meta) {
               var data1 = data.split('|')[0]
               var data2 = data.split('|')[1]
               var template = '<div>' + data1 + '</div><br/><div>'+data2+'</div>';
               return  template;
            })
        ];

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
            commonData.data.patientRosterScrollPos = $('#patientRosterDiv .dataTables_scrollBody').scrollTop();;
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

        $scope.removePatient =  function(){
          $modal.open({
            scope: $scope,
            templateUrl: 'client/components/widget/widgets/patientTable/removePatientModal.html',
            controller: 'RemovePatientCtrl',
            backdrop  : 'static',
            keyboard  : false,
            resolve: {
                params: function() {
                    return {
                      veteranObj: $scope.widget.dataModelOptions.common.data.veteranObj
                    };
                }
            }
          });
        }

        $scope.resizeWidgetDataArea = function(){
          var containerHeight = parseInt($('#patientRosterDiv').parent().css('height'),10);
          $('#patientRosterDiv').find('.dataTables_scrollBody').css('height',.5 * containerHeight);
        } 

      },
      link: function postLink(scope, element, attr) {
        scope.$on("gridsterResized", function (){
            $timeout(function(){
              scope.resizeWidgetDataArea();
            },1000);
        });

        scope.$on("updateSelectMenu", function (){
          var datamodelList = {};
          var patientList = scope.widgetData[1];          	 	  
    		  $($('#patientRosterDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
    				$(this).attr('scope','col');
            $(this).attr('tabindex','-1');
          });

          $('#patientRosterDiv .dt-buttons').attr('title','Patient Roster-Export to Excel')
			
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
                $('#patientRosterDiv .dataTables_scrollBody').scrollTop(commonData.data.patientRosterScrollPos);
                $timeout(function() {
                  $('#tblPatient').find( "tbody>tr td:contains('"+commonData.data.veteranObj.Name+"')" ).click();
                }, 500);
              }

              scope.resizeWidgetDataArea();
               
            },500)            
          }
        });
      }
    };
  });