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
	.controller('LayoutsDemoExplicitSaveCtrl', function($scope, widgetDefinitions, LayoutStorage, Util, Auth, $interval, $timeout, IdleServ, DefaultWidgetService) {
    //console.log("UserObj inside main controller: ",$rootScope.globals['userObj']);
    // Start Idle Service
    IdleServ.start(Auth);
    var user = JSON.parse(sessionStorage.user);
    //user.DashboardData = JSON.parse(user.DashboardData);
    // initialize LayoutOptions depending on role or dashboard data
    var layouts = [];
    var defaultWidgetsLayout = DefaultWidgetService.getDefaultWidgetsObj(widgetDefinitions);
    var defaultWidgetsAll = DefaultWidgetService.getAllDefaultWidgets(widgetDefinitions);
    var widgetsAllObj = DefaultWidgetService.getAllWidgetsObj(widgetDefinitions);

    if (user.DashboardData){      
      var layout = null;
      for (var layoutIdx in user.DashboardData.layouts){
        layout = user.DashboardData.layouts[layoutIdx];

        if(layout.title.indexOf("National") != -1){
          layout.defaultWidgets = defaultWidgetsLayout.national;
          layout.widgetDefinitions = widgetsAllObj.national;
        }
        else if(layout.title.indexOf("State") != -1){
          layout.defaultWidgets = defaultWidgetsLayout.stateVISN;
          layout.widgetDefinitions = widgetsAllObj.stateVISN;
        }
        else if(layout.title.indexOf("Facility") != -1){
          layout.defaultWidgets = defaultWidgetsLayout.facility;
          layout.widgetDefinitions = widgetsAllObj.facility;
        }
        else if(layout.title.indexOf("Individual") != -1){
          layout.defaultWidgets = defaultWidgetsLayout.individual;
          layout.widgetDefinitions = widgetsAllObj.individual;
        }
        
        user.DashboardData.layouts[layoutIdx] = layout;
      }
      layouts = user.DashboardData.layouts;

      // populate local storage
      sessionStorage.setItem(user.UserDashboardID, JSON.stringify(user.DashboardData));
    }
    else{
      var role = user.UserRole;
     
      if (user.VISN_State_Reg_View_Access){
        layouts.push({ title: 'National View', active: (role.match(/^(SUP|REP|ADM)$/)) ? true : false , defaultWidgets: defaultWidgetsLayout.national, widgetDefinitions: widgetsAllObj.national});
        layouts.push({ title: 'State View', active: false, defaultWidgets: defaultWidgetsLayout.stateVISN, widgetDefinitions: widgetsAllObj.stateVISN});
      }
      if (user.Facility_View_Access){
        layouts.push({ title: 'Facility View', active: (role.match(/^(CCT)$/)) ? true : false, defaultWidgets: defaultWidgetsLayout.facility, widgetDefinitions: widgetsAllObj.facility});  
      }
      if (user.Individual_View_Access){
        layouts.push({ title: 'Individual View', active: false, defaultWidgets: defaultWidgetsLayout.individual, widgetDefinitions: widgetsAllObj.individual});
      }
    }

    $scope.layoutOptions = {
      storageId: (user.DashboardData) ? user.UserDashboardID : user.UserName + '-dashboard-' + user.UserRole,
      storage: sessionStorage,
      storageHash: (user.DashboardData) ? user.DashboardData.storageHash : Util.makeStorageID(),
      widgetDefinitions: widgetDefinitions,
      defaultWidgets: defaultWidgetsAll,
      explicitSave: true,
      lockDefaultLayouts: true,
      defaultLayouts: layouts      
    };

    // initialize common data object and broadcast to widgets
    $scope.common = {
      data: {
        stateSelected: '',
        facilitySelected: 613,
        patientIdSelected: 1,
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

  });