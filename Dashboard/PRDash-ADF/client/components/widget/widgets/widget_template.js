angular.module("ui.widgets").run(["$templateCache", function($templateCache) {

  $templateCache.put("client/components/widget/widgets/appointment/appointment.html",
    "<div id=\"appointmentDiv\" class=\"appointment\" title=\"Appointment Widget\">\n" +
    "\t<table id=\"tblAppointment\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\n" +
    "        <thead> \n" +
    "        <tr>\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Date\" title=\"Sort by Date\" href=\"\" ng-click=\"predicate = 'Date'; reverse=false\">Date</a></th>\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Cancellation Status\" title=\"Sort by Cancellation Status\" href=\"\" ng-click=\"predicate = 'Cancelled'; reverse=!reverse\">Cancelled</a></th>\n" +
    "        </tr>\n" +
    "        </thead> \n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"appt in data track by $index | orderBy:predicate:reverse\">\n" +
    "            <td>{{ appt.ApptDate }}</td>\n" +
    "            <td>{{ appt.CancelNoShowCodeDesc }}</td>\n" +
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
    "<div name=\"clinicalDecisionSupport\" style=\"overflow:auto; height:auto; width:auto\">\n" +
    "\t<div ng-repeat=\"cpg in cpgList\">\n" +
    "\t\t<b>Chronic {{cpg.RiskLevelDesc}} Risk</b>\n" +
    "\t\t<br><b>Features</b>\n" +
    "\t\t<div ng-bind-html=\"cpg.Features\"></div>\n" +
    "\t\t<br><b>Action</b>\n" +
    "\t\t<br>{{cpg.Action}}\n" +
    "\t\t<br><br>For more information visit the full Clinical Practice Guide at <a href=\"{{cpg.GuidelineURL}}\" title=\"Clinical Practice Guide\" alt=\"Clinical Practice Guide\">{{cpg.GuidelineURL}}</a>\n" +
    "\t\t<br><br>For guidance on proactive outreach and intervention strategies visit the Toolkit for Interventions <a href=\"{{cpg.ToolkitURL}}\" title=\"Toolkit for Interventions\" alt=\"Toolkit for Interventions\">{{cpg.ToolkitURL}}</a><br><br>\n" +
    "\t</div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/contact/contact.html",
    "<div class=\"contact\">\n" +
    "    <div ng-show=\"data.length\">\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\n" +
    "        <p font-size=\"12\"><b>No Data Found</b></p>\n" +
    "    </div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/diagnoses/diagnoses.html",
    "<div id=\"diagnosisDiv\" class=\"diagnoses\" title=\"Diagnoses Widget\">\n" +
    "\t<table id=\"tblDiagnoses\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\n" +
    "        <thead> \n" +
    "        <tr>\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Diagnosis\" title=\"Sort by Diagnosis\" href=\"\" ng-click=\"predicate = 'Diagnosis'; reverse=false\">Diagnosis</a></th>\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"ICD\" title=\"Sort by ICD\" href=\"\" ng-click=\"predicate = 'ICD'; reverse=false\">ICD</a></th>\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Date\" title=\"Sort by Date\" href=\"\" ng-click=\"predicate = 'Date'; reverse=false\">Date</a></th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"diagnosis in data track by $index | orderBy:predicate:reverse\">\n" +
    "            <td>{{ diagnosis.ICD_Desc }}</td>\n" +
    "            <td>{{ diagnosis.ICD_Code }}</td>\n" +
    "            <td>{{ diagnosis.DiagnosisDate }}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div> "
  );

  $templateCache.put("client/components/widget/widgets/emergencyContact/emergencyContact.html",
    "<div class=\"emergency\">\n" +
    "    <div ng-show=\"data.length\">\n" +
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
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\n" +
    "        <p font-size=\"12\"><br>No Data Found</b></p>\n" +
    "    </div>\n" +
    "</div>\n"
  );

  $templateCache.put("client/components/widget/widgets/facilityRoster/facilityRoster.html",
    "<div id=\"facilityRosterDiv\" title=\"Navigate to header and click down arrow to enter table, tab to leave table rows\">\n" +
    "    <table id=\"tblFacilityRoster\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\n" +
    "    </table>\n" +
    "</div>\n" +
    " "
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
    "            <button name=\"btnChangeMin\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"changeMode('MINUTES')\"\n" +
    "                    ng-class=\"{active: mode === 'MINUTES'}\">Minutes </button>\n" +
    "            <button name=\"btnChangeMode\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"changeMode('HOURS')\"\n" +
    "                    ng-class=\"{active: mode === 'HOURS'}\">Hours</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div wt-line-chart chart=\"chart\"></div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/medication/medication.html",
    "<div id=\"medicationDiv\" class=\"medication\" title=\"Medication Widget\">\n" +
    "    <table id=\"tblMedication\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\n" +
    "        <thead> \n" +
    "        <tr>\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Medication\" title=\"Sort by Medication\" href=\"\" ng-click=\"predicate = 'Medication'; reverse=false\">Medication</a></th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"meds in data track by $index | orderBy:predicate:reverse\">\n" +
    "            <td>{{ meds.MedicationName }}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div> "
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

  $templateCache.put("client/components/widget/widgets/nationalAgeGroups/nationalAgeGroups.html",
    "<div id=\"ageGroupDiv\" class=\"nationalAgeGroups\" title=\"National Age Groups Widget\">\n" +
    "\t<table id=\"tblAgeGroups\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\n" +
    "\t</table>\n" +
    "</div> "
  );

  $templateCache.put("client/components/widget/widgets/nationalCombatEra/nationalCombatEra.html",
    "<div class=\"national\">\n" +
    "    <div ng-show=\"data.length\">\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\n" +
    "        <h4>No Data Found</h4>\n" +
    "    </div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalCurrentSafetyPlan/nationalCurrentSafetyPlan.html",
    "<div class=\"national\">\n" +
    "    <div ng-show=\"data.length\">\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\n" +
    "        <h4>No Data Found</h4>\n" +
    "    </div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalGenderDistribution/nationalGenderDistribution.html",
    "<div id=\"nationalGenderDiv\" class=\"nationalGenderDistribution\" title=\"National Gender Widget\">\n" +
    "\t<table id=\"tblGenderDistribution\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\n" +
    "\t</table>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalHighRiskFlag/nationalHighRiskFlag.html",
    "<div class=\"national\">\n" +
    "    <div ng-show=\"data.length\">\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\n" +
    "        <h4>No Data Found</h4>\n" +
    "    </div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalMilitaryBranch/nationalMilitaryBranch.html",
    "<div id=\"militaryBranchDiv\" class=\"nationalMilitaryBranch\" title=\"Military Branch Widget\">\n" +
    "\t<table id=\"tblMilitaryBranch\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\n" +
    "\t</table>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalOutReachStatus/nationalOutReachStatus.html",
    "<div id=\"outReachDiv\" class=\"nationalOutReachStatus\" title=\"OutReach Status Widget\">\n" +
    "\t<table id=\"tblNationalOutReachStatus\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\n" +
    "\t</table>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalPTSDMDDSUD/nationalPTSDMDDSUD.html",
    "<div class=\"national\">\n" +
    "    <div ng-show=\"data.length\">\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\n" +
    "        <h4>No Data Found</h4>\n" +
    "    </div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalTopMidRisk/nationalTopMidRisk.html",
    "<div class=\"nationalTopMidRisk\" style=\"height:100%;width:100%;\">\n" +
    "    <nvd3-multi-bar-chart\n" +
    "            data=\"data\"\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\n" +
    "            x=\"xFunction()\"\n" +
    "            y=\"yFunction()\"\n" +
    "            showXAxis=\"true\"\n" +
    "            showYAxis=\"true\"\n" +
    "            showLegend=\"true\"\n" +
    "            tooltips=\"true\">\n" +
    "            <svg></svg>\n" +
    "    </nvd3-multi-bar-chart>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalVAClinicTwelveMonths/nationalVAClinicTwelveMonths.html",
    "<div class=\"national\">\n" +
    "    <div ng-show=\"data.length\">\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\n" +
    "        <h4>No Data Found</h4>\n" +
    "    </div>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalVAMC/nationalVAMC.html",
    "<div class=\"nationalVAMC\" title=\"National VAMC Widget\">\n" +
    "\t<table id=\"tblVAMC\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\n" +
    "\t\t<thead>\t\n" +
    "\t\t\t<th scope=\"col\" tabindex=\"-1\"><a alt=\"VAMC Name\" title=\"Sort by VAMC Name\" href=\"\" ng-click=\"predicate = 'VAMC Name'; reverse=false\">VAMC Name</a></th>\n" +
    "\t\t\t<th scope=\"col\" tabindex=\"-1\"><a alt=\"State\" title=\"Sort by State\" href=\"\" ng-click=\"predicate = 'State'; reverse=false\">State</a></th>\n" +
    "\t\t\t<th scope=\"col\" tabindex=\"-1\"><a alt=\"VISN\" title=\"Sort by VISN\" href=\"\" ng-click=\"predicate = 'VISN'; reverse=false\">VISN</a></th>\n" +
    "\t\t\t<th scope=\"col\" tabindex=\"-1\"><a alt=\"Total Number of Patients\" title=\"Sort by Total Number of Patients\" href=\"\" ng-click=\"predicate = 'Total Number of Patients'; reverse=false\">Total Number of Patients</a></th>\n" +
    "\t\t</thead>\n" +
    "\t\t<tbody>\n" +
    "\t\t\t<tr ng-repeat=\"ind in data track by $index | orderBy:predicate:reverse\">\n" +
    "\t\t\t\t<td>{{ind.VAMCName}}</td>\n" +
    "\t\t\t\t<td>{{ind.StateID}}</td>\n" +
    "\t\t\t\t<td>{{ind.VISN}}</td>\n" +
    "\t\t\t\t<td>{{ind.Total}}</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</tbody>\n" +
    "\t</table>\n" +
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
    "<div id=\"patientFlagDiv\" class=\"patient-flags\" title=\"Patient Flags Widget\">\n" +
    "    <table id=\"tblPatientFlags\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\n" +
    "        <thead> \n" +
    "        <tr>\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Flag\" title=\"Sort by Flag\" href=\"\" ng-click=\"predicate = 'Flag'; reverse=false\">Flag</a></th>\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Cat\" title=\"Sort by Cat\" href=\"\" ng-click=\"predicate = 'Cat'; reverse=false\">Cat</a></th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"flags in data | orderBy:predicate:reverse\">\n" +
    "            <td>{{ flags.FlagDesc }}</td>\n" +
    "            <td>{{ flags.Category }}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/patientTable/patientTable.html",
    "<div id=\"patientRosterDiv\" title=\"Navigate to header and click tab arrow to enter table, esc to leave table rows\">\n" +
    "    <table id=\"tblPatient\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\n" +
    "    </table>\n" +
    "</div> \n"
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

  $templateCache.put("client/components/widget/widgets/predictionChart/predictionChart.html",
    "<div class=\"prediction-chart\" style=\"height:100%;width:100%;\">\n" +
    "    <nvd3-line-chart\n" +
    "            data=\"data\",\n" +
    "            height=\"450\"\n" +
    "            forcex=\"[0.5,17.5]\"\n" +
    "            xAxisTickValues=\"xAxisTickValuesFunction()\"\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\n" +
    "            xAxisShowMaxMin=\"false\"\n" +
    "            xAxisLabel=\"Month\"\n" +
    "            yAxisTickFormat=\"yAxisTickFormatFunction()\"\n" +
    "            yAxisLabel=\"Attempts\"\n" +
    "            yAxisRotateLabels=\"true\"\n" +
    "            x=\"xFunction()\"\n" +
    "            y=\"yFunction()\"\n" +
    "            showXAxis=\"true\"\n" +
    "            showYAxis=\"true\"\n" +
    "            reduceXTicks=\"true\"\n" +
    "            transitionduration=\"0\"\n" +
    "            useInteractiveGuideline=\"true\"\n" +
    "            tooltips=\"true\">\n" +
    "    </nvd3-line-chart>\n" +
    "</div>"
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
    "    {{label}}<select ng-model=\"value\" ng-options=\"opt for opt in options\"\n" +
    "                          class=\"form-control\" style=\"width: 200px; display: inline;\"></select>\n" +
    "    <button name=\"btnPreviousValue\" type=\"button\" class=\"btn btn-default\" ng-click=\"prevValue();\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "    </button>\n" +
    "    <button name=\"btnNextValue\" type=\"button\" class=\"btn btn-default\" ng-click=\"nextValue();\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "    </button>\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/suicideStatistics/suicideStatistics.html",
    "<div title=\"Health Indicators Suicide Statistics Widget\">\n" +
    "\t<br>This product uses the Health Indicators Warehouse API but is not endorsed or certified by the Health Indicators Warehouse or its associated Federal agencies.\n" +
    "\t<div id=\"suicideStatisticsDiv\" class=\"suicideStatistics\">\n" +
    "\t<table id=\"tblSuicideStatistics\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\n" +
    "\t</table>\n" +
    "\t</div>\n" +
    "\t<br>For more information visit the Suicide Deaths per 100000 indicator site at HealthIndicators.gov <a title=\"Suicide deaths per 100000 @ HealthIndicators.gov\" \n" +
    "\thref=\"http://www.healthindicators.gov/Indicators/Suicide-deaths-per-100000_1105/Profile/ClassicData\">\n" +
    "\thttp://www.healthindicators.gov/Indicators/Suicide-deaths-per-100000_1105/Profile/ClassicData</a>\n" +
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

  $templateCache.put("client/components/widget/widgets/vismRoster/vismRoster.html",
    "<div id=\"VISNRosterDiv\" title=\"Navigate to header and click down arrow to enter table, tab to leave table rows\"> \n" +
    "    <table id=\"tblVismRoster\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\n" +
    "    </table>\n" +
    "</div>\n"
  );

}]);
