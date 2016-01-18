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
          var test = $scope;
          $scope.filteredQuestions = $scope.data.questions;
          $('#cdsConditionDiv').toggleClass('hidden');
          $('#cdsQuestionDiv').toggleClass('hidden');
        }

        $scope.GotoTreatments  =  function () {
          $scope.filteredTreatments = $scope.data.treatments;
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
          $('#cdsQuestionnaire .cdsUIList').css('height',.50 * containerHeight);
        }   

        $scope.AnswerSelected = function(){
          var platform = $(this).text();
          $("#dropdown_title2").html(platform);
          $('#printPlatform').html(platform);
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