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
