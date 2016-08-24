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
  .directive('wtEnterData', function ($timeout) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/enterdata/enterdata.html',
      controller: function ($scope) {

        $scope.noDataFound = '--No Data Available--'

        $scope.jumpTo = function(keyPress,section){
          if (keyPress.which === 13)
          {
            switch(section){
              case "hr":
                  $scope.hrIndex = parseInt($scope.hrIndex, 10); 
                  $scope.enterWdgtForm.highRiskTxt.$setPristine();
                  if ($scope.hrIndex > $scope.data.HighRisk_UserNotes.length-1) {
                    $scope.hrIndex = $scope.data.HighRisk_UserNotes.length-1;
                  } else if ($scope.hrIndex < 0 || isNaN($scope.hrIndex)) {
                    $scope.hrIndex = 0;
                  }
                  $scope.hrText = $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes;
                  break;
              case "hrspan":
                  $scope.hrSpanIndex = parseInt($scope.hrSpanIndex, 10);
                  if ($scope.hrSpanIndex > $scope.data.HighRisk_SPANImport.length-1) {
                    $scope.hrSpanIndex = $scope.data.HighRisk_SPANImport.length-1;
                  } else if ($scope.hrSpanIndex < 0 || isNaN($scope.hrSpanIndex)) {
                    $scope.hrSpanIndex = 0;
                  }
                  break;
              case "mh":
                  $scope.mhIndex = parseInt($scope.mhIndex, 10); 
                  $scope.enterWdgtForm.mentalProviderTxt.$setPristine();
                  if ($scope.mhIndex > $scope.data.PrimaryHealthProvider_UserNotes.length-1) {
                    $scope.mhIndex = $scope.data.PrimaryHealthProvider_UserNotes.length-1;
                  } else if ($scope.mhIndex < 0 || isNaN($scope.mhIndex)) {
                    $scope.mhIndex = 0;
                  }
                  $scope.mhText = $scope.data.PrimaryHealthProvider_UserNotes[$scope.mhIndex].UserNotes;
                  break;
              case "sp":
                  $scope.spIndex = parseInt($scope.spIndex, 10); 
                  $scope.enterWdgtForm.safetyPlanTxt.$setPristine();
                  if ($scope.spIndex > $scope.data.SafetyPlan_UserNotes.length-1) {
                    $scope.spIndex = $scope.data.SafetyPlan_UserNotes.length-1;
                  } else if ($scope.spIndex < 0 || isNaN($scope.spIndex)) {
                    $scope.spIndex = 0;
                  }
                  $scope.spText = $scope.data.SafetyPlan_UserNotes[$scope.spIndex].UserNotes;
                  break;
              case "spspan":
                  $scope.spSpanIndex = parseInt($scope.spSpanIndex, 10);
                  if ($scope.spSpanIndex > $scope.data.SafetyPlan_SPANImport.length-1) {
                    $scope.spSpanIndex = $scope.data.SafetyPlan_SPANImport.length-1;
                  } else if ($scope.spSpanIndex < 0 || isNaN($scope.spSpanIndex)) {
                    $scope.spSpanIndex = 0;
                  }
                  break;
              case "comment":
                  $scope.commentIndex = parseInt($scope.commentIndex, 10); 
                  $scope.enterWdgtForm.commentTxt.$setPristine();
                  if ($scope.commentIndex > $scope.data.GeneralComments.length-1) {
                    $scope.commentIndex = $scope.data.GeneralComments.length-1;
                  } else if ($scope.commentIndex < 0 || isNaN($scope.commentIndex)) {
                    $scope.commentIndex = 0;
                  }
                  $scope.commentText = $scope.data.GeneralComments[$scope.commentIndex].Comment;
                  break;
            }
          }
        };

        //HIGH RISK SECTION

        $scope.hrIndex = 0;
        $scope.hrSpanIndex = 0;
        $scope.hrText = '';

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

        //MENTAL HEALTH PROVIDER SECTION

        $scope.mhIndex = 0;
        $scope.mhText = '';

        $scope.mhIndexChange = function(value) {
          //TODO
        }

        $scope.goMhBack = function() {
          if ($scope.mhIndex < $scope.data.PrimaryHealthProvider_UserNotes.length-1) {
            $scope.enterWdgtForm.mentalProviderTxt.$setPristine();
            $scope.mhIndex+=1;
            $scope.mhText = $scope.data.PrimaryHealthProvider_UserNotes[$scope.mhIndex].UserNotes;
          }
        };
        $scope.goMhForward = function() {
          if ($scope.mhIndex !== 0) {
            $scope.enterWdgtForm.mentalProviderTxt.$setPristine();
            $scope.mhIndex-=1;
            $scope.mhText = $scope.data.PrimaryHealthProvider_UserNotes[$scope.mhIndex].UserNotes;           
          }
        };

        //SYSTEM PLAN SECTION
        $scope.spIndex = 0;
        $scope.spSpanIndex = 0;
        $scope.spText = '';

        $scope.spIndexChange = function(value) {

        }

        $scope.goSpBack = function() {
          if ($scope.spIndex < $scope.data.SafetyPlan_UserNotes.length-1) {
            $scope.enterWdgtForm.safetyPlanTxt.$setPristine();
            $scope.spIndex+=1;
            $scope.spText = $scope.data.SafetyPlan_UserNotes[$scope.spIndex].UserNotes;
          }
        };

        $scope.goSpForward = function() {
          if ($scope.spIndex !== 0) {
            $scope.enterWdgtForm.safetyPlanTxt.$setPristine();
            $scope.spIndex-=1;
            $scope.spText = $scope.data.SafetyPlan_UserNotes[$scope.spIndex].UserNotes;           
          }
        };

         $scope.goSpSpanBack = function() {
          if ($scope.spSpanIndex < $scope.data.SafetyPlan_SPANImport.length-1) {
            $scope.spSpanIndex+=1;
          }
        };

        $scope.goSpSpanForward = function() {
          if ($scope.spSpanIndex !== 0) {
            $scope.spSpanIndex-=1;
          }
        };

        //GENERAL COMMENTS SECTION

        $scope.commentIndex = 0;
        $scope.commentText = '';

        $scope.goCommentBack = function() {
          if ($scope.commentIndex < $scope.data.GeneralComments.length-1) {
            $scope.enterWdgtForm.commentTxt.$setPristine();
            $scope.commentIndex+=1;
            $scope.commentText = $scope.data.GeneralComments[$scope.commentIndex].Comment;
          }
        };

        $scope.goCommentForward = function() {
          if ($scope.commentIndex !== 0) {
            $scope.enterWdgtForm.commentTxt.$setPristine();
            $scope.commentIndex-=1;
            $scope.commentText = $scope.data.GeneralComments[$scope.spIndex].Comment;           
          }
        };

        $scope.clearEdits = function(){
          $scope.SetWidgetData();
          $scope.common.data.EnterDataIsUnsaved = false;
        };

        $scope.SetWidgetData = function(data){
          if(data)
          {
            $scope.data = data;
          }

          $scope.enterWdgtForm.highRiskTxt.$setPristine();
          $scope.enterWdgtForm.mentalProviderTxt.$setPristine();
          $scope.enterWdgtForm.safetyPlanTxt.$setPristine();
          $scope.enterWdgtForm.commentTxt.$setPristine();

          $scope.hrIndex = 0;
          $scope.hrSpanIndex = 0;
          $scope.mhIndex = 0;
          $scope.spIndex = 0;
          $scope.spSpanIndex = 0;
          $scope.commentIndex = 0;

          $scope.hrText = $scope.noDataFound;
          $scope.mhText = $scope.noDataFound;
          $scope.spText = $scope.noDataFound;
          $scope.commentText = $scope.noDataFound;

          //Initialize control values
          if($scope.data.HighRisk_UserNotes && $scope.data.HighRisk_UserNotes.length > 0)
          {
            $scope.hrText = $scope.data.HighRisk_UserNotes[0].UserNotes;
          }
          
          if($scope.data.PrimaryHealthProvider_UserNotes && $scope.data.PrimaryHealthProvider_UserNotes.length > 0)
          {
            $scope.mhText = $scope.data.PrimaryHealthProvider_UserNotes[0].UserNotes;
          }

          if($scope.data.SafetyPlan_UserNotes && $scope.data.SafetyPlan_UserNotes.length > 0)
          {
            $scope.spText = $scope.data.SafetyPlan_UserNotes[0].UserNotes;
          }

          if($scope.data.GeneralComments && $scope.data.GeneralComments.length > 0)
          {
            $scope.commentText = $scope.data.GeneralComments[0].Comment;
          }

          if($scope.data.OutreachStatus && $scope.data.OutreachStatus.length > 0 )
          {
            $scope.IdentifiedPrimaryProvider = $scope.data.OutreachStatus[0].IdentifiedPrimaryProvider;
            $scope.NotifiedProvider = $scope.data.OutreachStatus[0].NotifiedProvider;
            $scope.AskedProviderReview = $scope.data.OutreachStatus[0].AskedProviderReview;
            $scope.ReceivedNotification = $scope.data.OutreachStatus[0].ReceivedNotification;
            $scope.ReviewedCurrentDiagnosis = $scope.data.OutreachStatus[0].ReviewedCurrentDiagnosis;
            $scope.EstablishedContact = $scope.data.OutreachStatus[0].EstablishedContact;
            $scope.UpdatedPlan = $scope.data.OutreachStatus[0].UpdatedPlan;
            $scope.EvaluateCaring = $scope.data.OutreachStatus[0].EvaluateCaring;
            $scope.EvaluateSafetyPlan = $scope.data.OutreachStatus[0].EvaluateSafetyPlan;
            $scope.Deceased = $scope.data.OutreachStatus[0].Deceased;
            $scope.CannotContact = $scope.data.OutreachStatus[0].CannotContact;
            $scope.RefusedServices = $scope.data.OutreachStatus[0].RefusedServices;
            $scope.CareFromCommunity = $scope.data.OutreachStatus[0].CareFromCommunity;
            $scope.ClinicallyNotAtRisk = $scope.data.OutreachStatus[0].ClinicallyNotAtRisk;
            $scope.Other = $scope.data.OutreachStatus[0].Other;
            
            $scope.outreachStatus = $scope.data.OutreachStatus[0];
          }
          
        };

        // ADD DATA SECTION
       
        $scope.addNewData = function() {
          $scope.common.data.EnterDataIsUnsaved = false;
          var UpdatedHR_UserNotes = {isNew: false};
          var UpdatedMH_UserNotes = {isNew:  false};
          var UpdatedSP_UserNotes = {isNew: false};
          var UpdatedGC_UserNotes = {isNew: false};
          var addDate = new Date().toLocaleDateString();

          if ($scope.enterWdgtForm.highRiskTxt.$valid &&(($scope.data.HighRisk_UserNotes.length == 0 && $scope.hrText != $scope.noDataFound) || 
               ($scope.data.HighRisk_UserNotes.length > 0 && $scope.hrText != $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes)))
          {
             UpdatedHR_UserNotes = {
                entry: $scope.hrText,
                date: addDate,
                isNew: true
              }
          }

          if ($scope.enterWdgtForm.mentalProviderTxt.$valid && (($scope.data.PrimaryHealthProvider_UserNotes.length == 0 && $scope.mhText != $scope.noDataFound) || 
               ($scope.data.PrimaryHealthProvider_UserNotes.length > 0 && $scope.mhText != $scope.data.PrimaryHealthProvider_UserNotes[$scope.mhIndex].UserNotes)))
          {
             UpdatedMH_UserNotes = {
                entry: $scope.mhText,
                date: addDate,
                isNew: true
              }
          }

          if ($scope.enterWdgtForm.safetyPlanTxt.$valid && (($scope.data.SafetyPlan_UserNotes.length == 0 && $scope.spText != $scope.noDataFound) || 
               ($scope.data.SafetyPlan_UserNotes.length > 0 && $scope.spText != $scope.data.SafetyPlan_UserNotes[$scope.spIndex].UserNotes)))
          {
             UpdatedSP_UserNotes = {
                entry: $scope.spText,
                date: addDate,
                isNew: true
              }
          }

          if ($scope.enterWdgtForm.commentTxt.$valid && (($scope.data.GeneralComments.length == 0 && $scope.commentText != $scope.noDataFound) || 
               ($scope.data.GeneralComments.length > 0 && $scope.commentText != $scope.data.GeneralComments[$scope.commentIndex].Comment)))
          {
             UpdatedGC_UserNotes = {
                entry: $scope.commentText,
                date: addDate,
                isNew: true
              }
          }

            Updated_OutreachStatus = {};
            if($scope.IdentifiedPrimaryProvider != $scope.data.OutreachStatus[0].IdentifiedPrimaryProvider)
            {
              Updated_OutreachStatus.IdentifiedPrimaryProvider = $scope.IdentifiedPrimaryProvider;
            }

            if($scope.NotifiedProvider != $scope.data.OutreachStatus[0].NotifiedProvider)
            {
              Updated_OutreachStatus.NotifiedProvider = $scope.NotifiedProvider;
            }

            if($scope.AskedProviderReview != $scope.data.OutreachStatus[0].AskedProviderReview)
            {
              Updated_OutreachStatus.AskedProviderReview = $scope.AskedProviderReview;
            }

            if($scope.ReceivedNotification != $scope.data.OutreachStatus[0].ReceivedNotification)
            {
              Updated_OutreachStatus.ReceivedNotification = $scope.ReceivedNotification;
            }

            if($scope.ReviewedCurrentDiagnosis != $scope.data.OutreachStatus[0].ReviewedCurrentDiagnosis)
            {
              Updated_OutreachStatus.ReviewedCurrentDiagnosis = $scope.ReviewedCurrentDiagnosis;
            }
            
            if($scope.EstablishedContact != $scope.data.OutreachStatus[0].EstablishedContact)
            {
              Updated_OutreachStatus.EstablishedContact = $scope.EstablishedContact;
            }
            
            if($scope.UpdatedPlan != $scope.data.OutreachStatus[0].UpdatedPlan)
            {
              Updated_OutreachStatus.UpdatedPlan = $scope.UpdatedPlan;
            }
            
            if($scope.EvaluateCaring != $scope.data.OutreachStatus[0].EvaluateCaring)
            {
              Updated_OutreachStatus.EvaluateCaring = $scope.EvaluateCaring;
            }

            if($scope.EvaluateSafetyPlan != $scope.data.OutreachStatus[0].EvaluateSafetyPlan)
            {
              Updated_OutreachStatus.EvaluateSafetyPlan = $scope.EvaluateSafetyPlan;
            }
            
            if($scope.Deceased != $scope.data.OutreachStatus[0].Deceased)
            {
              Updated_OutreachStatus.Deceased = $scope.Deceased;
            }
            
            if($scope.CannotContact != $scope.data.OutreachStatus[0].CannotContact)
            {
              Updated_OutreachStatus.CannotContact = $scope.CannotContact;
            }

            if($scope.RefusedServices != $scope.data.OutreachStatus[0].RefusedServices)
            {
              Updated_OutreachStatus.RefusedServices = $scope.RefusedServices;
            }

            if($scope.CareFromCommunity != $scope.data.OutreachStatus[0].CareFromCommunity)
            {
              Updated_OutreachStatus.CareFromCommunity = $scope.CareFromCommunity;
            }

            if($scope.ClinicallyNotAtRisk != $scope.data.OutreachStatus[0].ClinicallyNotAtRisk)
            {
              Updated_OutreachStatus.ClinicallyNotAtRisk = $scope.ClinicallyNotAtRisk;
            }

            if($scope.Other != $scope.data.OutreachStatus[0].Other)
            {
              Updated_OutreachStatus.Other = $scope.Other;
            }

          $scope.widget.dataModel.saveNewUserData({
                                                    hrUserNotes: UpdatedHR_UserNotes,
                                                    mhUserNotes: UpdatedMH_UserNotes,
                                                    spUserNotes: UpdatedSP_UserNotes,
                                                    gcUserNotes: UpdatedGC_UserNotes,
                                                    outreachStatus: Updated_OutreachStatus
                                                  });
          };

          $scope.enterDataChanged = function(){
            $scope.common.data.EnterDataIsUnsaved = true
          };

          $scope.resizeWidgetDataArea = function(){
            var containerHeight = parseInt($('#enterWdgtDataForm').parent().css('height'),10);
            $('.enterWdgtDataDiv').css('height',.80 * containerHeight);
          } 

      },
      link: function postLink(scope, element, attr) {
        scope.$on("gridsterResized", function (){
            $timeout(function(){
              scope.resizeWidgetDataArea();
            },1000);
        });
        scope.$watch('widgetData', function(data){
          scope.SetWidgetData(data);
          $timeout(function(){
              scope.resizeWidgetDataArea();
            },2000);
        });
      }
    }
  });
