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
        $scope.hrIndex = 0;
        $scope.hrSpanIndex = 0;
        $scope.hrText = '';

        $scope.hrIndexChange = function(value) {
          console.log('hrIndex:',$scope.hrIndex);
          $scope.enterWdgtForm.highRiskTxt.$setPristine();
          if ($scope.hrIndex > $scope.data.HighRisk_UserNotes.length-1) {
            $scope.hrIndex = $scope.data.HighRisk_UserNotes.length-1;
          } else if ($scope.hrIndex < 0 || !angular.isNumber($scope.hrIndex)) {
            $scope.hrIndex = 0;
          }
          $scope.hrText = $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes;
        }

        $scope.goHrBack = function() {
          if ($scope.hrIndex < $scope.data.HighRisk_UserNotes.length-1) {
            $scope.enterWdgtForm.highRiskTxt.$setPristine();
            $scope.hrIndex+=1;
            $scope.hrText = $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes;
          }
        };
        $scope.goHrForward = function() {
          if ($scope.hrIndex !== 0) {
            $scope.enterWdgtForm.highRiskTxt.$setPristine();
            $scope.hrIndex-=1;
            $scope.hrText = $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes;           
          }
        };

        $scope.goHrSpanBack = function() {
          if ($scope.hrSpanIndex < $scope.data.HighRisk_SPANImport.length-1) {
            $scope.hrSpanIndex+=1;
          }
        };

        $scope.goHrSpanForward = function() {
          if ($scope.hrSpanIndex !== 0) {
            $scope.hrSpanIndex-=1;
          }
        };
       
        $scope.addNewData = function() {
            var UpdatedHR_UserNotes = {isNew: false};
            var UpdatedMH_UserNotes = {isNew:  false};
            var UpdatedSP_UserNotes = {isNew: false};
            var UpdatedGC_UserNotes = {isNew: false};
            var addDate = new Date().toLocaleDateString();

            if ($scope.hrText != $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes)
            {
               UpdatedHR_UserNotes = {
                  entry: $scope.hrText,
                  date: addDate,
                  isNew: true
                }
                // var addHrTextLocal = {};
                // addHrTextLocal.EntryDate = addDate;
                // addHrTextLocal.UserNotes = $scope.hrText;
                // console.log('HighRisk BeforeUnshift: ',$scope.data.HighRisk_UserNotes);
                // $scope.data.HighRisk_UserNotes.unshift(addHrTextLocal);
                // console.log('HighRisk AfterUnshift: ',$scope.data.HighRisk_UserNotes);
                // $scope.hrIndex = 0
                // $scope.hrIndexChange($scope.hrIndex);
            }

          $scope.widget.dataModel.saveNewUserData({
                                                    hrUserNotes: UpdatedHR_UserNotes,
                                                    mhUserNotes: UpdatedMH_UserNotes,
                                                    spUserNotes: UpdatedSP_UserNotes,
                                                    gcUserNotes: UpdatedGC_UserNotes
                                                  });
          }

          $scope.init = function() {
            // Initialize Textarea
          }


      },
      link: function postLink(scope, element, attr) {
        scope.$watch('widgetData', function(data){
          scope.data = data;

          //Initialize control values
          if(scope.data.HighRisk_UserNotes)
          {
            scope.hrText = scope.data.HighRisk_UserNotes[scope.hrIndex].UserNotes;
          }
        });
      }
    }
  });
