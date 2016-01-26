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
  .directive('wtEnterData', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/enterdata/enterdata.html', 
      controller: function ($scope) {
        $scope.x = 0;
        $scope.oneAtATime = false;
        $scope.yesOpen = false;
        $scope.isOpen= true;
        $scope.isCollapsed = true;
        $scope.isCollapsed1 = true;
        $scope.isCollapsed2 = true;
        $scope.isCollapsed3 = true;
        $scope.isCollapsed4 = true;
        $scope.isCollapsed5 = true;

        $scope.goBack= function() {
            $scope.currentComment = $scope.comment[$scope.x+1].value;
            $scope.x+=1;
        };
        $scope.goForward= function(){
            $scope.currentComment = $scope.comment[$scope.x-1].value;
            $scope.x-=1;
        };
        $scope.goBackRisk= function() {
            $scope.currentRisk = $scope.com[$scope.x+1].value;
            $scope.x+=1;
        };
        $scope.goForwardRisk= function(){
            $scope.currentRisk = $scope.com[$scope.x-1].value;
            $scope.x-=1;
        };

         $scope.comment= [
            {
             value: "This is the first comment",
             date: "10-01-2015"
            },
            {
             value: "This is the second comment",
             date: "10-01-2015"
            },
            {
             value: "This is the third comment",
             date: "10-01-2015"
            },
            {
             value: "This is the 4 comment",
             date: "10-01-2015"
            },
            {
             value: "This is the 5 comment",
             date: "10-01-2015"
            }
          ];
         $scope.dataEntry = [
              {
               entry: "1.High Risk Flag Added",
               date: "01-01-2016"
              },
              {
               entry: "2.High Risk Flag Removed",
               date: "12-01-2015"
              },
              {
               entry: "3.High Risk Flag Cleared",
               date: "11-01-2015"
              },
              {
               entry: "4.High Risk Flag Added",
               date: "11-01-2015"
              }
            ];
            
          $scope.sorData = [
            {
             entry: "1.High Risk Flag ",
             date: "Date Initiated: 03-02-2001",
             newdate: "Date Cleared: 02-03-2004"
            },
            {
             entry: "2.High Risk Flag",
             date: "Date Initiated: 03-02-2001",
             newdate: "Date Cleared: 02-03-2004"
            },
            {
             entry: "3.High Risk Flag ",
             date: "Date Initiated: 03-02-2001",
             newdate: "Date Cleared: 02-03-2004"
            }
          ];
          $scope.healthEntry = [
              {
               entry: "1.George Doe, PhD",
               date: "01-01-2016"
              },
              {
               entry: "2.John Smith, MD",
               date: "12-01-2015"
              },
              {
               entry: "3.Charlie Brown, DPT",
               date: "11-01-2015"
              }
            ];
            
          $scope.providerData = [
            {
             entry: "1.John Doe M.D.",
             date: "10-01-2015"
            },
            {
             entry: "2.Charlie Brown, DPT",
             date: "10-01-2015"
            }, 
            {
             entry: "3.Bill Brown, DPT",
             date: "10-01-2015"
            }
          ];
          
          $scope.safetyEntry = [
              {
               entry: "1.Safety Plan Updated",
               date: "01-01-2016"
              },
              {
               entry: "2.Safety Plan Removed",
               date: "12-01-2015"
              },
              {
               entry: "3.Safety Plan Cleared",
               date: "11-01-2015"
              }
            ];
            
          $scope.planData = [
            {
             entry: "1.Safety Plan",
            date: "Date Completed: 06-07-2008",
            },
            {
              entry: "2.Safety Plan",
            date: "Date Completed: 06-07-2008",
            },
            {
              entry: "3.Safety Plan",
            date: "Date Completed: 06-07-2008",
            }
          ];
          
          $scope.items = ['Item 1', 'Item 2', 'Item 3'];

          $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
          };

          $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
          };
           $scope.myNewData = '';
            
            $scope.overwrite = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                
                $scope.myData = ' ';
            };
            
            $scope.addHRData = function() {
              if ($scope.hrData) {
                $scope.dataEntry.unshift({entry: $scope.hrData, date: "01-08-2016"}) 
             $scope.hrData= $scope.dataEntry[$scope.x].entry;
              
              }
              if ($scope.mhData) {
                $scope.healthEntry.unshift({entry: $scope.mhData, date: "01-08-2016"})
                $scope.mhData= $scope.healthEntry[$scope.x].entry;
              }
              if ($scope.spData) {
                $scope.safetyEntry.unshift({entry: $scope.spData, date: "01-08-2016"})
                $scope.spData= $scope.safetyEntry[$scope.x].entry; 
              }
              if ($scope.currentComment != $scope.comment[$scope.x].value) {
                $scope.comment.unshift({value: $scope.currentComment, date: "01-08-2016"}) 
                $scope.currentComment= $scope.comment[0].value;
              }
            }
            
            $scope.currentComment = $scope.comment[$scope.x].value;
            $scope.hrData =$scope.dataEntry[$scope.x].entry;
            $scope.mhData = $scope.healthEntry[$scope.x].entry;
            $scope.spData = $scope.safetyEntry[$scope.x].entry;            
          },
          link: function postLink(scope, element, attr) {
            scope.$watch('widgetData', function(data){
              var test = data;
            });

          }
        }
  });
