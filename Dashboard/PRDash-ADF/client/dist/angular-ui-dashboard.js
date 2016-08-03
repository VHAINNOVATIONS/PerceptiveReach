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

angular.module('ui.dashboard')
  .controller('WidgetSettingsCtrl', ['$scope', '$modalInstance', 'widget', function ($scope, $modalInstance, widget) {
    // add widget to scope
    $scope.widget = widget;

    // set up result object
    $scope.result = jQuery.extend(true, {}, widget);

    $scope.ok = function () {
      $modalInstance.close($scope.result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
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

angular.module('ui.dashboard')
  .controller('SaveChangesModalCtrl', ['$scope', '$modalInstance', 'layout', function ($scope, $modalInstance, layout) {
    
    // add layout to scope
    $scope.layout = layout;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  }]);
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

angular.module('ui.dashboard')
  .directive('dashboardLayouts', ['LayoutStorage', '$timeout', '$modal',
    function(LayoutStorage, $timeout, $modal) {
      return {
        scope: true,
        templateUrl: function(element, attr) {
          return attr.templateUrl ? attr.templateUrl : 'client/components/adf/directives/dashboardLayouts/dashboardLayouts.html';
        },
        link: function(scope, element, attrs) {

          scope.options = scope.$eval(attrs.dashboardLayouts);

          var layoutStorage = new LayoutStorage(scope.options);

          scope.layouts = layoutStorage.layouts;

          scope.createNewLayout = function() {
            var newLayout = {
              title: 'Custom',
              defaultWidgets: scope.options.defaultWidgets || []
            };
            layoutStorage.add(newLayout);
            scope.makeLayoutActive(newLayout);
            layoutStorage.save();
            return newLayout;
          };

          scope.removeLayout = function(layout) {
            layoutStorage.remove(layout);
            layoutStorage.save();
          };

          scope.makeLayoutActive = function(layout) {
            if(scope.common && scope.common.data && scope.common.data.EnterDataIsUnsaved == true){
              $(".unsavedDataAlert").fadeIn();
              return;
            }

            var current = layoutStorage.getActiveLayout();

            if (current && current.dashboard.unsavedChangeCount) {
              var modalInstance = $modal.open({
                templateUrl: 'client/components/adf/directives/dashboardLayouts/SaveChangesModal.html',
                resolve: {
                  layout: function() {
                    return layout;
                  }
                },
                controller: 'SaveChangesModalCtrl'
              });

              // Set resolve and reject callbacks for the result promise
              modalInstance.result.then(
                function() {
                  current.dashboard.saveDashboard();
                  scope._makeLayoutActive(layout);
                },
                function() {
                  scope._makeLayoutActive(layout);
                  $('div[dashboard-layouts=layoutOptions] li>a').filter(function () {
                     return $(this).text().trim() == layout.title;
                  }).click();
                }
              );
            } else {
              scope._makeLayoutActive(layout);
            }

          };

          scope._makeLayoutActive = function(layout) {
            angular.forEach(scope.layouts, function(l) {
              if (l !== layout) {
                l.active = false;
              } else {
                l.active = true;
              }
            });
            layoutStorage.save();
          };

          scope.isActive = function(layout) {
            return !!layout.active;
          };

          scope.editTitle = function(layout) {
            if (layout.locked) {
              return;
            }

            var input = element.find('input[data-layout="' + layout.id + '"]');
            layout.editingTitle = true;

            $timeout(function() {
              input.focus()[0].setSelectionRange(0, 9999);
            });
          };

          // saves whatever is in the title input as the new title
          scope.saveTitleEdit = function(layout) {
            layout.editingTitle = false;
            layoutStorage.save();
          };

          scope.options.saveLayouts = function() {
            layoutStorage.save(true);
          };
          scope.options.addWidget = function() {
            var layout = layoutStorage.getActiveLayout();
            if (layout) {
              layout.dashboard.addWidget.apply(layout.dashboard, arguments);
            }
          };
          scope.options.loadWidgets = function() {
            var layout = layoutStorage.getActiveLayout();
            if (layout) {
              layout.dashboard.loadWidgets.apply(layout.dashboard, arguments);
            }
          };
          scope.options.saveDashboard = function() {
            var layout = layoutStorage.getActiveLayout();
            if (layout) {
              layout.dashboard.saveDashboard.apply(layout.dashboard, arguments);
            }
          };

        }
      };
    }
  ]);
angular.module("ui.dashboard").run(["$templateCache", function($templateCache) {

  $templateCache.put("client/components/adf/directives/dashboard/altDashboard.html",
    "<div>\r" +
    "\n" +
    "    <div class=\"btn-toolbar\" ng-if=\"!options.hideToolbar\">\r" +
    "\n" +
    "        <div class=\"btn-group\" ng-if=\"!options.widgetButtons\">\r" +
    "\n" +
    "            <span class=\"dropdown\" on-toggle=\"toggled(open)\">\r" +
    "\n" +
    "              <button name=\"btnDropdown\" type=\"button\" class=\"btn btn-primary dropdown-toggle\" ng-disabled=\"disabled\">\r" +
    "\n" +
    "                Button dropdown <span class=\"caret\"></span>\r" +
    "\n" +
    "              </button>\r" +
    "\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                <li ng-repeat=\"widget in widgetDefs\">\r" +
    "\n" +
    "                  <a name=\"liWidgetName\" href=\"#\" ng-click=\"addWidgetInternal($event, widget);\" class=\"dropdown-toggle\">{{widget.name}}</a>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "              </ul>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"btn-group\" ng-if=\"options.widgetButtons\">\r" +
    "\n" +
    "            <button name=\"btnWidgetName\" ng-repeat=\"widget in widgetDefs\"\r" +
    "\n" +
    "                    ng-click=\"addWidgetInternal($event, widget);\" type=\"button\" class=\"btn btn-primary\">\r" +
    "\n" +
    "                {{widget.name}}\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button name=\"btnDefaultWidgets\" class=\"btn btn-warning\" ng-click=\"resetWidgetsToDefault()\">Default Widgets</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button name=\"btnUnsaved\" ng-if=\"options.storage && options.explicitSave\" ng-click=\"options.saveDashboard()\" class=\"btn btn-success\" ng-hide=\"!options.unsavedChangeCount\">{{ !options.unsavedChangeCount ? \"Alternative - No Changes\" : \"Save\" }}</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button name=\"btnClear\" ng-click=\"clear();\" ng-hide=\"!widgets.length\" type=\"button\" class=\"btn btn-info\">Clear</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ui-sortable=\"sortableOptions\" ng-model=\"widgets\" class=\"dashboard-widget-area\">\r" +
    "\n" +
    "        <div ng-repeat=\"widget in widgets\" ng-style=\"widget.style\" class=\"widget-container\" widget>\r" +
    "\n" +
    "            <div class=\"widget panel panel-default\">\r" +
    "\n" +
    "                <div class=\"widget-header panel-heading\">\r" +
    "\n" +
    "                    <h3 class=\"panel-title\">\r" +
    "\n" +
    "                        <span class=\"widget-title\" ng-dblclick=\"editTitle(widget)\" ng-hide=\"widget.editingTitle\">{{widget.title}}</span>\r" +
    "\n" +
    "                        <form action=\"\" class=\"widget-title\" ng-show=\"widget.editingTitle\" ng-submit=\"saveTitleEdit(widget)\">\r" +
    "\n" +
    "                            <input alt=\"Widget Title\" type=\"text\" ng-model=\"widget.title\" class=\"form-control\">\r" +
    "\n" +
    "                        </form>\r" +
    "\n" +
    "                        <span class=\"label label-primary\" ng-if=\"!options.hideWidgetName\">{{widget.name}}</span>\r" +
    "\n" +
    "                        <span ng-click=\"removeWidget(widget);\" class=\"glyphicon glyphicon-remove\" ng-if=\"!options.hideWidgetClose\"></span>\r" +
    "\n" +
    "                        <span ng-click=\"openWidgetSettings(widget);\" class=\"glyphicon glyphicon-cog\" ng-if=\"!options.hideWidgetSettings\"></span>\r" +
    "\n" +
    "                    </h3>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"panel-body widget-content\"></div>\r" +
    "\n" +
    "                <div class=\"widget-ew-resizer\" ng-mousedown=\"grabResizer($event)\"></div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

  $templateCache.put("client/components/adf/directives/dashboard/dashboard.html",
    "<div>\r" +
    "\n" +
    "    <div class=\"alert alert-warning unsavedDataAlert\">\r" +
    "\n" +
    "          <p>You have Unsaved changes in EnterData widget, Please Save or Undo changes and retry.</p>\r" +
    "\n" +
    "          <button name=\"btnSaveAlertOk\" alt=\"Unsaved Changes\" class=\"btn btn-primary\" ng-click=\"CloseSaveAlert()\">OK</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div offset=\"105\" style=\"z-index:5;background-color:white;\" sticky tabindex=\"-1\">\r" +
    "\n" +
    "        <div class=\"alert alert-success snoAlertBox\" data-alert=\"alert\">This widget has already been added to your dashboard. Please select a different widget to add.</div>\r" +
    "\n" +
    "        <div class=\"btn-toolbar\" ng-if=\"!options.hideToolbar\" style=\"padding-bottom:5px;padding-top:5px;border-bottom: 2px solid gray;\">\r" +
    "\n" +
    "\t\t<!--ul class=\"inline\"><li-->\r" +
    "\n" +
    "            <div class=\"btn-group\" ng-if=\"!options.widgetButtons\" data-ng-class=\"{open: open}\" tabindex=\"-1\">\r" +
    "\n" +
    "\t\t\t<span title=\"Add a Widget\">\r" +
    "\n" +
    "                  <button name=\"btnAddWidget\" data-toggle=\"dropdown\" alt=\"Add Widget\" class=\"btn btn-primary dropdown-toggle\">\r" +
    "\n" +
    "                    Add a Widget<span class=\"caret\"/>\r" +
    "\n" +
    "                  </button>\r" +
    "\n" +
    "                  <ul class=\"dropdown-menu\">\r" +
    "\n" +
    "                    <li ng-repeat=\"widget in widgetDefs\">\r" +
    "\n" +
    "                      <a name=\"liWidgetDropdown\"  alt=\"Add Widget {{widget.name}}\" title=\"Add Widget {{widget.name}}\" data-toggle=\"tooltip\" href=\"#\" ng-click=\"addWidgetInternal($event, widget);\" class=\"dropdown-toggle nav\"><span class=\"label label-primary\">{{widget.name}}</span></a>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                  </ul>\r" +
    "\n" +
    "\t\t\t\t </span> \r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t<!--/li></ul-->\r" +
    "\n" +
    "            <div class=\"btn-group\" ng-if=\"options.widgetButtons\" tabindex=\"-1\">\r" +
    "\n" +
    "                <button name=\"btnWidgetName\"  alt=\"Widget Name {{widget.name}}\" title=\"Widget Name {{widget.name}}\" ng-repeat=\"widget in widgetDefs\" ng-click=\"addWidgetInternal($event, widget);\" type=\"button\" class=\"btn btn-primary\">\r" +
    "\n" +
    "                    {{widget.name}}\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button name=\"btnDefaultWarning\"  alt=\"Default Widgets\" title=\"Default Widgets\"  class=\"btn btn-warning\" ng-click=\"resetWidgetsToDefault()\">Default Widgets</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button name=\"btnSave\" title=\"Save\" alt=\"Save\"  ng-if=\"options.storage && options.explicitSave\" ng-click=\"options.saveDashboard()\" class=\"btn btn-success\" ng-disabled=\"!options.unsavedChangeCount\">{{ !options.unsavedChangeCount ? \"all saved\" : \"save changes (\" + options.unsavedChangeCount + \")\" }}</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div style=\"height:100%;float:right;margin:10px 10px 0 5px;vertical-align:middle;\" ng-show=\" dashboardTitle == 'Individual View'\" title=\"Individual View Layout\">\r" +
    "\n" +
    "                <label alt=\"{{ PatientName }}\" style=\"font-weight:normal\">\r" +
    "\n" +
    "                    <span> {{ PatientName }}</span>\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"height:100%;float:right;margin:10px 10px 0 5px;vertical-align:middle;\" ng-show=\" dashboardTitle == 'Facility View'\" title=\"Facility View Layout\" >\r" +
    "\n" +
    "                <label alt=\"{{ FacilityName }}\" style=\"font-weight:normal\">\r" +
    "\n" +
    "                    <span> {{ FacilityName }}</span>\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"height:100%;float:right;margin:10px 10px 0 5px;vertical-align:middle;\" ng-show=\" dashboardTitle == 'Surveillance View'\"  title=\"Surveillance View Layout\" >\r" +
    "\n" +
    "                <label alt=\"{{VISN_FacilityName\" style=\"font-weight:normal\">\r" +
    "\n" +
    "                    <span> {{ VISN_FacilityName }}</span>\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div gridster=\"gridsterOpts\" style=\"margin-top:35px;\" class=\"dashboard-widget-area\" tabindex=\"-1\">\r" +
    "\n" +
    "    <ul ng-model=\"widgets\">\r" +
    "\n" +
    "        <li gridster-item=\"widget\" ng-repeat=\"widget in widgets\" class=\"gridsterContainer\" widget tabindex=\"-1\">\r" +
    "\n" +
    "              <div class=\"widget panel panel-default\" style=\"height:98%\">\r" +
    "\n" +
    "                <div class=\"widget-header panel-heading\" tabindex=\"-1\" style=\"height:45px;\">\r" +
    "\n" +
    "                    <div class=\"panel-title\">\r" +
    "\n" +
    "                        <span style=\"background-color: transparent;margin-right:3px;\" class=\"label-primary widget-title nav pull-left\">{{widget.title}}</span>\r" +
    "\n" +
    "                        <div id=\"widgetSettings\" style=\"display:inline-block; float:right; position:relative;\">\r" +
    "\n" +
    "                            <!--button ng-click=\"widget.contentStyle.display = widget.contentStyle.display === 'none' ? 'block' : 'none'\" style=\"background-color: transparent; float:left;\" class=\"glyphicon\" ng-class=\"{'glyphicon-plus': widget.contentStyle.display === 'none','glyphicon-minus': widget.contentStyle.display !== 'none'}\"></button-->\r" +
    "\n" +
    "                            <!--button ng-click=\"openWidgetSettings(widget);\" style=\"background-color: transparent; float:left;\" class=\"glyphicon glyphicon-cog\" ng-if=\"!options.hideWidgetSeyttings\"></button-->\r" +
    "\n" +
    "                            <button ng-click=\"removeWidget(widget);\" ng-keydown=\"keyDown($event)\" ng-keyup=\"keyUp($event)\"  ng-attr-title=\"{{widget.canClose == false? 'Resize/Move Widget':'Remove/Resize/Move Widget'}}\" alt=\"Remove Widget\" style=\"background-color: transparent; float:right;\" ng-class=\"(widget.canClose == false) ? 'glyphicon glyphicon-move' : 'glyphicon glyphicon-remove'\" ng-if=\"!options.hideWidgetClose\"></button>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"widget-content\" style=\"height:85%;\"></div>\r" +
    "\n" +
    "                <div class=\"widget-ew-resizer\" ng-mousedown=\"grabResizer($event)\"></div>\r" +
    "\n" +
    "                <div ng-if=\"widget.enableVerticalResize\" class=\"widget-s-resizer\" ng-mousedown=\"grabSouthResizer($event)\"></div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/adf/directives/dashboard/widget-settings-template.html",
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <button name=\"btnCancel\" alt=\"Cancel\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"cancel()\">&times;</button>\r" +
    "\n" +
    "  <p font-size=\"12\"><b>Widget Options:  </b><small>{{widget.title}}</small></p>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <form name=\"form\" novalidate class=\"form-horizontal\">\r" +
    "\n" +
    "        <div class=\"form-group\">\r" +
    "\n" +
    "            <label alt=\"Widget Title\" for=\"widgetTitle\" class=\"col-sm-2 control-label\">Title</label>\r" +
    "\n" +
    "            <div class=\"col-sm-10\">\r" +
    "\n" +
    "                <input alt=\"Result Title\" id=\"widgetTitle\" type=\"text\" class=\"form-control\" name=\"widgetTitle\" ng-model=\"result.title\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-if=\"widget.settingsModalOptions.partialTemplateUrl\"\r" +
    "\n" +
    "             ng-include=\"widget.settingsModalOptions.partialTemplateUrl\"></div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button name=\"btn2Cancel\" alt=\"cancel\" type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\r" +
    "\n" +
    "    <button name=\"btnOK\" alt=\"ok\" type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/adf/directives/dashboardLayouts/SaveChangesModal.html",
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <button name=\"btnCancel\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"cancel()\">&times;</button>\r" +
    "\n" +
    "  <h3>Unsaved Changes to \"{{layout.title}}\"</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <p>You have {{layout.dashboard.unsavedChangeCount}} unsaved changes on this dashboard. Would you like to save them? </p>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button name=\"btn2Cancel\" type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\r" +
    "\n" +
    "    <button name=\"btnSave\" type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">Save</button>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/adf/directives/dashboardLayouts/dashboardLayouts.html",
    "<ul ng-model=\"layouts\" class=\"nav nav-tabs layout-tabs\" offset=\"59\" style=\"z-index:5;background-color:white;\" sticky>\r" +
    "\n" +
    "    <li ng-repeat=\"layout in layouts\" ng-class=\"{ active: layout.active }\">\r" +
    "\n" +
    "        <a ng-click=\"makeLayoutActive(layout)\" alt=\"{{layout.title}}\" title=\"{{layout.title}}\" tabindex=\"0\">\r" +
    "\n" +
    "            <span ng-dblclick=\"editTitle(layout)\"  ng-show=\"!layout.editingTitle\">{{layout.title}}</span>\r" +
    "\n" +
    "            <form action=\"\" class=\"layout-title\" ng-show=\"layout.editingTitle\" ng-submit=\"saveTitleEdit(layout)\">\r" +
    "\n" +
    "                <input type=\"text\" ng-model=\"layout.title\" class=\"form-control\" data-layout=\"{{layout.id}}\">\r" +
    "\n" +
    "            </form>\r" +
    "\n" +
    "            <span ng-if=\"!layout.locked\" ng-click=\"removeLayout(layout)\" class=\"glyphicon glyphicon-remove remove-layout-icon\"></span>\r" +
    "\n" +
    "            <!-- <span class=\"glyphicon glyphicon-pencil\"></span> -->\r" +
    "\n" +
    "            <!-- <span class=\"glyphicon glyphicon-remove\"></span> -->\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "    <label class=\"pull-right\" style=\"padding:5px;font-weight:normal;\">Data Last Updated:{{options.dataLastUpdated | date: \"MM-dd-yyyy\"}}  <a style=\"border-left:1px solid gray;padding-left:5px;font-size:12px;\" href=\"mailto:vaperceptivereachsupport@va.gov?Subject=Perceptive Reach Dashboard Support\">Contact Help Desk</a></label>\r" +
    "\n" +
    "</ul>\r" +
    "\n" +
    "<div ng-repeat=\"layout in layouts | filter:isActive\" dashboard=\"layout.dashboard\" template-url=\"client/components/adf/directives/dashboard/dashboard.html\" dashboard-title=\"layout.title\"></div>"
  );

}]);

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

angular.module('ui.dashboard')
  .controller('DashboardWidgetCtrl', ['$scope', '$element', '$compile', '$window', '$timeout',
    function($scope, $element, $compile, $window, $timeout) {

      $scope.status = {
        isopen: false
      };

      // Fills "container" with compiled view
      $scope.makeTemplateString = function() {

        var widget = $scope.widget;

        // First, build template string
        var templateString = '';

        if (widget.templateUrl) {

          // Use ng-include for templateUrl
          templateString = '<div ng-include="\'' + widget.templateUrl + '\'"></div>';

        } else if (widget.template) {

          // Direct string template
          templateString = widget.template;

        } else {

          // Assume attribute directive
          templateString = '<div ' + widget.directive;

          // Check if data attribute was specified
          if (widget.dataAttrName) {
            widget.attrs = widget.attrs || {};
            widget.attrs[widget.dataAttrName] = 'widgetData';
          }

          // Check for specified attributes
          if (widget.attrs) {

            // First check directive name attr
            if (widget.attrs[widget.directive]) {
              templateString += '="' + widget.attrs[widget.directive] + '"';
            }

            // Add attributes
            _.each(widget.attrs, function(value, attr) {

              // make sure we aren't reusing directive attr
              if (attr !== widget.directive) {
                templateString += ' ' + attr + '="' + value + '"';
              }

            });
          }
          templateString += '></div>';
        }
        return templateString;
      };

      $scope.grabResizer = function(e) {

        var widget = $scope.widget;
        var widgetElm = $element.find('.widget');

        // ignore middle- and right-click
        if (e.which !== 1) {
          return;
        }

        e.stopPropagation();
        e.originalEvent.preventDefault();

        // get the starting horizontal position
        var initX = e.clientX;
        // console.log('initX', initX);

        // Get the current width of the widget and dashboard
        var pixelWidth = widgetElm.width();
        var pixelHeight = widgetElm.height();
        var widgetStyleWidth = widget.containerStyle.width;
        var widthUnits = widget.widthUnits;
        var unitWidth = parseFloat(widgetStyleWidth);

        // create marquee element for resize action
        var $marquee = angular.element('<div class="widget-resizer-marquee" style="height: ' + pixelHeight + 'px; width: ' + pixelWidth + 'px;"></div>');
        widgetElm.append($marquee);

        // determine the unit/pixel ratio
        var transformMultiplier = unitWidth / pixelWidth;

        // updates marquee with preview of new width
        var mousemove = function(e) {
          var curX = e.clientX;
          var pixelChange = curX - initX;
          var newWidth = pixelWidth + pixelChange;
          $marquee.css('width', newWidth + 'px');
        };

        // sets new widget width on mouseup
        var mouseup = function(e) {
          // remove listener and marquee
          jQuery($window).off('mousemove', mousemove);
          $marquee.remove();

          // calculate change in units
          var curX = e.clientX;
          var pixelChange = curX - initX;
          var unitChange = Math.round(pixelChange * transformMultiplier * 100) / 100;

          // add to initial unit width
          var newWidth = unitWidth * 1 + unitChange;
          widget.setWidth(newWidth, widthUnits);
          $scope.$emit('widgetChanged', widget);
          $scope.$apply();
          $scope.$broadcast('widgetResized', {
            width: newWidth
          });
        };

        jQuery($window).on('mousemove', mousemove).one('mouseup', mouseup);
      };

      //TODO refactor
      $scope.grabSouthResizer = function(e) {
        var widgetElm = $element.find('.widget');

        // ignore middle- and right-click
        if (e.which !== 1) {
          return;
        }

        e.stopPropagation();
        e.originalEvent.preventDefault();

        // get the starting horizontal position
        var initY = e.clientY;
        // console.log('initX', initX);

        // Get the current width of the widget and dashboard
        var pixelWidth = widgetElm.width();
        var pixelHeight = widgetElm.height();

        // create marquee element for resize action
        var $marquee = angular.element('<div class="widget-resizer-marquee" style="height: ' + pixelHeight + 'px; width: ' + pixelWidth + 'px;"></div>');
        widgetElm.append($marquee);

        // updates marquee with preview of new height
        var mousemove = function(e) {
          var curY = e.clientY;
          var pixelChange = curY - initY;
          var newHeight = pixelHeight + pixelChange;
          $marquee.css('height', newHeight + 'px');
        };

        // sets new widget width on mouseup
        var mouseup = function(e) {
          // remove listener and marquee
          jQuery($window).off('mousemove', mousemove);
          $marquee.remove();

          // calculate height change
          var curY = e.clientY;
          var pixelChange = curY - initY;

          //var widgetContainer = widgetElm.parent(); // widget container responsible for holding widget width and height
          var widgetContainer = widgetElm.find('.widget-content');

          var diff = pixelChange;
          var height = parseInt(widgetContainer.css('height'), 10);
          var newHeight = (height + diff);

          //$scope.widget.style.height = newHeight + 'px';

          $scope.widget.setHeight(newHeight + 'px');

          $scope.$emit('widgetChanged', $scope.widget);
          $scope.$apply(); // make AngularJS to apply style changes

          $scope.$broadcast('widgetResized', {
            height: newHeight
          });
        };

        jQuery($window).on('mousemove', mousemove).one('mouseup', mouseup);
      };

      // replaces widget title with input
      $scope.editTitle = function(widget) {
        var widgetElm = $element.find('.widget');
        widget.editingTitle = true;
        // HACK: get the input to focus after being displayed.
        $timeout(function() {
          widgetElm.find('form.widget-title input:eq(0)').focus()[0].setSelectionRange(0, 9999);
        });
      };

      // saves whatever is in the title input as the new title
      $scope.saveTitleEdit = function(widget) {
        widget.editingTitle = false;
        $scope.$emit('widgetChanged', widget);
      };

      $scope.compileTemplate = function() {
        var container = $scope.findWidgetContainer($element);
        var templateString = $scope.makeTemplateString();
        var widgetElement = angular.element(templateString);

        container.empty();
        container.append(widgetElement);
        $compile(widgetElement)($scope);
      };

      $scope.findWidgetContainer = function(element) {
        // widget placeholder is the first (and only) child of .widget-content
        return element.find('.widget-content');
      };
    }
  ]);
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

angular.module('ui.dashboard')
  .directive('widget', ['$injector', function ($injector) {

    return {

      controller: 'DashboardWidgetCtrl',

      link: function (scope) {

        var widget = scope.widget;
        var dataModelType = widget.dataModelType;

        // set up data source
        if (dataModelType) {
          var DataModelConstructor; // data model constructor function

          if (angular.isFunction(dataModelType)) {
            DataModelConstructor = dataModelType;
          } else if (angular.isString(dataModelType)) {
            $injector.invoke([dataModelType, function (DataModelType) {
              DataModelConstructor = DataModelType;
            }]);
          } else {
            throw new Error('widget dataModelType should be function or string');
          }

          var ds;
          if (widget.dataModelArgs) {
            ds = new DataModelConstructor(widget.dataModelArgs);
          } else {
            ds = new DataModelConstructor();
          }
          widget.dataModel = ds;
          ds.setup(widget, scope);
          ds.init();
          scope.$on('$destroy', _.bind(ds.destroy,ds));
        }

        // Compile the widget template, emit add event
        scope.compileTemplate();
        scope.$emit('widgetAdded', widget);

      }

    };
  }]);

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

angular.module('ui.dashboard')
  .factory('DashboardState', ['$log', '$q', function ($log, $q) {
    function DashboardState(storage, id, hash, widgetDefinitions, stringify) {
      this.storage = storage;
      this.id = id;
      this.hash = hash;
      this.widgetDefinitions = widgetDefinitions;
      this.stringify = stringify;
    }

    DashboardState.prototype = {
      /**
       * Takes array of widget instance objects, serializes, 
       * and saves state.
       * 
       * @param  {Array} widgets  scope.widgets from dashboard directive
       * @return {Boolean}        true on success, false on failure
       */
      save: function (widgets) {
        
        if (!this.storage) {
          return true;
        }

        var serialized = _.map(widgets, function (widget) {
          var temp = widget.serialize();
          var w = $.extend( true, {}, temp );
          if(_.has(w,"dataModelOptions") && _.has(w.dataModelOptions,"common") && _.has(w.dataModelOptions.common,"data") 
            && _.has(w.dataModelOptions.common.data,"veteranObj") && _.has(w.dataModelOptions.common.data.veteranObj,"OutreachStatus"))
          {
            delete w.dataModelOptions.common.data.veteranObj.OutreachStatus;
          }
          w.col = widget.col;
          w.row = widget.row;
          w.sizeX = widget.sizeX;
          w.sizeY = widget.sizeY;
          return w;
        });

        var item = { widgets: serialized, hash: this.hash };

        if (this.stringify) {
          item = JSON.stringify(item);
        }
        
        this.storage.setItem(this.id, item);
        return true;
      },

      /**
       * Loads dashboard state from the storage object.
       * Can handle a synchronous response or a promise.
       * 
       * @return {Array|Promise} Array of widget definitions or a promise
       */
      load: function () {

        if (!this.storage) {
          return null;
        }

        var serialized;

        // try loading storage item
        serialized = this.storage.getItem( this.id );

        if (serialized) {
          // check for promise
          if (angular.isObject(serialized) && angular.isFunction(serialized.then)) {
            return this._handleAsyncLoad(serialized);
          }
          // otherwise handle synchronous load
          return this._handleSyncLoad(serialized);
        } else {
          return null;
        }
      },

      _handleSyncLoad: function(serialized) {

        var deserialized, result = [];

        if (!serialized) {
          return null;
        }

        if (this.stringify) {
          try { // to deserialize the string

            deserialized = JSON.parse(serialized);

          } catch (e) {

            // bad JSON, log a warning and return
            $log.warn('Serialized dashboard state was malformed and could not be parsed: ', serialized);
            return null;

          }
        }
        else {
          deserialized = serialized;
        }

        // check hash against current hash
        if (deserialized.hash !== this.hash) {

          $log.info('Serialized dashboard from storage was stale (old hash: ' + deserialized.hash + ', new hash: ' + this.hash + ')');
          this.storage.removeItem(this.id);
          return null;

        }

        // Cache widgets
        var savedWidgetDefs = deserialized.widgets;

        // instantiate widgets from stored data
        for (var i = 0; i < savedWidgetDefs.length; i++) {

          // deserialized object
          var savedWidgetDef = savedWidgetDefs[i];

          // widget definition to use
          var widgetDefinition = this.widgetDefinitions.getByName(savedWidgetDef.name);

          // check for no widget
          if (!widgetDefinition) {
            // no widget definition found, remove and return false
            $log.warn('Widget with name "' + savedWidgetDef.name + '" was not found in given widget definition objects');
            continue;
          }

          // check widget-specific storageHash
          if (widgetDefinition.hasOwnProperty('storageHash') && widgetDefinition.storageHash !== savedWidgetDef.storageHash) {
            // widget definition was found, but storageHash was stale, removing storage
            $log.info('Widget Definition Object with name "' + savedWidgetDef.name + '" was found ' +
              'but the storageHash property on the widget definition is different from that on the ' +
              'serialized widget loaded from storage. hash from storage: "' + savedWidgetDef.storageHash + '"' +
              ', hash from WDO: "' + widgetDefinition.storageHash + '"');
            continue;
          }

          // push instantiated widget to result array
          result.push(savedWidgetDef);
        }

        return result;
      },

      _handleAsyncLoad: function(promise) {
        var self = this;
        var deferred = $q.defer();
        promise.then(
          // success
          function(res) {
            var result = self._handleSyncLoad(res);
            if (result) {
              deferred.resolve(result);
            } else {
              deferred.reject(result);
            }
          },
          // failure
          function(res) {
            deferred.reject(res);
          }
        );

        return deferred.promise;
      }

    };
    return DashboardState;
  }]);
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

angular.module('ui.dashboard')
  .factory('LayoutStorage', function(Dashboard) {

    var noopStorage = {
      setItem: function() {

      },
      getItem: function() {

      },
      removeItem: function() {

      }
    };

    

    function LayoutStorage(options) {

      var defaults = {
        storage: noopStorage,
        storageHash: '',
        stringifyStorage: true
      };

      angular.extend(defaults, options);
      angular.extend(options, defaults);
       
      this.id = options.storageId;
      this.storage = options.storage;
      this.storageHash = options.storageHash;
      this.stringifyStorage = options.stringifyStorage;
      this.widgetDefinitions = options.widgetDefinitions;
      this.defaultLayouts = options.defaultLayouts;
      this.lockDefaultLayouts = options.lockDefaultLayouts;
      this.widgetButtons = options.widgetButtons;
      this.explicitSave = options.explicitSave;
      this.defaultWidgets = options.defaultWidgets;
      this.settingsModalOptions = options.settingsModalOptions;
      this.onSettingsClose = options.onSettingsClose;
      this.onSettingsDismiss = options.onSettingsDismiss;
      this.options = options;
      this.options.unsavedChangeCount = 0;

      this.layouts = [];
      this.states = {};
      this.load();
      this._ensureActiveLayout();
    }

    LayoutStorage.prototype = {

      add: function(layouts) {
        if (!angular.isArray(layouts)) {
          layouts = [layouts];
        }
        var self = this;
        angular.forEach(layouts, function(layout) {
          layout.dashboard = layout.dashboard || {};
          layout.dashboard.storage = self;
          layout.dashboard.storageId = layout.id = self._getLayoutId.call(self,layout);
          layout.dashboard.widgetDefinitions = self._getProperWidgetDefinitions(layout.widgetDefinitions, self.widgetDefinitions);//layout.widgetDefinitions || self.widgetDefinitions; // PerceptiveReach change
          layout.dashboard.stringifyStorage = false;
          layout.dashboard.defaultWidgets = layout.defaultWidgets || self.defaultWidgets;
          layout.dashboard.widgetButtons = self.widgetButtons;
          layout.dashboard.explicitSave = self.explicitSave;
          layout.dashboard.settingsModalOptions = self.settingsModalOptions;
          layout.dashboard.onSettingsClose = self.onSettingsClose;
          layout.dashboard.onSettingsDismiss = self.onSettingsDismiss;
          self.layouts.push(layout);
        });
      },

      remove: function(layout) {
        var index = this.layouts.indexOf(layout);
        if (index >= 0) {
          this.layouts.splice(index, 1);
          delete this.states[layout.id];

          // check for active
          if (layout.active && this.layouts.length) {
            var nextActive = index > 0 ? index - 1 : 0;
            this.layouts[nextActive].active = true;
          }
        }
      },

      save: function() {

        var state = {
          layouts: this._serializeLayouts(),
          states: this.states,
          storageHash: this.storageHash
        };

        var sessionStore = JSON.parse(sessionStorage.getItem('user'));
        
        if(sessionStore)
        {
          sessionStore.DashboardData = state;
          sessionStorage.setItem("user", JSON.stringify(sessionStore)); 
        }

        if (this.stringifyStorage) {
          state = JSON.stringify(state);
        }

        this.storage.setItem(this.id, state);
        this.options.unsavedChangeCount = 0;

        Dashboard.saveDashboard({id: this.id, data: state});
        //console.log("Inside save function for LayoutStorage: ");
      },

      load: function() {

        var serialized = this.storage.getItem(this.id);

        this.clear();

        if (serialized) {
          // check for promise
          if (angular.isObject(serialized) && angular.isFunction(serialized.then)) {
            this._handleAsyncLoad(serialized);
          } else {
            this._handleSyncLoad(serialized);
          }
        } else {
          this._addDefaultLayouts();
        }
      },

      clear: function() {
        this.layouts = [];
        this.states = {};
      },

      setItem: function(id, value) {
        this.states[id] = value;
        this.save();
      },

      getItem: function(id) {
        return this.states[id];
      },

      removeItem: function(id) {
        delete this.states[id];
        this.save();
      },

      getActiveLayout: function() {
        var len = this.layouts.length;
        for (var i = 0; i < len; i++) {
          var layout = this.layouts[i];
          if (layout.active) {
            return layout;
          }
        }
        return false;
      },

      _addDefaultLayouts: function() {
        var self = this;
        var defaults = this.lockDefaultLayouts ? { locked: true } : {};
        angular.forEach(this.defaultLayouts, function(layout) {
          self.add(angular.extend(_.clone(defaults), layout));
        });
      },

      _serializeLayouts: function() {
        var result = [];
        angular.forEach(this.layouts, function(l) {
          result.push({
            title: l.title,
            id: l.id,
            active: l.active,
            locked: l.locked,
            defaultWidgets: l.dashboard.defaultWidgets
          });
        });
        return result;
      },

      _handleSyncLoad: function(serialized) {
        
        var deserialized;

        if (this.stringifyStorage) {
          try {

            deserialized = JSON.parse(serialized);

          } catch (e) {
            this._addDefaultLayouts();
            return;
          }
        } else {

          deserialized = serialized;

        }

        if (this.storageHash !== deserialized.storageHash) {
          this._addDefaultLayouts();
          return;
        }
        this.states = deserialized.states;
        this.add(deserialized.layouts);
      },

      _handleAsyncLoad: function(promise) {
        var self = this;
        promise.then(
          angular.bind(self, this._handleSyncLoad),
          angular.bind(self, this._addDefaultLayouts)
        );
      },

      _ensureActiveLayout: function() {
        for (var i = 0; i < this.layouts.length; i++) {
          var layout = this.layouts[i];
          if (layout.active) {
            return;
          }
        }
        if (this.layouts[0]) {
          this.layouts[0].active = true;
        }
      },

      _getLayoutId: function(layout) {
        if (layout.id) {
          return layout.id;
        }
        var max = 0;
        for (var i = 0; i < this.layouts.length; i++) {
          var id = this.layouts[i].id;
          max = Math.max(max, id * 1);
        }
        return max + 1;
      },

      _getProperWidgetDefinitions: function(widgetDefinitionsLayout, widgetDefinitionsAll)
      {
        var someView = [];        
        var widget = null;

        if (widgetDefinitionsLayout == null)
          return widgetDefinitionsAll;
        
        else if (widgetDefinitionsLayout != null && widgetDefinitionsLayout.length == 0)
          return widgetDefinitionsLayout;
        
        else{
          for(var widgetIdx in widgetDefinitionsLayout){
            widget = widgetDefinitionsLayout[widgetIdx];
            someView.push(_.filter(widgetDefinitionsAll,{'name': widget.name})[0]);                     
          }  
        }          
        //console.log("LayoutViewWidgets:",someView);
        return someView;
      }

    };
    return LayoutStorage;
  });
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

angular.module('ui.dashboard')
  .factory('WidgetDataModel', function () {
    function WidgetDataModel() {
    }

    WidgetDataModel.prototype = {
      setup: function (widget, scope) {
        this.dataAttrName = widget.dataAttrName;
        this.dataModelOptions = widget.dataModelOptions;
        this.widgetScope = scope;
      },

      updateScope: function (data) {
        this.widgetScope.widgetData = data;
      },

      init: function () {
        // to be overridden by subclasses
      },

      destroy: function () {
        // to be overridden by subclasses
      }
    };

    return WidgetDataModel;
  });
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

angular.module('ui.dashboard')
  .factory('WidgetDefCollection', function () {

    function convertToDefinition(d) {
      if (typeof d === 'function') {
        return new d();
      }
      return d;
    }

    function WidgetDefCollection(widgetDefs) {
      
      widgetDefs = widgetDefs.map(convertToDefinition);

      this.push.apply(this, widgetDefs);

      // build (name -> widget definition) map for widget lookup by name
      var map = {};
      _.each(widgetDefs, function (widgetDef) {
        map[widgetDef.name] = widgetDef;
      });
      this.map = map;
    }

    WidgetDefCollection.prototype = Object.create(Array.prototype);

    WidgetDefCollection.prototype.getByName = function (name) {
      return this.map[name];
    };

    WidgetDefCollection.prototype.add = function(def) {
      def = convertToDefinition(def);
      this.push(def);
      this.map[def.name] = def;
    };

    return WidgetDefCollection;
  });

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

angular.module('ui.dashboard')
  .factory('WidgetModel', function ($log) {

    function defaults() {
      return {
        title: 'Widget',
        style: {},
        size: {},
        enableVerticalResize: true,
        containerStyle: { width: '33%' }, // default width
        contentStyle: {}
      };
    };

    // constructor for widget model instances
    function WidgetModel(widgetDefinition, overrides) {
  
      // Extend this with the widget definition object with overrides merged in (deep extended).
      angular.extend(this, defaults(), _.merge(angular.copy(widgetDefinition), overrides));

      this.updateContainerStyle(this.style);

      if (!this.templateUrl && !this.template && !this.directive) {
        this.directive = widgetDefinition.name;
      }

      if (this.size && _.has(this.size, 'height')) {
        this.setHeight(this.size.height);
      }

      if (this.style && _.has(this.style, 'width')) { //TODO deprecate style attribute
        this.setWidth(this.style.width);
      }

      if (this.size && _.has(this.size, 'width')) {
        this.setWidth(this.size.width);
      }
    }

    WidgetModel.prototype = {
      // sets the width (and widthUnits)
      setWidth: function (width, units) {
        width = width.toString();
        units = units || width.replace(/^[-\.\d]+/, '') || '%';

        this.widthUnits = units;
        width = parseFloat(width);

        if (width < 0 || isNaN(width)) {
          $log.warn('malhar-angular-dashboard: setWidth was called when width was ' + width);
          return false;
        }

        if (units === '%') {
          width = Math.min(100, width);
          width = Math.max(0, width);
        }

        this.containerStyle.width = width + '' + units;

        this.updateSize(this.containerStyle);

        return true;
      },

      setHeight: function (height) {
        this.contentStyle.height = height;
        this.updateSize(this.contentStyle);
      },

      setStyle: function (style) {
        this.style = style;
        this.updateContainerStyle(style);
      },

      updateSize: function (size) {
        angular.extend(this.size, size);
      },

      updateContainerStyle: function (style) {
        angular.extend(this.containerStyle, style);
      },

      compactObject : function(o) {
         var clone = _.clone(o);
         _.each(clone, function(v, k) {
           if(!v || _.isEmpty(v)) {
             clone[k] = undefined;
           }
         });
         return clone;
      },

      serialize: function() {
        return _.pick(this.compactObject(this), ['title', 'name', 'style', 'size', 'dataModelOptions', 'attrs', 'storageHash']);
      }
    };

    return WidgetModel;
  });