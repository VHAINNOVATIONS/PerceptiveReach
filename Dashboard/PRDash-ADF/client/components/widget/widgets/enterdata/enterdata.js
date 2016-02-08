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
        $scope.y = 0;
        $scope.z = 0;
        $scope.a = 0;
        $scope.b = 0;
        $scope.c = 0;

  $scope.HighRiskBack = function() {
    $('#hrData').removeClass('hrDirty');
    if($scope.x + 1 <= $scope.data.HighRisk_UserNotes.length - 1)
    {
        $scope.x += 1;
    }
     $('#hrData').val($scope.data.HighRisk_UserNotes[$scope.x].UserNotes);
  };
  $scope.goForwardRisk = function() {
   $('#hrData').removeClass('hrDirty');
   if($scope.x - 1 >= 0)
   {
     $scope.x -=   1;
   }
   $('#hrData').val($scope.data.HighRisk_UserNotes[$scope.x].UserNotes);

   };
  $scope.goBackProvider = function() {
    $('#hrData').css('border-color','');
    if($scope.c + 1 <= $scope.data.HighRisk_SPANImport.length - 1)
    {
         $scope.c += 1;
    }
     $('#soData').val($scope.data.HighRisk_SPANImport[$scope.c].HighRisk);
  };

  $scope.goForwardProvider = function() {
    if($scope.c - 1 >= 0)
    {
      $scope.c -=   1;
    }
    $('#soData').val($scope.data.HighRisk_SPANImport[$scope.c].HighRisk);
  };

  $scope.goBackSOR = function() {

    if($scope.z + 1 <= $scope.data.PrimaryHealthProvider_UserNotes.length - 1)
    {
         $scope.z += 1;
    }
     $('#mhData').val($scope.data.PrimaryHealthProvider_UserNotes[$scope.z].UserNotes);
  };

  $scope.goForwardSOR = function() {
    if($scope.z - 1 >= 0)
    {
      $scope.z -=   1;
    }
    $('#mhData').val($scope.data.PrimaryHealthProvider_UserNotes[$scope.z].UserNotes);

  };
  $scope.goBackSafety = function() {

    if($scope.a + 1 <= $scope.data.SafetyPlan_UserNotes.length - 1)
    {
         $scope.a += 1;
    }
     $('#spData').val($scope.data.SafetyPlan_UserNotes[$scope.a].UserNotes);
  };

  $scope.goForwardSafety = function() {
    if($scope.a - 1 >= 0)
    {
      $scope.a -=   1;
    }
    $('#spData').val($scope.data.SafetyPlan_UserNotes[$scope.a].UserNotes);

  };
  $scope.goBackMHP = function() {
    if($scope.b + 1 <= $scope.data.SafetyPlan_SPANImport.length - 1)
    {
         $scope.b += 1;
    }
     $('#spsorData').val($scope.data.SafetyPlan_SPANImport[$scope.b].SafetyPlanCurrent);
  };

  $scope.goForwardMHP = function() {
    if($scope.b + 1 <= $scope.data.SafetyPlan_SPANImport.length - 1)
    {
         $scope.b += 1;
    }
    $('#spsorData').val($scope.data.SafetyPlan_SPANImport[$scope.b].SafetyPlanCurrent);

  };
  $scope.goBack = function() {
    if($scope.y + 1 <= $scope.data.GeneralComments.length - 1)
    {
         $scope.y += 1;
    }
     $('#comment').val($scope.data.GeneralComments[$scope.y].Comment);
  };
  $scope.goForward = function() {
    if($scope.y + 1 <= $scope.data.GeneralComments.length - 1)
    {
         $scope.y += 1;
    }
    $('#comment').val($scope.data.GeneralComments[$scope.y].Comment);

  };

  $scope.NewHRDataAdded = function(){
    $('#hrData').removeClass('hrDirty');
    if($.trim( $('#hrData').val()).length > 1)
    {
      $('#hrData').addClass('hrDirty');
    }
  };

  $scope.comment = [{
    value: "Individual arrested for disorderly contact and public intoxication.  Sister caring for individual and bringing him to appointments.",
    date: "10-01-2015"
  }, {
    value: "This is the second comment",
    date: "10-01-2015"
  }, {
    value: "This is the third comment",
    date: "10-01-2015"
  }, {
    value: "This is the 4 comment",
    date: "10-01-2015"
  }, {
    value: "This is the 5 comment",
    date: "10-01-2015"
  }];
  $scope.dataEntry = [{
    entry: "High Risk Flag set to \"Yes\" on 12/15/2015",
    date: "01-01-2016"
  }, {
    entry: "High Risk Flag set to \"No\" on 12/15/2013",
    date: "12-01-2015"
  }, {
    entry: "High Risk Flag set to \"Yes\" on 12/15/2010",
    date: "11-01-2015"
  }];

  $scope.sorData = [{
    entry: "High Risk Flag: No",
    date: "1st Identified as High Risk: 03-02-2001",
    newdate: "Last Updated: 02-03-2004"
  }];
  $scope.healthEntry = [{
    entry: "John Winters is primary MH provider",
    date: "01-01-2016"
  }, {
    entry: "Robin Williams is primary MH provider",
    date: "12-01-2014"
  }, {
    entry: "Robert Hope is primary MH provider",
    date: "11-01-2013"
  }];

  $scope.providerData = [{
    entry: "No Data Available",
  }];

  $scope.safetyEntry = [{
    entry: "Safety Plan established on 12/29/2015",
    date: "01-01-2016"
  }, {
    entry: "Safety Plan established on 12/29/2013",
    date: "12-01-2015"
  }, {
    entry: "Safety Plan established on 12/29/2012",
    date: "11-01-2015"
  }];

  $scope.planData = [{
    entry: "Safety Plan: No",
    date: "Date Completed: N/A"
    }];

          $scope.items = ['Item 1', 'Item 2', 'Item 3'];

          $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
          };


           $scope.myNewData = '';

            $scope.overwrite = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.myData = ' ';
            };

        $scope.addNewData = function() {

            if($('#hrData').hasClass('hrDirty'))
            {
               $scope.data.HighRisk_UserNotes.unshift({
                  entry: $('#hrData').val(),
                  date: new Date().toLocaleDateString()
                })
            }

            if ($scope.hrData) {
              $scope.dataEntry.unshift({
                entry: $scope.hrData,
                date: "01-08-2016"
              })
              $scope.hrData = '';
            }
            if ($scope.mhData) {
              $scope.healthEntry.unshift({
                entry: $scope.mhData,
                date: "01-08-2016"
              })
              $scope.mhData = '';
            }
            if ($scope.spData) {
              $scope.safetyEntry.unshift({
                entry: $scope.spData,
                date: "01-08-2016"
              })
              $scope.spData = '';
            }
            if ($scope.soData) {
              $scope.sorData.unshift({
                entry: $scope.soData,
                date: "01-08-2016"
              })
              $scope.soData = '';
            }
            if ($scope.spsorData) {
              $scope.sorspData.unshift({
                entry: $scope.soData,
                date: "01-08-2016"
              })
              $scope.spsoData = '';
            }
             if ($scope.mpData) {
              $scope.planData.unshift({
                entry: $scope.mpData,
                date: "01-08-2016"
              })
              $scope.mpData = '';
            }
            if ($scope.currentComment != $scope.comment[$scope.x].value) {
              $scope.comment.unshift({
                value: $scope.currentComment,
                date: "01-08-2016"
              })
              $scope.currentComment = $scope.comment[0].value;
            }
            if ($scope.currentRisk != $scope.dataEntry[$scope.x].entry) {
              $scope.dataEntry.unshift({
                entry: $scope.currentRisk,
                date: "01-08-2016"
              })
              $scope.currentRisk = $scope.dataEntry[$scope.x].entry;
            }
            if ($scope.currentProvider != $scope.healthEntry[$scope.x].entry) {
              $scope.healthEntry.unshift({
                entry: $scope.currentProvider,
                date: "01-08-2016"
              })
              $scope.currentProvider = $scope.healthEntry[$scope.x].entry;
            }
            if ($scope.currentSafety != $scope.safetyEntry[$scope.x].entry) {
              $scope.safetyEntry.unshift({
                entry: $scope.currentSafety,
                date: "01-08-2016"
              })
              $scope.currentSafety = $scope.safetyEntry[$scope.x].entry;
            }
             if ($scope.currentProviderRecords != $scope.providerData[$scope.x].entry) {
              $scope.providerData.unshift({
                entry: $scope.currentProviderRecords,
                date: "01-08-2016"
              })
              $scope.currentProviderRecords = $scope.providerData[$scope.x].entry;
            }


  }

  $scope.currentComment = $scope.comment[$scope.x].value;
  $scope.currentRisk = $scope.dataEntry[$scope.x].entry;
  $scope.currentProvider = $scope.healthEntry[$scope.x].entry;
  $scope.currentSafety = $scope.safetyEntry[$scope.x].entry;
   $scope.currentProviderRecords = $scope.providerData[$scope.x].entry;

          },
      link: function postLink(scope, element, attr) {
        scope.$watch('widgetData', function(data){
          scope.data = data;
        });

        $('#jumpToHR').on('keydown', function(e){
              var code = (e.keyCode? e.keyCode: e.which)
              if(code==13)
              {
                var userValue = parseInt($('#jumpToHR').val());
                var maxValue = scope.data.HighRisk_UserNotes.length;
                if(userValue > maxValue)
                {
                  scope.x = maxValue;
                  $('#hrData').val(scope.data.HighRisk_UserNotes[maxValue - 1].UserNotes);
                  $('#jumpToHR').val(scope.x);
                }
                else {
                  scope.x = userValue;
                  $('#hrData').val(scope.data.HighRisk_UserNotes[userValue - 1].UserNotes);
                }
              }
        });
        $('#nextNew').on('keydown', function(e){
              var code = (e.keyCode? e.keyCode: e.which)
              if(code==13)
              {
                var userValue = parseInt($('#nextNew').val());
                var maxValue = scope.data.HighRisk_SPANImport.length;
                if(userValue > maxValue)
                {
                  scope.x = maxValue;
                  $('#soData').val(scope.data.HighRisk_SPANImport[maxValue - 1].HighRisk);
                  $('#nextNew').val(scope.x);
                }
                else {
                  scope.x = userValue;
                  $('#soData').val(scope.data.HighRisk_SPANImport[userValue - 1].HighRisk);
                }
              }
        });
        $('#goToSafety').on('keydown', function(e){
              var code = (e.keyCode? e.keyCode: e.which)
              if(code==13)
              {
                var userValue = parseInt($('#goToSafety').val());
                var maxValue = scope.data.SafetyPlan_UserNotes.length;
                if(userValue > maxValue)
                {
                  scope.x = maxValue;
                  $('#spData').val(scope.data.SafetyPlan_UserNotes[maxValue - 1].UserNotes);
                  $('#goToSafety').val(scope.x);
                }
                else {
                  scope.x = userValue;
                  $('#spData').val(scope.data.SafetyPlan_UserNotes[userValue - 1].UserNotes);
                }
              }
        });
        $('#commentAhead').on('keydown', function(e){
              var code = (e.keyCode? e.keyCode: e.which)
              if(code==13)
              {
                var userValue = parseInt($('#commentAhead').val());
                var maxValue = scope.data.GeneralComments.length;
                if(userValue > maxValue)
                {
                  scope.x = maxValue;
                  $('#comment').val(scope.data.GeneralComments[maxValue - 1].Comment);
                  $('#commentAhead').val(scope.x);
                }
                else {
                  scope.x = userValue;
                  $('#comment').val(scope.data.GeneralComments[userValue - 1].Comment);
                }
              }
        });
        $('#safetyPlanGo').on('keydown', function(e){
              var code = (e.keyCode? e.keyCode: e.which)
              if(code==13)
              {
                var userValue = parseInt($('#safetyPlanGo').val());
                var maxValue = scope.data.SafetyPlan_SPANImport.length;
                if(userValue > maxValue)
                {
                  scope.x = maxValue;
                  $('#spsorData').val(scope.data.SafetyPlan_SPANImport[maxValue - 1].SafetyPlanCurrent);
                  $('#safetyPlanGo').val(scope.x);
                }
                else {
                  scope.x = userValue;
                  $('#spsorData').val(scope.data.SafetyPlan_SPANImport[userValue - 1].SafetyPlanCurrent);
                }
              }
        });
spsorData
      }
    }
  });
