angular.module("ui.dashboard").run(["$templateCache", function($templateCache) {

  $templateCache.put("client/components/adf/directives/dashboard/altDashboard.html",
    "<div>\n" +
    "    <div class=\"btn-toolbar\" ng-if=\"!options.hideToolbar\">\n" +
    "        <div class=\"btn-group\" ng-if=\"!options.widgetButtons\">\n" +
    "            <span class=\"dropdown\" on-toggle=\"toggled(open)\">\n" +
    "              <button name=\"btnDropdown\" type=\"button\" class=\"btn btn-primary dropdown-toggle\" ng-disabled=\"disabled\">\n" +
    "                Button dropdown<span class=\"caret\"></span>\n" +
    "              </button>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                <li ng-repeat=\"widget in widgetDefs\">\n" +
    "                  <a name=\"liWidgetName\" href=\"#\" ng-click=\"addWidgetInternal($event, widget);\" class=\"dropdown-toggle\">{{widget.name}}</a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"btn-group\" ng-if=\"options.widgetButtons\">\n" +
    "            <button name=\"btnWidgetName\" ng-repeat=\"widget in widgetDefs\"\n" +
    "                    ng-click=\"addWidgetInternal($event, widget);\" type=\"button\" class=\"btn btn-primary\">\n" +
    "                {{widget.name}}\n" +
    "            </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <button name=\"btnDefaultWidgets\" class=\"btn btn-warning\" ng-click=\"resetWidgetsToDefault()\">Default Widgets</button>\n" +
    "\n" +
    "        <button name=\"btnUnsaved\" ng-if=\"options.storage && options.explicitSave\" ng-click=\"options.saveDashboard()\" class=\"btn btn-success\" ng-hide=\"!options.unsavedChangeCount\">{{ !options.unsavedChangeCount ? \"Alternative - No Changes\" : \"Save\" }}</button>\n" +
    "\n" +
    "        <button name=\"btnClear\" ng-click=\"clear();\" ng-hide=\"!widgets.length\" type=\"button\" class=\"btn btn-info\">Clear</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ui-sortable=\"sortableOptions\" ng-model=\"widgets\" class=\"dashboard-widget-area\">\n" +
    "        <div ng-repeat=\"widget in widgets\" ng-style=\"widget.style\" class=\"widget-container\" widget>\n" +
    "            <div class=\"widget panel panel-default\">\n" +
    "                <div class=\"widget-header panel-heading\">\n" +
    "                    <h3 class=\"panel-title\">\n" +
    "                        <span class=\"widget-title\" ng-dblclick=\"editTitle(widget)\" ng-hide=\"widget.editingTitle\">{{widget.title}}</span>\n" +
    "                        <form action=\"\" class=\"widget-title\" ng-show=\"widget.editingTitle\" ng-submit=\"saveTitleEdit(widget)\">\n" +
    "                            <input alt=\"Widget Title\" type=\"text\" ng-model=\"widget.title\" class=\"form-control\">\n" +
    "                        </form>\n" +
    "                        <span class=\"label label-primary\" ng-if=\"!options.hideWidgetName\">{{widget.name}}</span>\n" +
    "                        <span ng-click=\"removeWidget(widget);\" class=\"glyphicon glyphicon-remove\" ng-if=\"!options.hideWidgetClose\"></span>\n" +
    "                        <span ng-click=\"openWidgetSettings(widget);\" class=\"glyphicon glyphicon-cog\" ng-if=\"!options.hideWidgetSettings\"></span>\n" +
    "                    </h3>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body widget-content\"></div>\n" +
    "                <div class=\"widget-ew-resizer\" ng-mousedown=\"grabResizer($event)\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

  $templateCache.put("client/components/adf/directives/dashboard/dashboard.html",
    "<div>\n" +
    "    <div offset=\"105\" style=\"z-index:5;background-color:white;\" sticky tabindex=\"-1\">\n" +
    "        <div class=\"btn-toolbar\" ng-if=\"!options.hideToolbar\" style=\"padding-bottom:5px;padding-top:5px;border-bottom: 2px solid gray;\">\n" +
    "\t\t<!--ul class=\"inline\"><li-->\n" +
    "            <div class=\"btn-group\" ng-if=\"!options.widgetButtons\" data-ng-class=\"{open: open}\" tabindex=\"-1\">\n" +
    "\t\t\t<span title=\"Add a Widget\">\n" +
    "                  <button name=\"btnAddWidget\" data-toggle=\"dropdown\" alt=\"Add Widget\" class=\"btn btn-primary dropdown-toggle\">\n" +
    "                    Add a Widget<span class=\"caret\"/>\n" +
    "                  </button>\n" +
    "                  <ul class=\"dropdown-menu\">\n" +
    "                    <li ng-repeat=\"widget in widgetDefs\">\n" +
    "                      <a name=\"liWidgetDropdown\"  alt=\"Add Widget {{widget.name}}\" title=\"Add Widget {{widget.name}}\" data-toggle=\"tooltip\" href=\"#\" ng-click=\"addWidgetInternal($event, widget);\" class=\"dropdown-toggle nav\"><span class=\"label label-primary\">{{widget.name}}</span></a>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "\t\t\t\t </span> \n" +
    "\t\t\t</div>\n" +
    "\t\t<!--/li></ul-->\n" +
    "            <div class=\"btn-group\" ng-if=\"options.widgetButtons\" tabindex=\"-1\">\n" +
    "                <button name=\"btnWidgetName\"  alt=\"Widget Name {{widget.name}}\" title=\"Widget Name {{widget.name}}\" ng-repeat=\"widget in widgetDefs\" ng-click=\"addWidgetInternal($event, widget);\" type=\"button\" class=\"btn btn-primary\">\n" +
    "                    {{widget.name}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <button name=\"btnDefaultWarning\"  alt=\"Default Widgets\" title=\"Default Widgets\"  class=\"btn btn-warning\" ng-click=\"resetWidgetsToDefault()\">Default Widgets</button>\n" +
    "\n" +
    "            <button name=\"btnSave\" title=\"Save\" alt=\"Save\"  ng-if=\"options.storage && options.explicitSave\" ng-click=\"options.saveDashboard()\" class=\"btn btn-success\" ng-disabled=\"!options.unsavedChangeCount\">{{ !options.unsavedChangeCount ? \"all saved\" : \"save changes (\" + options.unsavedChangeCount + \")\" }}</button>\n" +
    "\n" +
    "            <button name=\"btnClear\" ng-click=\"clear();\"  alt=\"Clear\" title=\"Clear\"  type=\"button\" class=\"btn btn-info\">Clear</button>\n" +
    "            <div style=\"height:100%;float:right;margin:10px 10px 0 5px;vertical-align:middle;\" ng-show=\" dashboardTitle == 'Individual View'\" title=\"Individual View Layout\">\n" +
    "                <label alt=\"{{ PatientName }}\" style=\"font-weight:normal\">\n" +
    "                    <span> {{ PatientName }}</span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div style=\"height:100%;float:right;margin:10px 10px 0 5px;vertical-align:middle;\" ng-show=\" dashboardTitle == 'Facility View'\" title=\"Facility View Layout\" >\n" +
    "                <label alt=\"{{ FacilityName }}\" style=\"font-weight:normal\">\n" +
    "                    <span> {{ FacilityName }}</span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div style=\"height:100%;float:right;margin:10px 10px 0 5px;vertical-align:middle;\" ng-show=\" dashboardTitle == 'Surveillance View'\"  title=\"Surveillance View Layout\" >\n" +
    "                <label alt=\"{{VISN_FacilityName\" style=\"font-weight:normal\">\n" +
    "                    <span> {{ VISN_FacilityName }}</span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div gridster=\"gridsterOpts\" style=\"margin-top:35px;\" class=\"dashboard-widget-area\" tabindex=\"-1\">\n" +
    "    <ul ng-model=\"widgets\">\n" +
    "        <li gridster-item=\"widget\" ng-repeat=\"widget in widgets\" class=\"gridsterContainer\" widget tabindex=\"-1\">\n" +
    "              <div class=\"widget panel panel-default\" style=\"height:98%\">\n" +
    "                <div class=\"widget-header panel-heading\" tabindex=\"-1\" style=\"height:45px;\">\n" +
    "                    <div class=\"panel-title\">\n" +
    "                        <span style=\"background-color: transparent;\" class=\"label-primary widget-title nav\">{{widget.title}}</span>\n" +
    "                        <span class=\"label label-primary\" ng-if=\"!options.hideWidgetName\" tabindex=\"-1\">{{widget.name}}</span>\n" +
    "                        <div id=\"widgetSettings\" style=\"display:inline-block; float:right; position:relative;\">\n" +
    "                            <!--button ng-click=\"widget.contentStyle.display = widget.contentStyle.display === 'none' ? 'block' : 'none'\" style=\"background-color: transparent; float:left;\" class=\"glyphicon\" ng-class=\"{'glyphicon-plus': widget.contentStyle.display === 'none','glyphicon-minus': widget.contentStyle.display !== 'none'}\"></button-->\n" +
    "                            <!--button ng-click=\"openWidgetSettings(widget);\" style=\"background-color: transparent; float:left;\" class=\"glyphicon glyphicon-cog\" ng-if=\"!options.hideWidgetSeyttings\"></button-->\n" +
    "                            <button ng-click=\"removeWidget(widget);\" title=\"Remove Widget\" alt=\"Remove Widget\" style=\"background-color: transparent; float:right;\" class=\"glyphicon glyphicon-remove\" ng-if=\"!options.hideWidgetClose\"></button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"widget-content\" style=\"height:75%;\"></div>\n" +
    "                <div class=\"widget-ew-resizer\" ng-mousedown=\"grabResizer($event)\"></div>\n" +
    "                <div ng-if=\"widget.enableVerticalResize\" class=\"widget-s-resizer\" ng-mousedown=\"grabSouthResizer($event)\"></div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/adf/directives/dashboard/widget-settings-template.html",
    "<div class=\"modal-header\">\n" +
    "    <button name=\"btnCancel\" alt=\"Cancel\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"cancel()\">&times;</button>\n" +
    "  <p font-size=\"12\"><b>Widget Options:  </b><small>{{widget.title}}</small></p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <form name=\"form\" novalidate class=\"form-horizontal\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label alt=\"Widget Title\" for=\"widgetTitle\" class=\"col-sm-2 control-label\">Title</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <input alt=\"Result Title\" id=\"widgetTitle\" type=\"text\" class=\"form-control\" name=\"widgetTitle\" ng-model=\"result.title\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"widget.settingsModalOptions.partialTemplateUrl\"\n" +
    "             ng-include=\"widget.settingsModalOptions.partialTemplateUrl\"></div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button name=\"btn2Cancel\" alt=\"cancel\" type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button name=\"btnOK\" alt=\"ok\" type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "</div>"
  );

  $templateCache.put("client/components/adf/directives/dashboardLayouts/SaveChangesModal.html",
    "<div class=\"modal-header\">\n" +
    "    <button name=\"btnCancel\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"cancel()\">&times;</button>\n" +
    "  <h3>Unsaved Changes to \"{{layout.title}}\"</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <p>You have {{layout.dashboard.unsavedChangeCount}} unsaved changes on this dashboard. Would you like to save them? </p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button name=\"btn2Cancel\" type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button name=\"btnSave\" type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">Save</button>\n" +
    "</div>"
  );

  $templateCache.put("client/components/adf/directives/dashboardLayouts/dashboardLayouts.html",
    "<ul ui-sortable=\"sortableOptions\" ng-model=\"layouts\" class=\"nav nav-tabs layout-tabs\" offset=\"59\" style=\"z-index:5;background-color:white;\" sticky>\n" +
    "    <li ng-repeat=\"layout in layouts\" ng-class=\"{ active: layout.active }\">\n" +
    "        <a ng-click=\"makeLayoutActive(layout)\" alt=\"{{layout.title}}\" title=\"{{layout.title}}\" tabindex=\"0\">\n" +
    "            <span ng-dblclick=\"editTitle(layout)\"  ng-show=\"!layout.editingTitle\">{{layout.title}}</span>\n" +
    "            <form action=\"\" class=\"layout-title\" ng-show=\"layout.editingTitle\" ng-submit=\"saveTitleEdit(layout)\">\n" +
    "                <input type=\"text\" ng-model=\"layout.title\" class=\"form-control\" data-layout=\"{{layout.id}}\">\n" +
    "            </form>\n" +
    "            <span ng-if=\"!layout.locked\" ng-click=\"removeLayout(layout)\" class=\"glyphicon glyphicon-remove remove-layout-icon\"></span>\n" +
    "            <!-- <span class=\"glyphicon glyphicon-pencil\"></span> -->\n" +
    "            <!-- <span class=\"glyphicon glyphicon-remove\"></span> -->\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "<div ng-repeat=\"layout in layouts | filter:isActive\" dashboard=\"layout.dashboard\" template-url=\"client/components/adf/directives/dashboard/dashboard.html\" dashboard-title=\"layout.title\"></div>"
  );

}]);
