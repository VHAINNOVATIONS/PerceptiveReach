angular.module("ui.widgets").run(["$templateCache", function($templateCache) {

  $templateCache.put("client/components/widget/widgets/appointment/appointment.html",
    "<div class=\"appointment\">\n" +
    "\t<table datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th>Type</th>\n" +
    "            <th>Date</th>\n" +
    "            <th>Canceled</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"appt in data\">\n" +
    "            <td>{{ appt.ApptType }}</td>\n" +
    "            <td>{{ appt.Apptdate }}</td>\n" +
    "            <td>{{ appt.CancelationType }}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/barChart/barChart.html",
    "<div class=\"bar-chart\">\n" +
    "    <div style=\"text-align: right;\">\n" +
    "        <span ng-if=\"start && end\">{{start|date:'HH:mm:ss'}} - {{end|date:'HH:mm:ss'}}</span>&nbsp;\n" +
    "    </div>\n" +
    "    <nvd3-multi-bar-chart\n" +
    "            data=\"data\"\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\n" +
    "            x=\"xFunction()\"\n" +
    "            y=\"yFunction()\"\n" +
    "            showXAxis=\"true\"\n" +
    "            showYAxis=\"true\"\n" +
    "            reduceXTicks=\"true\"\n" +
    "            tooltips=\"false\">\n" +
    "    </nvd3-multi-bar-chart>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/clinicalDecisionSupport/clinicalDecisionSupport.html",
    "<div name=\"clinicalDecisionSupport\" style='overflow:auto; height:450px; widgth:auto'>\n" +
    "\t<div ng-repeat=\"cpg in cpgList\">\n" +
    "\t\t<b>Chronic {{cpg.Risk_Name}}</b>\n" +
    "\t\t<br><b>Features</b>\n" +
    "\t\t<div ng-bind-html=\"cpg.Features\"></div>\n" +
    "\t\t<br><b>Action</b>\n" +
    "\t\t<br>{{cpg.Action}}\n" +
    "\t\t<br><br>For more information visit the full Clinical Practice Guide at <a href=\"{{cpg.GuidelineURL}}\">{{cpg.GuidelineURL}}</a>\n" +
    "\t\t<br><br>For guidance on proactive outreach and intervention strategies visit the Toolkit for Interventions <a href=\"{{cpg.ToolkitURL}}\">{{cpg.ToolkitURL}}</a><br><br>\n" +
    "\t</div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/contact/contact.html",
    "<div>\n" +
    "    <div>\n" +
    "    \t<b>Name:</b> {{data[0].firstName}} {{data[0].lastName}}<br>\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].ssn}}<br>\n" +
    "    \t<b>Phone:</b> {{data[0].phone}}<br>\n" +
    "    \t<b>Alternate Phone:</b> {{data[0].altPhone}}<br>\n" +
    "    \t<b>Address:</b> {{data[0].address}}<br>\n" +
    "    \t<b>City:</b> {{data[0].city}}<br>\n" +
    "    \t<b>State:</b> {{data[0].state}}<br>\n" +
    "    \t<b>Zip Code:</b> {{data[0].zipCode}}<br>\n" +
    "    </div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/emergencyContact/emergencyContact.html",
    "<div>\n" +
    "    <div>\n" +
    "    \t<b>Name:</b> {{data[0].NameOfContact}}<br>\n" +
    "    \t<b>Phone:</b> {{data[0].Phone}}<br>\n" +
    "    \t<b>Alternate Phone:</b> {{data[0].PhoneWork}}<br>\n" +
    "    \t<b>Address:</b> {{data[0].StreetAddress1}}<br>\n" +
    "        <b>Address:</b> {{data[0].StreetAddress2}}<br>\n" +
    "        <b>Address:</b> {{data[0].StreetAddress3}}<br>\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}-{{data[0].Zip4}}<br>\n" +
    "    </div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/eventTimeline/eventTimeline.html",
    "<div class=\"event-timeline-chart\">\n" +
    "    <div style=\"text-align: left;\">\n" +
    "        <input date-range-picker class=\"date-picker\" type=\"text\" size=\"23\" ng-model=\"date\" />\n" +
    "        <a id=\"duration_1y\" href=\"\" name=\"limit1y\" ng-click=\"limit1y()\">1y</a>\n" +
    "        <a id=\"duration_2y\" href=\"\" name=\"limit2y\" ng-click=\"limit2y()\">2y</a>\n" +
    "        <a id=\"duration_3y\" href=\"\" name=\"limit3y\" ng-click=\"limit3y()\">3y</a>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-danger\" style=\"float: right;\" ng-click=\"refresh()\">Refresh</button>\n" +
    "    </div>\n" +
    "    <nvd3-line-plus-bar-chart\n" +
    "            data=\"chart\"\n" +
    "            height=\"300\"\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\n" +
    "            y1AxisTickFormat=\"yAxisTickFormatFunction()\"\n" +
    "            y2AxisTickFormat=\"yAxisTickFormatFunction()\"\n" +
    "            x=\"xFunction()\"\n" +
    "            y=\"yFunction()\"\n" +
    "            showXAxis=\"true\"\n" +
    "            showYAxis=\"false\"\n" +
    "            reduceXTicks=\"true\"\n" +
    "            forcey=\"[0,120]\"\n" +
    "            transitionduration=\"0\"\n" +
    "            showLegend=\"{{showLegend}}\"\n" +
    "            interactive=\"true\"\n" +
    "            tooltips=\"true\"\n" +
    "            tooltipcontent=\"toolTipContentFunction()\">\n" +
    "    </nvd3-line-chart>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/fluid/fluid.html",
    "<div class=\"demo-widget-fluid\">\n" +
    "    <div>\n" +
    "        <p>Widget takes 100% height (blue border).<p>\n" +
    "        <p>Resize the widget vertically to see that this text (red border) stays middle aligned.</p>\n" +
    "        <p>New width: {{width}}</p>\n" +
    "        <p>New height: {{height}}</p>\n" +
    "    </div>\n" +
    "</div>\n"
  );

  $templateCache.put("client/components/widget/widgets/historicalChart/historicalChart.html",
    "<div>\n" +
    "    <div class=\"btn-toolbar\">\n" +
    "        <div class=\"btn-group\" style=\"float: right;\">\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"changeMode('MINUTES')\"\n" +
    "                    ng-class=\"{active: mode === 'MINUTES'}\">Minutes</button>\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"changeMode('HOURS')\"\n" +
    "                    ng-class=\"{active: mode === 'HOURS'}\">Hours</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div wt-line-chart chart=\"chart\"></div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/medication/medication.html",
    "<div class=\"medication\">\n" +
    "    <table datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th>Medication</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"meds in data\">\n" +
    "            <td>{{ meds.Name }}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/metricsChart/metricsChart.html",
    "<div class=\"bar-chart\">\n" +
    "    <div style=\"text-align: right;\" ng-if=\"start && end\">\n" +
    "        <span>{{start|date:'HH:mm:ss'}} - {{end|date:'HH:mm:ss'}}</span>&nbsp;\n" +
    "        <select ng-model=\"timeFrame\" ng-options=\"opt.label for opt in options\"\n" +
    "                ng-change=\"timeFrameChanged(timeFrame)\"\n" +
    "                class=\"form-control\" style=\"width: 200px; display: inline;\"></select>\n" +
    "    </div>\n" +
    "    <nvd3-line-chart\n" +
    "            data=\"data\"\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\n" +
    "            yAxisTickFormat=\"yAxisTickFormatFunction()\"\n" +
    "            x=\"xFunction()\"\n" +
    "            y=\"yFunction()\"\n" +
    "            showXAxis=\"true\"\n" +
    "            showYAxis=\"true\"\n" +
    "            reduceXTicks=\"true\"\n" +
    "            transitionduration=\"0\"\n" +
    "            showLegend=\"true\"\n" +
    "            useInteractiveGuideline=\"true\"\n" +
    "            nodata=\"Loading Data...\"\n" +
    "            tooltips=\"true\">\n" +
    "    </nvd3-line-chart>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nvd3LineChart/nvd3LineChart.html",
    "<div class=\"bar-chart\">\n" +
    "    <div style=\"text-align: right;\">\n" +
    "        <span ng-if=\"showTimeRange && start && end\">{{start|date:'HH:mm:ss'}} - {{end|date:'HH:mm:ss'}}</span>&nbsp;\n" +
    "    </div>\n" +
    "    <nvd3-line-chart\n" +
    "            data=\"data\"\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\n" +
    "            yAxisTickFormat=\"yAxisTickFormatFunction()\"\n" +
    "            x=\"xFunction()\"\n" +
    "            y=\"yFunction()\"\n" +
    "            showXAxis=\"true\"\n" +
    "            showYAxis=\"true\"\n" +
    "            reduceXTicks=\"true\"\n" +
    "            forcey=\"[0,100]\"\n" +
    "            transitionduration=\"0\"\n" +
    "            useInteractiveGuideline=\"true\"\n" +
    "            showLegend=\"{{showLegend}}\"\n" +
    "            tooltips=\"true\">\n" +
    "    </nvd3-line-chart>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/patientFlags/patientFlags.html",
    "<div class=\"patient-flags\">\n" +
    "    <table datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th>Flag</th>\n" +
    "            <th>Cat</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"flags in data\">\n" +
    "            <td>{{ flags.FlagDesc }}</td>\n" +
    "            <td>{{ flags.Category }}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/pieChart/pieChart.html",
    "<div>\n" +
    "<nvd3-pie-chart\n" +
    "    data=\"data\"\n" +
    "    showLegend=\"true\"\n" +
    "    width=\"300\" height=\"300\"\n" +
    "    showlabels=\"true\"\n" +
    "    labelType=\"percent\"\n" +
    "    interactive=\"true\"\n" +
    "    x=\"xFunction()\"\n" +
    "    y=\"yFunction()\"\n" +
    "    nodata=\"Loading Data...\">\n" +
    "</nvd3-pie-chart>\n" +
    "</div>\n"
  );

  $templateCache.put("client/components/widget/widgets/random/random.html",
    "<div>\n" +
    "    Random Number\n" +
    "    <div class=\"alert alert-info\">{{number}}</div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/scopeWatch/scopeWatch.html",
    "<div>\n" +
    "    Value\n" +
    "    <div class=\"alert\" ng-class=\"valueClass || 'alert-warning'\">{{scopeValue || 'no data'}}</div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/select/select.html",
    "<div>\n" +
    "    {{label}} <select ng-model=\"value\" ng-options=\"opt for opt in options\"\n" +
    "                          class=\"form-control\" style=\"width: 200px; display: inline;\"></select>\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"prevValue();\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"nextValue();\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "    </button>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/time/time.html",
    "<div>\n" +
    "    Time\n" +
    "    <div class=\"alert alert-success\">{{time}}</div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/topN/topN.html",
    "<div class=\"top-n\">\n" +
    "    <mlhr-table \n" +
    "      options=\"tableOptions\"\n" +
    "      columns=\"columns\" \n" +
    "      rows=\"items\">\n" +
    "    </mlhr-table>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/veteranRosterTable/veteranRosterTable.html",
    "<div>\n" +
    "\t<!--<div id=\"spinner\" style=\"height: 100px;\"> </div>-->\n" +
    "    <table datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\" id=\"sampleVet\" width=\"100%\">\n" +
    "    \t<thead>\n" +
    "        <tr>\n" +
    "        \t<th ng-repeat=\"column in columns\">{{column.Name}}</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"veteran in veteranList\">\n" +
    "            <td>{{ veteran.Name }}</td>\n" +
    "            <td>{{ veteran.SSN }}</td>\n" +
    "            <td>{{ veteran.Phone }}</td>\n" +
    "            <td>{{ veteran.DateIdentifiedRisk }}</td>\n" +
    "            <td>{{ veteran.RiskLevel }}</td>\n" +
    "            <td>\n" +
    "            \t<select class='form-control' style='width: 180px;' id=\"vet_{{veteran.ReachID}}\">\n" +
    "            \t\t<option value=''></option>\n" +
    "            \t\t<option ng-repeat=\"outreachStatus in outreachStatusList\" value=\"{{outreachStatus.OutReachStatusID}}\">{{outreachStatus.StatusName}}</option>\n" +
    "            \t</select> \n" +
    "            </td>\n" +
    "            <!--<td>{{ veteran.OutreachStatus }}</td>-->\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/veteranRosterTable/veteranRosterTableWidgetSettingsTemplate.html",
    "<div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"cancel()\">&times;</button>\n" +
    "  <h3>Widget Options <small>{{widget.title}}</small></h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <form name=\"form\" novalidate class=\"form-horizontal\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"widgetTitle\" class=\"col-sm-2 control-label\">Title</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <input type=\"text\" class=\"form-control\" name=\"widgetTitle\" ng-model=\"result.title\">\n" +
    "            </div>\n" +
    "            <label for=\"widgetVAMC\" class=\"col-sm-2 control-label\">VAMC</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <select class=\"form-control\" ng-model=\"result.dataModel.vamc\">\n" +
    "                    <option ng-repeat=\"vamc in listOfVAMC\" value=\"{{vamc.VAMCID}}\">{{vamc.VAMC}}</option>\n" +
    "                </select>\n" +
    "                <!--<input type=\"text\" class=\"form-control\" name=\"widgetVAMC\" ng-model=\"result.dataModel.vamc\">-->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"widget.settingsModalOptions.partialTemplateUrl\"\n" +
    "             ng-include=\"widget.settingsModalOptions.partialTemplateUrl\"></div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "</div>"
  );

}]);
