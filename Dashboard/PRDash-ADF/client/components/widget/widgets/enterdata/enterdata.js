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
           //$('#hrData').html($scope.data.HighRisk_UserNotes[$scope.x].UserNotes);
        };
        $scope.goForwardRisk = function() {
         $('#hrData').removeClass('hrDirty');
         if($scope.x - 1 >= 0)
         {
           $scope.x -=   1;
         }
         //$('#hrData').html($scope.data.HighRisk_UserNotes[$scope.x].UserNotes);

         };
        $scope.goBackProvider = function() {

          if($scope.c + 1 <= $scope.data.HighRisk_SPANImport.length - 1)
          {
               $scope.c += 1;
          }
        };

        $scope.goForwardProvider = function() {
          if($scope.c - 1 >= 0)
          {
            $scope.c -=   1;
          }
        };

        $scope.goBackSOR = function() {
        $('#mhData').removeClass('mhDirty');
          if($scope.z + 1 <= $scope.data.PrimaryHealthProvider_UserNotes.length - 1)
          {
               $scope.z += 1;
          }
           $('#mhData').html($scope.data.PrimaryHealthProvider_UserNotes[$scope.z].UserNotes);
        };

        $scope.goForwardSOR = function() {
          $('#mhData').removeClass('mhDirty');
          if($scope.z - 1 >= 0)
          {
            $scope.z -=   1;
          }
          $('#mhData').html($scope.data.PrimaryHealthProvider_UserNotes[$scope.z].UserNotes);

        };
        $scope.goBackSafety = function() {

          $('#spData').removeClass('spDirty');
          if($scope.a + 1 <= $scope.data.SafetyPlan_UserNotes.length - 1)
          {
               $scope.a += 1;
          }
           $('#spData').html($scope.data.SafetyPlan_UserNotes[$scope.a].UserNotes);
        };

        $scope.goForwardSafety = function() {
          $('#spData').removeClass('spDirty');
          if($scope.a - 1 >= 0)
          {
            $scope.a -=   1;
          }
          $('#spData').html($scope.data.SafetyPlan_UserNotes[$scope.a].UserNotes);

        };
        $scope.goBackMHP = function() {
          if($scope.b + 1 <= $scope.data.SafetyPlan_SPANImport.length - 1)
          {
               $scope.b += 1;
          }
        };

        $scope.goForwardMHP = function() {
          if($scope.b + 1 <= $scope.data.SafetyPlan_SPANImport.length - 1)
          {
               $scope.b += 1;
          }
        };
        $scope.goBack = function() {

          $('#comment').removeClass('commentDirty');

          if($scope.y + 1 <= $scope.data.GeneralComments.length - 1)
          {
               $scope.y += 1;
          }
          $('#comment').html($scope.data.GeneralComments[$scope.y].Comment);
        };
        $scope.goForward = function() {
            $('#comment').removeClass('commentDirty');
          if($scope.y + 1 <= $scope.data.GeneralComments.length - 1)
          {
               $scope.y += 1;
          }
          $('#comment').html($scope.data.GeneralComments[$scope.y].Comment);
        };

        $scope.NewHRDataAdded = function(){
          $('#hrData').removeClass('hrDirty');
          if($.trim( $('#hrData').val()).length > 1)
          {
            $('#hrData').addClass('hrDirty');
          }
        };
        $scope.NewMHDataAdded = function(){
          $('#mhData').removeClass('mhDirty');
          if($.trim( $('#mhData').val()).length > 1)
          {
            $('#mhData').addClass('mhDirty');
          }
        };
        $scope.NewSPDataAdded = function(){
          $('#spData').removeClass('spDirty');
          if($.trim( $('#spData').val()).length > 1)
          {
            $('#spData').addClass('spDirty');
          }
        };
        $scope.NewCommentDataAdded = function(){
          $('#comment').removeClass('commentDirty');
          if($.trim( $('#comment').val()).length > 1)
          {
            $('#comment').addClass('commentDirty');
          }
        };

        $scope.providerData = [{
          entry: "No Data Available",
        }];

        $scope.addNewData = function() {
            var UpdatedHR_UserNotes = {isNew: false};
            var UpdatedMH_UserNotes = {isNew:  false};
            var UpdatedSP_UserNotes = {isNew: false};
            var UpdatedGC_UserNotes = {isNew: false};

            if($('#hrData').hasClass('hrDirty'))
            {
               UpdatedHR_UserNotes = {
                  entry: $('#hrData').val(),
                  date: new Date().toLocaleDateString(),
                  isNew: true
                }
            }

            if($('#mhData').hasClass('mhDirty'))
            {
              UpdatedMH_UserNotes = {
                entry: $('#mhData').val(),
                date: new Date().toLocaleDateString(),
                isNew: true
              }
            }

            if($('#spData').hasClass('spDirty'))
            {
              UpdatedSP_UserNotes = {
              entry: $('#spData').val(),
              date: new Date().toLocaleDateString(),
              isNew: true
              }
            }

            // if ($scope.soData) {
            //   $scope.sorData.unshift({
            //     entry: $scope.soData,
            //     date: "01-08-2016"
            //   })
            //   $scope.soData = '';
            // }
            // if ($scope.spsorData) {
            //   $scope.sorspData.unshift({
            //     entry: $scope.soData,
            //     date: "01-08-2016"
            //   })
            //   $scope.spsoData = '';
            // }
            //  if ($scope.mpData) {
            //   $scope.planData.unshift({
            //     entry: $scope.mpData,
            //     date: "01-08-2016"
            //   })
            //   $scope.mpData = '';
            // }

            if($('#comment').hasClass('commentDirty'))
            {
              UpdatedGC_UserNotes = {
              entry: $('#comment').val(),
              date: new Date().toLocaleDateString(),
              isNew: true
            }
          }

          $scope.widget.dataModel.saveNewUserData({
                                                    hrUserNotes: UpdatedHR_UserNotes,
                                                    mhUserNotes: UpdatedMH_UserNotes,
                                                    spUserNotes: UpdatedSP_UserNotes,
                                                    gcUserNotes: UpdatedGC_UserNotes
                                                  });
          }
      },
      link: function postLink(scope, element, attr) {
        scope.$watch('widgetData', function(data){
          scope.data = data;
          //$('#hrData').html(scope.data.HighRisk_UserNotes[scope.x].UserNotes);
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
      }
    }
  });
