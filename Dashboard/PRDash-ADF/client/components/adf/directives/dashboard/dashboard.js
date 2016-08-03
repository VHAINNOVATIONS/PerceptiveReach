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

angular.module('ui.dashboard', ['ui.bootstrap', 'ui.sortable', 'ui.DashboardUtil','gridster']);

angular.module('ui.dashboard')

  .directive('dashboard', ['WidgetModel', 'WidgetDefCollection', '$modal', 'DashboardState', '$log','$timeout', function (WidgetModel, WidgetDefCollection, $modal, DashboardState, $log,$timeout) {

    return {
      restrict: 'A',
      templateUrl: function(element, attr) {
        return attr.templateUrl ? attr.templateUrl : 'client/components/adf/directives/dashboard/dashboard.html';
      },
      scope: true,

      controller: ['$scope', '$attrs', function (scope, attrs) {
        // default options
        var defaults = {
          stringifyStorage: true,
          hideWidgetSettings: false,
          hideWidgetClose: false,
          settingsModalOptions: {
            templateUrl: 'client/components/adf/directives/dashboard/widget-settings-template.html',
            controller: 'WidgetSettingsCtrl'
          },
          onSettingsClose: function(result, widget) { // NOTE: dashboard scope is also passed as 3rd argument
            jQuery.extend(true, widget, result);
          },
          onSettingsDismiss: function(reason) { // NOTE: dashboard scope is also passed as 2nd argument
            $log.info('widget settings were dismissed. Reason: ', reason);
          }
        };

        // from dashboard="options"
        scope.options = scope.$eval(attrs.dashboard);
        scope.dashboardTitle = scope.$eval(attrs.dashboardTitle)

        // Deep options
        scope.options.settingsModalOptions = scope.options.settingsModalOptions || {};
        _.each(['settingsModalOptions'], function(key) {
          // Ensure it exists on scope.options
          scope.options[key] = scope.options[key] || {};
          // Set defaults
          _.defaults(scope.options[key], defaults[key]);
        });

        // Shallow options
        _.defaults(scope.options, defaults);

        // sortable options
        var sortableDefaults = {
          stop: function () {
            scope.saveDashboard();
          },
          handle: '.widget-header',
          distance: 5
        };
        scope.sortableOptions = angular.extend({}, sortableDefaults, scope.options.sortableOptions || {});

        scope.gridsterOpts = {
            columns: 30, // the width of the grid, in columns
            pushing: true, // whether to push other items out of the way on move or resize
            floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
            swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
            width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
            colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            //margins: [10, 10], // the pixel distance between each widget
            outerMargin: true, // whether margins apply to outer edges of the grid
            defaultSizeX: 10, // the default width of a gridster item, if not specifed
            defaultSizeY: 6, // the default height of a gridster item, if not specified
            minSizeX: 5, // minimum column width of an item
            maxSizeX: null, // maximum column width of an item
            minSizeY: 5, // minumum row height of an item
            maxSizeY: 14, // maximum row height of an item
            resizable: {
               enabled: true,
               handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
               start: function(event, $element, widget) {}, // optional callback fired when resize is started,
               resize: function(event, $element, widget) {
               }, 
               // optional callback fired when item is resized,
               stop: function(event, $element, widget) {
                scope.$broadcast('gridsterResized');
                scope.saveDashboard();
               } // optional callback fired when item is finished resizing
            },
            draggable: {
               enabled: true, // whether dragging items is supported
               handle: '.widget-header', // optional selector for resize handle
               start: function(event, $element, widget) {
                scope.startPosition = $element.position();
               }, // optional callback fired when drag is started,
               drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
               stop: function(event, $element, widget) {
                if(!angular.equals($element.position(),scope.startPosition))
                scope.saveDashboard();
               } // optional callback fired when item is finished dragging
            }
        };

        scope.CloseSaveAlert =  function(){
          $(".unsavedDataAlert").fadeOut();
        }


      }],
      link: function (scope) {

        // Save default widget config for reset
        scope.defaultWidgets = scope.options.defaultWidgets;
        scope.IsShiftKeyPressed = false;
        scope.RowIncrement = 0;
        scope.widgetDefs = new WidgetDefCollection(scope.options.widgetDefinitions);
        var count = 1;

        // Instantiate new instance of dashboard state
        scope.dashboardState = new DashboardState(
          scope.options.storage,
          scope.options.storageId,
          scope.options.storageHash,
          scope.widgetDefs,
          scope.options.stringifyStorage
        );

        scope.$on('commonDataChanged', function (event, data) {
          if (data.data.activeView == 'individual'){
            if(data.data.veteranObj && data.data.veteranObj.Name)
              scope.PatientName = data.data.veteranObj.Name +', SSN: '+ data.data.veteranObj.SSN;
            else
              scope.PatientName = '';
          }
          else if(data.data.activeView == 'facility'){
            if(data.data.facilitySelected.facilityName != null)
              scope.FacilityName = 'VAMC: ' + data.data.facilitySelected.facilityName;
            else
              scope.FacilityName = '';
          }
          else if(data.data.activeView == 'surveillance'){
            if(data.data.facilitySelected.surveillanceName == null && data.data.visnSelected.surveillance == null)
              scope.VISN_FacilityName = 'VISN:  VAMC: ';
            else if (data.data.facilitySelected.surveillanceName == null)
              scope.VISN_FacilityName = 'VISN: ' + data.data.visnSelected.surveillance + ' VAMC: ';
            else if (data.data.visnSelected.surveillance == null)
              scope.VISN_FacilityName = 'VISN:  VAMC: ' + data.data.facilitySelected.surveillanceName;
            else
              scope.VISN_FacilityName = 'VISN: ' + data.data.visnSelected.surveillance + ' VAMC: ' + data.data.facilitySelected.surveillanceName;
          }        
        }.bind(this));
		

        /**
         * Instantiates a new widget on the dashboard
         * @param {Object} widgetToInstantiate The definition object of the widget to be instantiated
         */


        scope.addWidget = function (widgetToInstantiate, doNotSave) {
          if (typeof widgetToInstantiate === 'string') {
            widgetToInstantiate = {
              name: widgetToInstantiate
            };
          }

          var defaultWidgetDefinition = scope.widgetDefs.getByName(widgetToInstantiate.name);
          if (!defaultWidgetDefinition) {
            throw 'Widget ' + widgetToInstantiate.name + ' is not found.';
          }

          // Determine the title for the new widget
          var title;
          if (!widgetToInstantiate.title && !defaultWidgetDefinition.title) {
            widgetToInstantiate.title = 'Widget ' + count++;
          }


          // Instantiation
          var widget = new WidgetModel(defaultWidgetDefinition, widgetToInstantiate);

          if(scope.common)
          {
            widget.dataModelOptions.common = scope.common
          }

          // Add to the widgets array
          scope.widgets.push(widget);
          if (!doNotSave) {
            scope.saveDashboard();
          }

          return widget;
        };

        /**
         * Removes a widget instance from the dashboard
         * @param  {Object} widget The widget instance object (not a definition object)
         */
        scope.removeWidget = function (widget) {
          if(widget.canClose != false)
          {
            scope.widgets.splice(_.indexOf(scope.widgets, widget), 1);
            scope.saveDashboard();
          }
        };

        scope.keyDown = function(e)
        {
          var sizex = $($(e)[0].currentTarget).closest('.gridsterContainer').data().$gridsterItemController.sizeX;
          var sizey = $($(e)[0].currentTarget).closest('.gridsterContainer').data().$gridsterItemController.sizeY;
          var col = $($(e)[0].currentTarget).closest('.gridsterContainer').data().$gridsterItemController.col;
          var row = $($(e)[0].currentTarget).closest('.gridsterContainer').data().$gridsterItemController.row;
          var gridsterContainer = $($(e)[0].currentTarget).closest('.gridsterContainer').data().$gridsterItemController;
          var gridsterEle = $($(e)[0].currentTarget).closest('.gridsterContainer');
          var sizeIncrement = 1;
          switch(e.which) {
          case 16:
              scope.IsShiftKeyPressed = true;
              return false;
          case 40:
              gridsterContainer.sizeY = sizey+sizeIncrement;
              //scope.saveDashboard();
              gridsterContainer.gridster.resizable.stop({},gridsterEle,{});
              return false;
          case 37:
              gridsterContainer.sizeX = sizex-sizeIncrement;
              //scope.saveDashboard();
              gridsterContainer.gridster.resizable.stop({},gridsterEle,{});
              return false;
          case 39:
              if(col + sizex < 30)
              {
                gridsterContainer.sizeX = sizex+sizeIncrement;
                //scope.saveDashboard();
                gridsterContainer.gridster.resizable.stop({},gridsterEle,{});
              }
              return false;
          case 38:
              gridsterContainer.sizeY = sizey-sizeIncrement;
              //scope.saveDashboard();
              gridsterContainer.gridster.resizable.stop({},gridsterEle,{});
              return false;
          case 65:
              if(scope.IsShiftKeyPressed)
              {
                if(col > 0)
                {
                  gridsterContainer.col = col-1;
                  scope.saveDashboard();
                }
                return false;
              }
              break;
          case 68:
              if(scope.IsShiftKeyPressed)
              {
                if(col + sizex < 30)
                {
                  gridsterContainer.col = col+1;
                  scope.saveDashboard();
                }
                return false;
              }
              break;
          case 83:
            if(scope.IsShiftKeyPressed)
            {
              scope.RowIncrement += 5;
              gridsterContainer.row = row + scope.RowIncrement;
              scope.saveDashboard();
              return false;
            }
            break;
          case 87:
            if(scope.IsShiftKeyPressed)
            {
              if(row > 0)
              {
                gridsterContainer.row = row-1;
                scope.saveDashboard();
              }
              return false;  
            }
            break;
          default:
              return;
          } 

        }

        scope.keyUp = function(e)
        {
          switch(e.which) {
            case 16:
              scope.IsShiftKeyPressed = false;
              scope.RowIncrement = 0;
              return;
            default:
              return;

          }
        }

        /**
         * Opens a dialog for setting and changing widget properties
         * @param  {Object} widget The widget instance object
         */
        scope.openWidgetSettings = function (widget) {

          // Set up $modal options 
          var options = _.defaults(
            { scope: scope },
            widget.settingsModalOptions,
            scope.options.settingsModalOptions);

          // Ensure widget is resolved
          options.resolve = {
            widget: function () {
              return widget;
            }
          };
          
          // Create the modal
          var modalInstance = $modal.open(options);
          var onClose = widget.onSettingsClose || scope.options.onSettingsClose;
          var onDismiss = widget.onSettingsDismiss || scope.options.onSettingsDismiss;

          // Set resolve and reject callbacks for the result promise
          modalInstance.result.then(
            function (result) {

              // Call the close callback
              onClose(result, widget, scope);

              //AW Persist title change from options editor
              scope.$emit('widgetChanged', widget);
            },
            function (reason) {
              
              // Call the dismiss callback
              onDismiss(reason, scope);

            }
          );

        };

        /**
         * Remove all widget instances from dashboard
         */
        scope.clear = function (doNotSave) {
          scope.widgets = [];
          if (doNotSave === true) {
            return;
          }
          scope.saveDashboard();
        };

        /**
         * Used for preventing default on click event
         * @param {Object} event     A click event
         * @param {Object} widgetDef A widget definition object
         */
        scope.addWidgetInternal = function (event, widgetDef) {
          event.preventDefault();
          var widgetExists =  jQuery.grep(scope.widgets, function( n, i ) {  return ( n.name == widgetDef.name);});
          if(widgetExists.length)
          {
            $(".snoAlertBox").fadeIn();
            window.setTimeout(function () {
              $(".snoAlertBox").fadeOut(300)
            }, 4000);
            return false;   
          }
          scope.addWidget(widgetDef);
          $timeout(function(){
           scope.$broadcast('defaultWidgetsSelected', scope.common);
          },1000);
        };

        /**
         * Uses dashboardState service to save state
         */
        scope.saveDashboard = function (force) {
          if (!scope.options.explicitSave) {
            scope.dashboardState.save(scope.widgets);
          } else {
            if (!angular.isNumber(scope.options.unsavedChangeCount)) {
              scope.options.unsavedChangeCount = 0;
            }
            if (force) {
              scope.options.unsavedChangeCount = 0;
              scope.dashboardState.save(scope.widgets);

            } else {
              ++scope.options.unsavedChangeCount;
            }
          }
        };

        /**
         * Wraps saveDashboard for external use.
         */
        scope.externalSaveDashboard = function() {
          scope.saveDashboard(true);
        };

        /**
         * Clears current dash and instantiates widget definitions
         * @param  {Array} widgets Array of definition objects
         */
        scope.loadWidgets = function (widgets) {
          // AW dashboards are continuously saved today (no "save" button).
          //scope.defaultWidgets = widgets;
          scope.savedWidgetDefs = widgets;
          scope.clear(true);
          _.each(widgets, function (widgetDef) {
            scope.addWidget(widgetDef, true);
          });
        };

        /**
         * Resets widget instances to default config
         * @return {[type]} [description]
         */
        scope.resetWidgetsToDefault = function () {
          scope.loadWidgets(scope.defaultWidgets);
          scope.saveDashboard();
          $timeout(function(){
           scope.$broadcast('defaultWidgetsSelected', scope.common);
          },1000);


        };

        // Set default widgets array
        var savedWidgetDefs = scope.dashboardState.load();

        // Success handler
        function handleStateLoad(saved) {
          scope.options.unsavedChangeCount = 0;
          if (saved && saved.length) {
            scope.loadWidgets(saved);
          } else if (scope.defaultWidgets) {
            scope.loadWidgets(scope.defaultWidgets);
          } else {
            scope.clear(true);
          }
        }

        if (angular.isArray(savedWidgetDefs)) {
          handleStateLoad(savedWidgetDefs);
        } else if (savedWidgetDefs && angular.isObject(savedWidgetDefs) && angular.isFunction(savedWidgetDefs.then)) {
          savedWidgetDefs.then(handleStateLoad, handleStateLoad);
        } else {
          handleStateLoad();
        }

        // expose functionality externally
        // functions are appended to the provided dashboard options
        scope.options.addWidget = scope.addWidget;
        scope.options.loadWidgets = scope.loadWidgets;
        scope.options.saveDashboard = scope.externalSaveDashboard;
        scope.options.removeWidget = scope.removeWidget;
        scope.options.openWidgetSettings = scope.openWidgetSettings;

        // save state
        scope.$on('widgetChanged', function (event) {
          event.stopPropagation();
          scope.saveDashboard();
        });
      }
    };
  }]);
