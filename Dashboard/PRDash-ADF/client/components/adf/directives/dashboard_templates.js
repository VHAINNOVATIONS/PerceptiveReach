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
    "              <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" ng-disabled=\"disabled\">\r" +
    "\n" +
    "                Button dropdown <span class=\"caret\"></span>\r" +
    "\n" +
    "              </button>\r" +
    "\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                <li ng-repeat=\"widget in widgetDefs\">\r" +
    "\n" +
    "                  <a href=\"#\" ng-click=\"addWidgetInternal($event, widget);\" class=\"dropdown-toggle\">{{widget.name}}</a>\r" +
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
    "            <button ng-repeat=\"widget in widgetDefs\"\r" +
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
    "        <button class=\"btn btn-warning\" ng-click=\"resetWidgetsToDefault()\">Default Widgets</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button ng-if=\"options.storage && options.explicitSave\" ng-click=\"options.saveDashboard()\" class=\"btn btn-success\" ng-hide=\"!options.unsavedChangeCount\">{{ !options.unsavedChangeCount ? \"Alternative - No Changes\" : \"Save\" }}</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button ng-click=\"clear();\" ng-hide=\"!widgets.length\" type=\"button\" class=\"btn btn-info\">Clear</button>\r" +
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
    "                            <input type=\"text\" ng-model=\"widget.title\" class=\"form-control\">\r" +
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
    "    <div class=\"btn-toolbar\" ng-if=\"!options.hideToolbar\">\r" +
    "\n" +
    "        <div class=\"btn-group\" ng-if=\"!options.widgetButtons\">\r" +
    "\n" +
    "            <span class=\"dropdown\" on-toggle=\"toggled(open)\">\r" +
    "\n" +
    "              <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\">\r" +
    "\n" +
    "                Button dropdown <span class=\"caret\"></span>\r" +
    "\n" +
    "              </button>\r" +
    "\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                <li ng-repeat=\"widget in widgetDefs\">\r" +
    "\n" +
    "                  <a href=\"#\" ng-click=\"addWidgetInternal($event, widget);\" class=\"dropdown-toggle\"><span class=\"label label-primary\">{{widget.name}}</span></a>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "              </ul>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "        <div class=\"btn-group\" ng-if=\"options.widgetButtons\">\r" +
    "\n" +
    "            <button ng-repeat=\"widget in widgetDefs\"\r" +
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
    "        <button class=\"btn btn-warning\" ng-click=\"resetWidgetsToDefault()\">Default Widgets</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button ng-if=\"options.storage && options.explicitSave\" ng-click=\"options.saveDashboard()\" class=\"btn btn-success\" ng-disabled=\"!options.unsavedChangeCount\">{{ !options.unsavedChangeCount ? \"all saved\" : \"save changes (\" + options.unsavedChangeCount + \")\" }}</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button ng-click=\"clear();\" type=\"button\" class=\"btn btn-info\">Clear</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ui-sortable=\"sortableOptions\" ng-model=\"widgets\" class=\"dashboard-widget-area\">\r" +
    "\n" +
    "        <div ng-repeat=\"widget in widgets\" ng-style=\"widget.containerStyle\" class=\"widget-container\" widget>\r" +
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
    "                            <input type=\"text\" ng-model=\"widget.title\" class=\"form-control\">\r" +
    "\n" +
    "                        </form>\r" +
    "\n" +
    "                        <span class=\"label label-primary\" ng-if=\"!options.hideWidgetName\">{{widget.name}}</span>\r" +
    "\n" +
    "                        <span ng-click=\"removeWidget(widget);\" class=\"glyphicon glyphicon-remove\" ng-if=\"!options.hideWidgetClose\"></span>\r" +
    "\n" +
    "                        <span ng-click=\"openWidgetSettings(widget);\" class=\"glyphicon glyphicon-cog\" ng-if=\"!options.hideWidgetSettings\"></span>\r" +
    "\n" +
    "                        <span ng-click=\"widget.contentStyle.display = widget.contentStyle.display === 'none' ? 'block' : 'none'\" class=\"glyphicon\" ng-class=\"{'glyphicon-plus': widget.contentStyle.display === 'none', 'glyphicon-minus': widget.contentStyle.display !== 'none' }\"></span>\r" +
    "\n" +
    "                    </h3>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"panel-body widget-content\" ng-style=\"widget.contentStyle\"></div>\r" +
    "\n" +
    "                <div class=\"widget-ew-resizer\" ng-mousedown=\"grabResizer($event)\"></div>\r" +
    "\n" +
    "                <div ng-if=\"widget.enableVerticalResize\" class=\"widget-s-resizer\" ng-mousedown=\"grabSouthResizer($event)\"></div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/adf/directives/dashboard/widget-settings-template.html",
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"cancel()\">&times;</button>\r" +
    "\n" +
    "  <h3>Widget Options <small>{{widget.title}}</small></h3>\r" +
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
    "            <label for=\"widgetTitle\" class=\"col-sm-2 control-label\">Title</label>\r" +
    "\n" +
    "            <div class=\"col-sm-10\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" name=\"widgetTitle\" ng-model=\"result.title\">\r" +
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
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/adf/directives/dashboardLayouts/SaveChangesModal.html",
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"cancel()\">&times;</button>\r" +
    "\n" +
    "  <h3>Unsaved Changes to \"{{layout.title}}\"</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <p>You have {{layout.dashboard.unsavedChangeCount}} unsaved changes on this dashboard. Would you like to save them?</p>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Don't Save</button>\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">Save</button>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/adf/directives/dashboardLayouts/dashboardLayouts.html",
    "<ul ui-sortable=\"sortableOptions\" ng-model=\"layouts\" class=\"nav nav-tabs layout-tabs\">\r" +
    "\n" +
    "    <li ng-repeat=\"layout in layouts\" ng-class=\"{ active: layout.active }\">\r" +
    "\n" +
    "        <a ng-click=\"makeLayoutActive(layout)\">\r" +
    "\n" +
    "            <span ng-dblclick=\"editTitle(layout)\" ng-show=\"!layout.editingTitle\">{{layout.title}}</span>\r" +
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
    "    <li>\r" +
    "\n" +
    "        <a ng-click=\"createNewLayout()\">\r" +
    "\n" +
    "            <span class=\"glyphicon glyphicon-plus\"></span>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "</ul>\r" +
    "\n" +
    "<div ng-repeat=\"layout in layouts | filter:isActive\" dashboard=\"layout.dashboard\" template-url=\"components/adf/directives/dashboard/dashboard.html\"></div>"
  );

}]);
