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

angular.module('app')
	.controller('LayoutsDemoExplicitSaveCtrl', function($scope, widgetDefinitions, defaultWidgets, LayoutStorage, Util, Auth, $interval, $timeout, IdleServ) {
    //console.log("UserObj inside main controller: ",$rootScope.globals['userObj']);
    // Start Idle Service
    IdleServ.start(Auth);
    var user = JSON.parse(sessionStorage.user);
    //user.DashboardData = JSON.parse(user.DashboardData);
    // initialize LayoutOptions depending on role or dashboard data
    var layouts = [];

    if (user.DashboardData){
      layouts = user.DashboardData.layouts;
      // populate local storage
      sessionStorage.setItem(user.UserDashboardID, JSON.stringify(user.DashboardData));
    }
    else{
      var role = user.UserRole;
     
      if (user.VISN_State_Reg_View_Access){
        layouts.push({ title: 'National View', active: (role.match(/^(SUP|REP|ADM)$/)) ? true : false , defaultWidgets: defaultWidgets });
        layouts.push({ title: 'State View', active: false, defaultWidgets: defaultWidgets });
      }
      if (user.Facility_View_Access){
        layouts.push({ title: 'Facility View', active: (role.match(/^(CCT)$/)) ? true : false, defaultWidgets: defaultWidgets });  
      }
      if (user.Individual_View_Access){
        layouts.push({ title: 'Individual View', active: false, defaultWidgets: defaultWidgets });
      }
    }

    $scope.layoutOptions = {
      storageId: (user.DashboardData) ? user.UserDashboardID : user.UserName + '-dashboard-' + user.UserRole,
      storage: sessionStorage,
      storageHash: (user.DashboardData) ? user.DashboardData.storageHash : Util.makeStorageID(),
      widgetDefinitions: widgetDefinitions,
      defaultWidgets: defaultWidgets,
      explicitSave: true,
      defaultLayouts: layouts      
    };

    

    // random scope value
    $scope.randomValue = Math.random();
    $interval(function () {
      $scope.randomValue = Math.random();
    }, 500);
    // initialize common data object and broadcast to widgets
    $scope.common = {
      data: {
        stateSelected: '',
        facilitySelected: 613,
        patientIdSelected: 1,
        veteranObj: {"ReachID":781151,"FirstName":"Vet*","MiddleName":"I","LastName":"Veteran_*","SSN":"xxx-xx-9018","Phone":"(800) 555-4078","DateIdentifiedRisk":"2/8/2011","RiskLevel":"High","RiskLevelID":1,"OutreachStatus":null,"VAMC":"(V01) (402) Togus, ME"},
        userObj: {}
      }
    };
   
    $timeout(function(){
      // Add listener for when layout is changed
      $('ul li a').click(function(e) 
      {
        //alert("clickme");
        $scope.$broadcast('commonDataChanged', $scope.common);
      });

      // Broadcast message first time
      $scope.$broadcast('commonDataChanged', $scope.common);
    },1000);
    

    // percentage (gauge widget, progressbar widget)
    $scope.percentage = 5;
    $interval(function () {
      $scope.percentage = ($scope.percentage + 10) % 100;
    }, 1000);

    // line chart widget
    $interval(function () {
      $scope.topN = _.map(_.range(0, 10), function (index) {
        return {
          name: 'item' + index,
          value: Math.floor(Math.random() * 100)
        };
      });
    }, 500);

  });