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
  .directive('wtCdsQuestionnaire', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/CDSQuestionnaire/CDSQuestionnaire.html',
      scope: {
        data: '=',
      },
      controller: function ($scope) {
        $scope.GotoQuestions =  function () {
          $scope.filteredQuestions = [];
          $('#cdsConditionDiv input:radio:checked').each(function(){
            var conditionId = $(this).attr('id').replace('Condition_','');
            var conditionName = $(this).attr('name');

            var filteredQs= jQuery.grep($scope.data.questions, function( n, i ) {
                                  return n.Condition_ID == conditionId ;
                            });
            var arrayItem = {ConditionName: conditionName, Questions: filteredQs};
            $scope.filteredQuestions.push(arrayItem);
          });
          $('#cdsConditionDiv').toggleClass('hidden');
          $('#cdsQuestionDiv').toggleClass('hidden');
        }

        $scope.GotoTreatments  =  function () {
          $scope.filteredTreatments = [];
          $('#cdsQuestionDiv .cdsUIList button').each(function(){
             var questionId = $(this).attr('id').replace('question_','');
             var conditionName = $(this).attr('name');
             var filterTrtmnts = [];

             if($(this).find('span:first').text() == 'Yes')
             { 
               filterTrtmnts = jQuery.grep($scope.data.treatments, function( n, i ) {
                                      return  n.Question_ID == questionId && n.Response_ID == 2;
                                   });
             }
             else if($(this).find('span:first').text() == 'No')
             { 
               filterTrtmnts = jQuery.grep($scope.data.treatments, function( n, i ) {
                                      return n.Question_ID == questionId && n.Response_ID == 3;
                                });
             }
             var arrayItem = {ConditionName: conditionName, Treatments: filterTrtmnts};

             if(filterTrtmnts.length > 0){
                var ExistingNode = $.grep($scope.filteredTreatments,function(n,i){
                  if(n.ConditionName == arrayItem.ConditionName)
                  {
                    return true;
                  }
                  return false;
                });

                if(ExistingNode.length > 0)
                {
                  ExistingNode[0].Treatments.push(filterTrtmnts[0]);
                }
                else
                {
                $scope.filteredTreatments.push(arrayItem);
                }
             }
          })
          $('#cdsQuestionDiv').toggleClass('hidden');
          $('#cdsTreatmentDiv').toggleClass('hidden');
        }

         $scope.BacktoConditions  =  function () {
          $('#cdsQuestionDiv').toggleClass('hidden');
          $('#cdsConditionDiv').toggleClass('hidden');
        }

        $scope.BacktoQuestions =  function () {
          $('#cdsTreatmentDiv').toggleClass('hidden');
          $('#cdsQuestionDiv').toggleClass('hidden');
        } 

        $scope.resizeConditionList = function(){
          var containerHeight = parseInt($('#cdsQuestionnaire').parent().css('height'),10);
          $('#cdsQuestionnaire .cdsUIList').css('height',.65 * containerHeight);
        }   

        $scope.AnswerSelected = function(e){
          var selectedText = $(e.currentTarget).text();
          $(e.currentTarget).parent().parent().find('button>span:first').text(selectedText);
          return false;
        } 

        $scope.RadioBtnClicked = function(){
          if($('#cdsConditionDiv input:radio:checked').length > 0)
          {
            $scope.IsChecked = true;
          }
          else
          {
            $scope.IsChecked = false;
          }
        }

        $scope.IsChecked = false;

        $scope.ResetQuestions = function(){
          $('#cdsConditionDiv input:radio').attr('checked',false);
          $scope.IsChecked = false;          
        }

      },
     link: function postLink(scope, element, attr) {

        scope.$on("gridsterResized", function (){
            $timeout(function(){
              scope.resizeConditionList();
            },1000);
        });

        scope.$watch('data', function (data) {
          if (data) {
            scope.data = data;
            $timeout(function(){
              scope.resizeConditionList();
            },2000);
          }
         
        });

        $('#cdsTabs').click(function(e){
          var tabContentId = $(e.target).attr('href');
          if(tabContentId)
          {
            $('#cdsTabs>li').removeClass('active');
            $(e.target).parent().addClass('active');
            $('#cdsTabContent>div').removeClass('in').removeClass('active')
            $(tabContentId).addClass('in').addClass('active');
          }
          return false;
        });

        $("#dropdownMenu2").on("click", "li a", function() {
            var platform = $(this).text();
            $("#dropdown_title2").html(platform);
            $('#printPlatform').html(platform);
        });  
      }
    };
  });