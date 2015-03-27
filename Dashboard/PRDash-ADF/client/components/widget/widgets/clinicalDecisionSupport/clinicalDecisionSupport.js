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
  .directive('wtClinicalDecisionSupport', function ($sce) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/clinicalDecisionSupport/clinicalDecisionSupport.html',
      scope: {
        data: '=',
      },
      controller: function ($scope) {
        
      },
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data && data.length != 0) {
            var cds = data;
            var deliminiter = "@@";
            for(var cpgIndex in cds){
              var featuresList = [];
              var featuresInitial = "";
              var featuresHtml = "";
              var fullHMTL = "";
              if (cds[cpgIndex].Features.indexOf(deliminiter) != -1){
                featuresInitial = cds[cpgIndex].Features.split(":")[0].trim() + ":";
                featuresList = cds[cpgIndex].Features.split(":")[1].trim().split(deliminiter);
                for(var feature in featuresList){
                  featuresHtml += (featuresList[feature] != "") ? "<li>" + featuresList[feature] + "</li>" : "";
                } 
                fullHMTL = featuresInitial + "<div style='overflow:auto; height:80px; widgth:auto'><ul>" + featuresHtml + "</ul></div>"; 
                cds[cpgIndex].Features = $sce.trustAsHtml(fullHMTL);
              }
            }
            scope.cpgList = cds;            
          }
        });
      }
    };
  });