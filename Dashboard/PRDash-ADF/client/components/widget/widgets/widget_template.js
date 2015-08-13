angular.module("ui.widgets").run(["$templateCache", function($templateCache) {

  $templateCache.put("client/components/widget/widgets/appointment/appointment.html",
    "<div class=\"appointment\">\r" +
    "\n" +
    "\t<table id=\"tblAppointment\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "        <thead> \r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th>Date</th>\r" +
    "\n" +
    "            <th>Cancelled</th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"appt in data track by $index\">\r" +
    "\n" +
    "            <td>{{ appt.ApptDate }}</td>\r" +
    "\n" +
    "            <td>{{ appt.CancelNoShowCodeDesc }}</td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/barChart/barChart.html",
    "<div class=\"bar-chart\">\r" +
    "\n" +
    "    <div style=\"text-align: right;\">\r" +
    "\n" +
    "        <span ng-if=\"start && end\">{{start|date:'HH:mm:ss'}} - {{end|date:'HH:mm:ss'}}</span>&nbsp;\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <nvd3-multi-bar-chart\r" +
    "\n" +
    "            data=\"data\"\r" +
    "\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\r" +
    "\n" +
    "            x=\"xFunction()\"\r" +
    "\n" +
    "            y=\"yFunction()\"\r" +
    "\n" +
    "            showXAxis=\"true\"\r" +
    "\n" +
    "            showYAxis=\"true\"\r" +
    "\n" +
    "            reduceXTicks=\"true\"\r" +
    "\n" +
    "            tooltips=\"false\">\r" +
    "\n" +
    "    </nvd3-multi-bar-chart>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/clinicalDecisionSupport/clinicalDecisionSupport.html",
    "<div name=\"clinicalDecisionSupport\" style=\"overflow:auto; height:450px; width:auto\">\r" +
    "\n" +
    "\t<div ng-repeat=\"cpg in cpgList\">\r" +
    "\n" +
    "\t\t<b>Chronic {{cpg.RiskLevelDesc}} Risk</b>\r" +
    "\n" +
    "\t\t<br><b>Features</b>\r" +
    "\n" +
    "\t\t<div ng-bind-html=\"cpg.Features\"></div>\r" +
    "\n" +
    "\t\t<br><b>Action</b>\r" +
    "\n" +
    "\t\t<br>{{cpg.Action}}\r" +
    "\n" +
    "\t\t<br><br>For more information visit the full Clinical Practice Guide at <a href=\"{{cpg.GuidelineURL}}\">{{cpg.GuidelineURL}}</a>\r" +
    "\n" +
    "\t\t<br><br>For guidance on proactive outreach and intervention strategies visit the Toolkit for Interventions <a href=\"{{cpg.ToolkitURL}}\">{{cpg.ToolkitURL}}</a><br><br>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/contact/contact.html",
    "<div class=\"contact\">\r" +
    "\n" +
    "    <div ng-show=\"data.length\">\r" +
    "\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\r" +
    "\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\r" +
    "\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\r" +
    "\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\r" +
    "\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\r" +
    "\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\r" +
    "\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\r" +
    "\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\r" +
    "\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\r" +
    "\n" +
    "        <p font-size=\"12\"><b>No Data Found</b></p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/diagnoses/diagnoses.html",
    "<div class=\"diagnoses\">\r" +
    "\n" +
    "\t<table id=\"tblDiagnoses\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "        <thead> \r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th>Diagnosis</th>\r" +
    "\n" +
    "            <th>ICD</th>\r" +
    "\n" +
    "            <th>Date</th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"diagnosis in data track by $index\">\r" +
    "\n" +
    "            <td>{{ diagnosis.ICD_Desc }}</td>\r" +
    "\n" +
    "            <td>{{ diagnosis.ICD_Code }}</td>\r" +
    "\n" +
    "            <td>{{ diagnosis.DiagnosisDate }}</td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/emergencyContact/emergencyContact.html",
    "<div class=\"emergency\">\r" +
    "\n" +
    "    <div ng-show=\"data.length\">\r" +
    "\n" +
    "    \t<b>Name:</b> {{data[0].NameOfContact}}<br>\r" +
    "\n" +
    "    \t<b>Phone:</b> {{data[0].Phone}}<br>\r" +
    "\n" +
    "    \t<b>Alternate Phone:</b> {{data[0].PhoneWork}}<br>\r" +
    "\n" +
    "    \t<b>Address:</b> {{data[0].StreetAddress1}}<br>\r" +
    "\n" +
    "        <b>Address:</b> {{data[0].StreetAddress2}}<br>\r" +
    "\n" +
    "        <b>Address:</b> {{data[0].StreetAddress3}}<br>\r" +
    "\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\r" +
    "\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\r" +
    "\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}-{{data[0].Zip4}}<br>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\r" +
    "\n" +
    "        <p font-size=\"12\"><br>No Data Found</b></p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

  $templateCache.put("client/components/widget/widgets/facilityRoster/facilityRoster.html",
    "<div class=\"facilityRoster\">\r" +
    "\n" +
    "\t<table id=\"tblFacilityRoster\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "\t\t<thead>\t\r" +
    "\n" +
    "\t\t\t<th>VAMC Name</th>\r" +
    "\n" +
    "\t\t\t<th>State</th>\r" +
    "\n" +
    "\t\t\t<th>VISN</th>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"ind in data\">\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.VAMC_Name}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.StateAbbr}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.VISN}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/fluid/fluid.html",
    "<div class=\"demo-widget-fluid\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <p>Widget takes 100% height (blue border).<p>\r" +
    "\n" +
    "        <p>Resize the widget vertically to see that this text (red border) stays middle aligned.</p>\r" +
    "\n" +
    "        <p>New width: {{width}}</p>\r" +
    "\n" +
    "        <p>New height: {{height}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

  $templateCache.put("client/components/widget/widgets/historicalChart/historicalChart.html",
    "<div>\r" +
    "\n" +
    "    <div class=\"btn-toolbar\">\r" +
    "\n" +
    "        <div class=\"btn-group\" style=\"float: right;\">\r" +
    "\n" +
    "            <button name=\"btnChangeMin\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"changeMode('MINUTES')\"\r" +
    "\n" +
    "                    ng-class=\"{active: mode === 'MINUTES'}\">Minutes </button>\r" +
    "\n" +
    "            <button name=\"btnChangeMode\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"changeMode('HOURS')\"\r" +
    "\n" +
    "                    ng-class=\"{active: mode === 'HOURS'}\">Hours</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div wt-line-chart chart=\"chart\"></div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/medication/medication.html",
    "<div class=\"medication\">\r" +
    "\n" +
    "    <table id=\"tblMedication\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "        <thead> \r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th>Medication</th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"meds in data track by $index\">\r" +
    "\n" +
    "            <td>{{ meds.MedicationName }}</td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/metricsChart/metricsChart.html",
    "<div class=\"bar-chart\">\r" +
    "\n" +
    "    <div style=\"text-align: right;\" ng-if=\"start && end\">\r" +
    "\n" +
    "        <span>{{start|date:'HH:mm:ss'}} - {{end|date:'HH:mm:ss'}}</span>&nbsp;\r" +
    "\n" +
    "        <select ng-model=\"timeFrame\" ng-options=\"opt.label for opt in options\"\r" +
    "\n" +
    "                ng-change=\"timeFrameChanged(timeFrame)\"\r" +
    "\n" +
    "                class=\"form-control\" style=\"width: 200px; display: inline;\"></select>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <nvd3-line-chart\r" +
    "\n" +
    "            data=\"data\"\r" +
    "\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\r" +
    "\n" +
    "            yAxisTickFormat=\"yAxisTickFormatFunction()\"\r" +
    "\n" +
    "            x=\"xFunction()\"\r" +
    "\n" +
    "            y=\"yFunction()\"\r" +
    "\n" +
    "            showXAxis=\"true\"\r" +
    "\n" +
    "            showYAxis=\"true\"\r" +
    "\n" +
    "            reduceXTicks=\"true\"\r" +
    "\n" +
    "            transitionduration=\"0\"\r" +
    "\n" +
    "            showLegend=\"true\"\r" +
    "\n" +
    "            useInteractiveGuideline=\"true\"\r" +
    "\n" +
    "            nodata=\"Loading Data...\"\r" +
    "\n" +
    "            tooltips=\"true\">\r" +
    "\n" +
    "    </nvd3-line-chart>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalAgeGroups/nationalAgeGroups.html",
    "<div class=\"nationalAgeGroups\">\r" +
    "\n" +
    "\t<table id=\"tblAgeGroups\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "\t\t<thead>\t\r" +
    "\n" +
    "\t\t\t<th>Age Groups</th>\r" +
    "\n" +
    "\t\t\t<th>Risk Level Group</th>\r" +
    "\n" +
    "\t\t\t<th>Total Number of Patients</th>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"ind in data track by $index\">\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.AgeRange}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.RiskLevelDescription}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.Total}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalCombatEra/nationalCombatEra.html",
    "<div class=\"national\">\r" +
    "\n" +
    "    <div ng-show=\"data.length\">\r" +
    "\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\r" +
    "\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\r" +
    "\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\r" +
    "\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\r" +
    "\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\r" +
    "\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\r" +
    "\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\r" +
    "\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\r" +
    "\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\r" +
    "\n" +
    "        <h4>No Data Found</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalCurrentSafetyPlan/nationalCurrentSafetyPlan.html",
    "<div class=\"national\">\r" +
    "\n" +
    "    <div ng-show=\"data.length\">\r" +
    "\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\r" +
    "\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\r" +
    "\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\r" +
    "\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\r" +
    "\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\r" +
    "\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\r" +
    "\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\r" +
    "\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\r" +
    "\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\r" +
    "\n" +
    "        <h4>No Data Found</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalGenderDistribution/nationalGenderDistribution.html",
    "<div class=\"nationalGenderDistribution\">\r" +
    "\n" +
    "\t<table id=\"tblGenderDistribution\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "\t\t<thead>\t\r" +
    "\n" +
    "\t\t\t<th>Risk Level Group</th>\r" +
    "\n" +
    "\t\t\t<th>Gender</th>\r" +
    "\n" +
    "\t\t\t<th>Total Number of Patients</th>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"ind in data track by $index\">\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.RiskLevel}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.Gender}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.Total}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalHighRiskFlag/nationalHighRiskFlag.html",
    "<div class=\"national\">\r" +
    "\n" +
    "    <div ng-show=\"data.length\">\r" +
    "\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\r" +
    "\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\r" +
    "\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\r" +
    "\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\r" +
    "\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\r" +
    "\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\r" +
    "\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\r" +
    "\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\r" +
    "\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\r" +
    "\n" +
    "        <h4>No Data Found</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalMilitaryBranch/nationalMilitaryBranch.html",
    "<div class=\"nationalMilitaryBranch\">\r" +
    "\n" +
    "\t<table id=\"tblMilitaryBranch\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "\t\t<thead>\t\r" +
    "\n" +
    "\t\t\t<th>Branch Description</th>>\r" +
    "\n" +
    "\t\t\t<th>Total Number of Patients per Branch</th>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"ind in data track by $index\">\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.BranchDesc}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.Total}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalOutReachStatus/nationalOutReachStatus.html",
    "<div class=\"nationalOutReachStatus\">\r" +
    "\n" +
    "\t<table id=\"tblNationalOutReachStatus\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "\t\t<thead>\t\r" +
    "\n" +
    "\t\t\t<th>Outreach Status</th>\r" +
    "\n" +
    "\t\t\t<th>Risk Level Group</th>\r" +
    "\n" +
    "\t\t\t<th>Total Number of Patients</th>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"ind in data track by $index\">\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.Status}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.RiskLevelDesc}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.Total}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalPTSDMDDSUD/nationalPTSDMDDSUD.html",
    "<div class=\"national\">\r" +
    "\n" +
    "    <div ng-show=\"data.length\">\r" +
    "\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\r" +
    "\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\r" +
    "\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\r" +
    "\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\r" +
    "\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\r" +
    "\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\r" +
    "\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\r" +
    "\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\r" +
    "\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\r" +
    "\n" +
    "        <h4>No Data Found</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalTopMidRisk/nationalTopMidRisk.html",
    "<div class=\"nationalTopMidRisk\">\r" +
    "\n" +
    "    <nvd3-multi-bar-chart\r" +
    "\n" +
    "            data=\"data\"\r" +
    "\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\r" +
    "\n" +
    "            x=\"xFunction()\"\r" +
    "\n" +
    "            y=\"yFunction()\"\r" +
    "\n" +
    "            showXAxis=\"true\"\r" +
    "\n" +
    "            showYAxis=\"true\"\r" +
    "\n" +
    "            showLegend=\"true\"\r" +
    "\n" +
    "            tooltips=\"true\">\r" +
    "\n" +
    "            <svg></svg>\r" +
    "\n" +
    "    </nvd3-multi-bar-chart>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalVAClinicTwelveMonths/nationalVAClinicTwelveMonths.html",
    "<div class=\"national\">\r" +
    "\n" +
    "    <div ng-show=\"data.length\">\r" +
    "\n" +
    "    \t<b>Name:</b> {{data[0].FirstName}} {{data[0].LastName}}<br>\r" +
    "\n" +
    "    \t<b>Last 4 of SSN:</b> {{data[0].SSN}}<br>\r" +
    "\n" +
    "    \t<b>Cell Phone:</b> {{data[0].CellPhone}}<br>\r" +
    "\n" +
    "        <b>Home Phone:</b> {{data[0].HomePhone}}<br>\r" +
    "\n" +
    "    \t<b>Work Phone:</b> {{data[0].WorkPhone}}<br>\r" +
    "\n" +
    "    \t<b>Address:</b> {{data[0].Address1}}<br>\r" +
    "\n" +
    "    \t<b>City:</b> {{data[0].City}}<br>\r" +
    "\n" +
    "    \t<b>State:</b> {{data[0].State}}<br>\r" +
    "\n" +
    "    \t<b>Zip Code:</b> {{data[0].Zip}}<br>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-hide=\"data.length\" style=\"text-align: center;\">\r" +
    "\n" +
    "        <h4>No Data Found</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalVAMC/nationalVAMC.html",
    "<div class=\"nationalVAMC\">\r" +
    "\n" +
    "\t<table id=\"tblVAMC\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "\t\t<thead>\t\r" +
    "\n" +
    "\t\t\t<th>VAMC Name</th>\r" +
    "\n" +
    "\t\t\t<th>State</th>\r" +
    "\n" +
    "\t\t\t<th>VISN</th>\r" +
    "\n" +
    "\t\t\t<th>Total Number of Patients</th>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"ind in data track by $index\">\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.VAMCName}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.StateID}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.VISN}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.Total}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nvd3LineChart/nvd3LineChart.html",
    "<div class=\"bar-chart\">\r" +
    "\n" +
    "    <div style=\"text-align: right;\">\r" +
    "\n" +
    "        <span ng-if=\"showTimeRange && start && end\">{{start|date:'HH:mm:ss'}} - {{end|date:'HH:mm:ss'}}</span>&nbsp;\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <nvd3-line-chart\r" +
    "\n" +
    "            data=\"data\"\r" +
    "\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\r" +
    "\n" +
    "            yAxisTickFormat=\"yAxisTickFormatFunction()\"\r" +
    "\n" +
    "            x=\"xFunction()\"\r" +
    "\n" +
    "            y=\"yFunction()\"\r" +
    "\n" +
    "            showXAxis=\"true\"\r" +
    "\n" +
    "            showYAxis=\"true\"\r" +
    "\n" +
    "            reduceXTicks=\"true\"\r" +
    "\n" +
    "            forcey=\"[0,100]\"\r" +
    "\n" +
    "            transitionduration=\"0\"\r" +
    "\n" +
    "            useInteractiveGuideline=\"true\"\r" +
    "\n" +
    "            showLegend=\"{{showLegend}}\"\r" +
    "\n" +
    "            tooltips=\"true\">\r" +
    "\n" +
    "    </nvd3-line-chart>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/patientFlags/patientFlags.html",
    "<div class=\"patient-flags\">\r" +
    "\n" +
    "    <table id=\"tblPatientFlags\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "        <thead> \r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th>Flag</th>\r" +
    "\n" +
    "            <th>Cat</th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"flags in data\">\r" +
    "\n" +
    "            <td>{{ flags.FlagDesc }}</td>\r" +
    "\n" +
    "            <td>{{ flags.Category }}</td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/patientTable/patientTable.html",
    "<div>\r" +
    "\n" +
    "    <table id=\"tblPatient\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/pieChart/pieChart.html",
    "<div>\r" +
    "\n" +
    "<nvd3-pie-chart\r" +
    "\n" +
    "    data=\"data\"\r" +
    "\n" +
    "    showLegend=\"true\"\r" +
    "\n" +
    "    width=\"300\" height=\"300\"\r" +
    "\n" +
    "    showlabels=\"true\"\r" +
    "\n" +
    "    labelType=\"percent\"\r" +
    "\n" +
    "    interactive=\"true\"\r" +
    "\n" +
    "    x=\"xFunction()\"\r" +
    "\n" +
    "    y=\"yFunction()\"\r" +
    "\n" +
    "    nodata=\"Loading Data...\">\r" +
    "\n" +
    "</nvd3-pie-chart>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

  $templateCache.put("client/components/widget/widgets/random/random.html",
    "<div>\r" +
    "\n" +
    "    Random Number\r" +
    "\n" +
    "    <div class=\"alert alert-info\">{{number}}</div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/scopeWatch/scopeWatch.html",
    "<div>\r" +
    "\n" +
    "    Value\r" +
    "\n" +
    "    <div class=\"alert\" ng-class=\"valueClass || 'alert-warning'\">{{scopeValue || 'no data'}}</div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/select/select.html",
    "<div>\r" +
    "\n" +
    "    {{label}}<select ng-model=\"value\" ng-options=\"opt for opt in options\"\r" +
    "\n" +
    "                          class=\"form-control\" style=\"width: 200px; display: inline;\"></select>\r" +
    "\n" +
    "    <button name=\"btnPreviousValue\" type=\"button\" class=\"btn btn-default\" ng-click=\"prevValue();\">\r" +
    "\n" +
    "        <span class=\"glyphicon glyphicon-chevron-left\"></span>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "    <button name=\"btnNextValue\" type=\"button\" class=\"btn btn-default\" ng-click=\"nextValue();\">\r" +
    "\n" +
    "        <span class=\"glyphicon glyphicon-chevron-right\"></span>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/suicideStatistics/suicideStatistics.html",
    "<div class=\"suicideStatistics\">\r" +
    "\n" +
    "\t\t<br>This product uses the Health Indicators Warehouse API but is not endorsed or certified by the Health Indicators Warehouse or its associated Federal agencies.\r" +
    "\n" +
    "\t\t<table id=\"tblSuicideStatistics\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\t\t\r" +
    "\n" +
    "\t\t\t<thead>\r" +
    "\n" +
    "\t\t\t\t<tr>\r" +
    "\n" +
    "\t\t\t\t\t<th>Age Range</th>\r" +
    "\n" +
    "\t\t\t\t\t<th>Gender</th>\r" +
    "\n" +
    "\t\t\t\t\t<th>2013 Total Suicide Deaths Per 100K</th>\r" +
    "\n" +
    "\t\t\t\t\t<th>Ethnicity</th>\r" +
    "\n" +
    "\t\t\t\t</tr>\r" +
    "\n" +
    "\t\t\t</thead>\r" +
    "\n" +
    "\t\t\t<tbody>\r" +
    "\n" +
    "\t\t\t\t<tr ng-repeat=\"ind in data track by $index\">\r" +
    "\n" +
    "\t\t\t\t\t<td>{{ind.Age}}</td>\r" +
    "\n" +
    "\t\t\t\t\t<td>{{ind.Gender}}</td>\r" +
    "\n" +
    "\t\t\t\t\t<td>{{ind.Value}}</td>\r" +
    "\n" +
    "\t\t\t\t\t<td>{{ind.Ethnicity}}</td>\r" +
    "\n" +
    "\t\t\t\t</tr>\r" +
    "\n" +
    "\t\t\t</tbody>\r" +
    "\n" +
    "\t\t<table>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "\t<br>For more information visit the Suicide Deaths per 100000 indicator site at HealthIndicators.gov <a href=\"http://www.healthindicators.gov/Indicators/Suicide-deaths-per-100000_1105/Profile/ClassicData\">http://www.healthindicators.gov/Indicators/Suicide-deaths-per-100000_1105/Profile/ClassicData</a>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/time/time.html",
    "<div>\r" +
    "\n" +
    "    Time\r" +
    "\n" +
    "    <div class=\"alert alert-success\">{{time}}</div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/topN/topN.html",
    "<div class=\"top-n\">\r" +
    "\n" +
    "    <mlhr-table \r" +
    "\n" +
    "      options=\"tableOptions\"\r" +
    "\n" +
    "      columns=\"columns\" \r" +
    "\n" +
    "      rows=\"items\">\r" +
    "\n" +
    "    </mlhr-table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/vismRoster/vismRoster.html",
    "<div class=\"vismRoster\">\r" +
    "\n" +
    "\t<table id=\"tblVismRoster\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "\t\t<thead>\t\r" +
    "\n" +
    "\t\t\t<th>VISN</th>\r" +
    "\n" +
    "\t\t\t<th>Network Name</th>\r" +
    "\n" +
    "\t\t\t<th>Region Served</th>\r" +
    "\n" +
    "\t\t\t<th>Total Patients</th>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"ind in data\">\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.VISN}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.NetworkName}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.RegionServed}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{ind.Total}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>"
  );

}]);
