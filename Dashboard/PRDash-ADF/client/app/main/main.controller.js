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
	.controller('LayoutsDemoExplicitSaveCtrl', function($scope, widgetDefinitions, LayoutStorage, Util, Auth, $interval, $timeout, IdleServ, DefaultWidgetService,$rootScope) {
    //console.log("UserObj inside main controller: ",$rootScope.globals['userObj']);
    // Start Idle Service
    IdleServ.start(Auth);
    var user = JSON.parse(sessionStorage.user);
    //user.DashboardData = JSON.parse(user.DashboardData);
    // initialize LayoutOptions depending on role or dashboard data.
    var layouts = [];
    var activeView = null;
    var defaultWidgetsLayout = DefaultWidgetService.getDefaultWidgetsObj(widgetDefinitions,user.UserRole);
    var defaultWidgetsAll = DefaultWidgetService.getAllDefaultWidgets(widgetDefinitions,user.UserRole);
    var widgetsAllObj = DefaultWidgetService.getAllWidgetsObj(widgetDefinitions,user.UserRole);

    if (user.DashboardData){      
      var layout = null;
      for (var layoutIdx in user.DashboardData.layouts){
        layout = user.DashboardData.layouts[layoutIdx];

        if(layout.title.indexOf("Surveillance") != -1){
          layout.defaultWidgets = defaultWidgetsLayout.surveillance;
          layout.widgetDefinitions = widgetsAllObj.surveillance;
          if (layout.active) activeView = "surveillance";
        }
        else if(layout.title.indexOf("Facility") != -1){
          layout.defaultWidgets = defaultWidgetsLayout.facility;
          layout.widgetDefinitions = widgetsAllObj.facility;
          if (layout.active) activeView = "facility";
        }
        else if(layout.title.indexOf("Individual") != -1){
          layout.defaultWidgets = defaultWidgetsLayout.individual;
          layout.widgetDefinitions = widgetsAllObj.individual;
          if (layout.active) activeView = "individual";
        }

        user.DashboardData.layouts[layoutIdx] = layout;
      }
      layouts = user.DashboardData.layouts;
      // populate local storage
      sessionStorage.setItem(user.UserDashboardID, JSON.stringify(user.DashboardData));
    }
    else{
      var role = user.UserRole;
      var layout = null;
      if (user.VISN_State_Reg_View_Access){
        layout = { title: 'Surveillance View', active: (role.match(/^(SUP|REP|ADM)$/)) ? true : false , defaultWidgets: defaultWidgetsLayout.surveillance, widgetDefinitions: widgetsAllObj.surveillance};
        if (layout.active) activeView = "surveillance";
        layouts.push(layout);
      }
      if (user.Facility_View_Access){
        layout = { title: 'Facility View', active: (role.match(/^(CCT|CCS)$/)) ? true : false, defaultWidgets: defaultWidgetsLayout.facility, widgetDefinitions: widgetsAllObj.facility};
        if (layout.active) activeView = "facility";
        layouts.push(layout);  
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
      explicitSave: false,
      lockDefaultLayouts: true,
      defaultLayouts: layouts,
      dataLastUpdated: user.DataLastUpdated    
    };

    // initialize common data object and broadcast to widgets
    $scope.common = {
      data: {
        visnSelected: {surveillance: null, facility: user.VISN},
        facilitySelected: {surveillance: null, facility: user.UserHomeFacility},
        patientIdSelected: 1,
        activeView: activeView,
        userObj: {}
      }
    };

    $timeout(function(){
      // Add listener for enter key on layout
      $('.layout-tabs li a').keydown(function(event){
        if(event.KeyCode == '13' || event.key == 'Enter')
        {
          //tab.click();
          $(this).click();
        }
      });
      // Add listener for when layout is changed
      $('.layout-tabs li a').click(function(e) 
      {
        $timeout(function(){
          var element = (e.currentTarget.innerText) ? e.currentTarget : e.currentTarget.activeElement;
          $scope.common.data.activeView = element.innerText.replace(' View','').toLowerCase().replace(/(\r\n|\n|\r)/gm,"").trim(); //e.currentTarget.innerText.replace(' View','').toLowerCase();
          $scope.$broadcast('commonDataChanged', $scope.common);  
        },1500)        
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