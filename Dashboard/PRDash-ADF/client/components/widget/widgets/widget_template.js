angular.module("ui.widgets").run(["$templateCache", function($templateCache) {

  $templateCache.put("client/components/widget/widgets/CDSQuestionnaire/CDSQuestionnaire.html",
    "<div id=\"cdsQuestionnaire\" title=\"CDS Questionnaire\">\r" +
    "\n" +
    "   <!--1/26/2016 The below code is left for future use, Delete if not needed -->\r" +
    "\n" +
    "        <!-- <ul class=\"nav nav-pills\" role=\"tablist\" id=\"cdsTabs\" style=\"margin-top:5px;\">\r" +
    "\n" +
    "          <li class=\"active\">\r" +
    "\n" +
    "              <a href=\"#home\" role=\"tab\" data-toggle=\"tab\">\r" +
    "\n" +
    "                   Home\r" +
    "\n" +
    "              </a>\r" +
    "\n" +
    "          </li>\r" +
    "\n" +
    "          <li><a href=\"#options\" role=\"tab\" data-toggle=\"tab\">\r" +
    "\n" +
    "                  Options\r" +
    "\n" +
    "              </a>\r" +
    "\n" +
    "          </li>\r" +
    "\n" +
    "          <li>\r" +
    "\n" +
    "              <a href=\"#help\" role=\"tab\" data-toggle=\"tab\">\r" +
    "\n" +
    "                   Help\r" +
    "\n" +
    "              </a>\r" +
    "\n" +
    "          </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "        <div class=\"tab-content\" id=\"cdsTabContent\" style=\"margin-top:5px;\">\r" +
    "\n" +
    "          <div class=\"tab-pane fade active in\" id=\"home\">\r" +
    "\n" +
    "            \r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"tab-pane fade\" id=\"options\">\r" +
    "\n" +
    "              <h2>Options</h2>\r" +
    "\n" +
    "              <img src=\"https://avatars1.githubusercontent.com/u/1252476?v=3&s=200\" alt=\"Cats\"/>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"tab-pane fade\" id=\"help\">\r" +
    "\n" +
    "              <h2>Help</h2>\r" +
    "\n" +
    "              <img src=\"https://avatars1.githubusercontent.com/u/1252476?v=3&s=200\" alt=\"Cats\"/>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "          <div class=\"panel panel-default\" style=\"margin-top:5px;\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "              <h3 class=\"panel-title\">Emergency Contact Information</h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\">\r" +
    "\n" +
    "              For emergency assistance please contact: P: (xxx) xxx-xxxx, e: email@email.com\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div> -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div id=\"cdsConditionDiv\"  style=\"margin-top:5px;\">\r" +
    "\n" +
    "        <div >\r" +
    "\n" +
    "           <legend>Clinical Decision Support:</legend>\r" +
    "\n" +
    "              <fieldset style=\"border:1px solid lightgray;border-radius:5px;\">\r" +
    "\n" +
    "                Please choose the specific symptoms, diagnoses, or conditions the Veteran is facing.  After all selections have been made please press <strong>‘Next’</strong>.\r" +
    "\n" +
    "              </fieldset>\r" +
    "\n" +
    "              <div class=\"cdsUIList\" style=\"margin:10px;padding:5px;overflow-y:scroll;\">\r" +
    "\n" +
    "                <label ng-repeat=\"condition in data.conditions\" style=\"display:block;\">\r" +
    "\n" +
    "                      <input type=\"checkbox\" ng-click=\"ChkbxClicked()\" name=\"chkbx_{{condition.Condition_ID}}\"> {{condition.Condition}}\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "              <div style=\"height:40px;padding:5px;\">\r" +
    "\n" +
    "                 <button ng-click=\"GotoQuestions()\" alt=\"Next(Questions)\" title=\"Next(Questions)\" ng-disabled=\"!IsChecked\" class=\"btn btn-primary pull-right\">Next</button>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div id=\"cdsQuestionDiv\" class=\"hidden\">\r" +
    "\n" +
    "       <legend>Question(s):</legend>\r" +
    "\n" +
    "       <div class=\"cdsUIList\" style=\"margin:10px;padding:5px;overflow-y:scroll;\">\r" +
    "\n" +
    "         <div ng-repeat=\"question in filteredQuestions\">\r" +
    "\n" +
    "            <label>{{$index+1}}. {{question.Question}}  </label>\r" +
    "\n" +
    "             <div class=\"dropdown\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default\"\r" +
    "\n" +
    "                            data-toggle=\"dropdown\" name=\"question_{{question.Question_ID}}\">\r" +
    "\n" +
    "                        <span>Select</span>\r" +
    "\n" +
    "                        <span class=\"caret\"></span>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <ul class=\"dropdown-menu\" >\r" +
    "\n" +
    "                        <li ng-click=\"AnswerSelected($event)\"><a href=\"#\">Yes</a></li>\r" +
    "\n" +
    "                        <li ng-click=\"AnswerSelected($event)\"><a href=\"#\">No</a></li>\r" +
    "\n" +
    "                        <li ng-click=\"AnswerSelected($event)\"><a href=\"#\">N/A</a></li>\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "         </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "       <div style=\"height:40px;padding:5px;\">\r" +
    "\n" +
    "          <button ng-click=\"BacktoConditions()\" alt=\"Back(Conditions)\" title=\"Back(Conditions)\" class=\"btn btn-primary pull-left\" >Back</button>\r" +
    "\n" +
    "          <button ng-click=\"GotoTreatments()\" alt=\"Next(Treatment)\" title=\"Next(Treatment)\" class=\"btn btn-primary pull-right\" >Next</button>\r" +
    "\n" +
    "       </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div id=\"cdsTreatmentDiv\" class=\"hidden\">\r" +
    "\n" +
    "        <legend>Treatment(s):</legend>\r" +
    "\n" +
    "        <div class=\"cdsUIList\" style=\"margin:10px;padding:5px;overflow-y:scroll;\">\r" +
    "\n" +
    "          <div ng-repeat=\"treatment in filteredTreatments\">\r" +
    "\n" +
    "            <label>{{$index+1}}. {{treatment.Treatment}}</label>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"height:40px;padding:5px;\">\r" +
    "\n" +
    "          <button ng-click=\"BacktoQuestions()\" alt=\"Back(Questions)\" title=\"Back(Questions)\" class=\"btn btn-primary pull-left\">Back</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

  $templateCache.put("client/components/widget/widgets/appointment/appointment.html",
    "<div class=\"appointment\">\r" +
    "\n" +
    "\t<table id=\"tblAppointment\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "        <thead>\r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th><a href=\"\" ng-click=\"predicate = 'Date'; reverse=false\">Date</a></th>\r" +
    "\n" +
    "            <th><a href=\"\" ng-click=\"predicate = 'Type'; reverse=!reverse\">Type</a></th>\r" +
    "\n" +
    "            <th><a href=\"\" ng-click=\"predicate = 'Cancelled'; reverse=!reverse\">Cancelled</a></th>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"appt in data track by $index | orderBy:predicate:reverse\">\r" +
    "\n" +
    "            <td>{{ appt.ApptDate }}</td>\r" +
    "\n" +
    "             <td>{{ appt.PrimarySecondaryStopCodeName }}</td>\r" +
    "\n" +
    "            <td>{{ appt.CancelNoShowCodeDesc }}</td>\r" +
    "\n" +
    "\r" +
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
    "<div name=\"clinicalDecisionSupport\" style=\"overflow:auto; height:auto; width:auto\">\r" +
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
    "\t\t<br><br>For more information visit the full Clinical Practice Guide at <a href=\"{{cpg.GuidelineURL}}\" title=\"Clinical Practice Guide\" alt=\"Clinical Practice Guide\">{{cpg.GuidelineURL}}</a>\r" +
    "\n" +
    "\t\t<br><br>For guidance on proactive outreach and intervention strategies visit the Toolkit for Interventions <a href=\"{{cpg.ToolkitURL}}\" title=\"Toolkit for Interventions\" alt=\"Toolkit for Interventions\">{{cpg.ToolkitURL}}</a><br><br>\r" +
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
    "<div id=\"diagnosisDiv\" class=\"diagnoses\" title=\"Diagnoses Widget\">\r" +
    "\n" +
    "\t<table id=\"tblDiagnoses\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "        <thead>\r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Diagnosis\" title=\"Sort by Diagnosis\" href=\"\" ng-click=\"predicate = 'Diagnosis'; reverse=false\">Diagnosis</a></th>\r" +
    "\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"ICD\" title=\"Sort by ICD\" href=\"\" ng-click=\"predicate = 'ICD'; reverse=false\">ICD</a></th>\r" +
    "\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Date\" title=\"Sort by Date\" href=\"\" ng-click=\"predicate = 'Date'; reverse=false\">Date</a></th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"diagnosis in data track by $index | orderBy:predicate:reverse\">\r" +
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
    "</div> \r" +
    "\n"
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

  $templateCache.put("client/components/widget/widgets/enterdata/enterdata.html",
    "<div>\r" +
    "\n" +
    "    <div ng-form=\"enterWdgtForm\">\r" +
    "\n" +
    "      <div class=\"panel panel-default\">\r" +
    "\n" +
    "        <div class=\"panel-body\" style=\"padding-left:40px\">\r" +
    "\n" +
    "          <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-12 bs-example hr-text\" style=\"padding: 2px;\">\r" +
    "\n" +
    "              <div class=\"panel-body\" style=\"padding:5px;\">\r" +
    "\n" +
    "                <div class=\"col-md-6\" ng-attr-title=\"{{data.HighRisk_UserNotes[hrIndex].EntryDate | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "                  <label style=\"font-weight:normal\">User Notes:</label>\r" +
    "\n" +
    "                  <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "                    <button type=\"button\" name=\"hrBack\" class=\"btn btn-default pull-left\" ng-disabled=\"hrIndex >= data.HighRisk_UserNotes.length-1\" ng-click=\"goHrBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <div class=\"pull-left\">\r" +
    "\n" +
    "                      <input type=\"text\" ng-keypress=\"jumpTo($event,'hr')\" class=\"enterDataNumInput\" ng-model=\"hrIndex\" ></input>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <button type=\"button\" name=\"hrFwd\" class=\"btn btn-default pull-left\" ng-disabled=\"hrIndex === 0\" ng-click=\"goHrForward()\"><i class=\"glyphicon glyphicon-arrow-right\" \r" +
    "\n" +
    "                      style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                  </div><br/>\r" +
    "\n" +
    "                  <textarea class=\"col-md-12 enterDataBox\" rows=\"4\" style=\"font-weight:normal;\" type=\"text\" ng-required=\"true\" ng-model=\"hrText\" name=\"highRiskTxt\" ng-change=\"enterDataChanged()\" ng-class=\"{enterDataDirty: enterWdgtForm.highRiskTxt.$dirty && enterWdgtForm.highRiskTxt.$valid}\" id=\"hrText\" maxlength=\"128\"></textarea>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\" ng-attr-title=\"{{data.HighRisk_SPANImport[hrSpanIndex].DateHighRiskLastUpdated | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "                  <label style=\"font-weight:normal\">SPAN Records:</label>\r" +
    "\n" +
    "                  <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "                    <button type=\"button\" name=\"hrSpanBack\" class=\"btn btn-default pull-left\" ng-disabled=\"hrSpanIndex >= data.HighRisk_SPANImport.length-1\" ng-click=\"goHrSpanBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <div class=\"pull-left\">\r" +
    "\n" +
    "                      <input type=\"text\" ng-keypress=\"jumpTo($event,'hrspan')\" class=\"enterDataNumInput\" ng-model=\"hrSpanIndex\" ></input>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <button type=\"button\" name=\"hrSpanFwd\" class=\"btn btn-default pull-left\" ng-disabled=\"hrSpanIndex === 0\" ng-click=\"goHrSpanForward()\"><i class=\"glyphicon glyphicon-arrow-right\"\r" +
    "\n" +
    "                      style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <div class=\"col-md-12 enterDataBox\" style=\"background-color:#e6e6e6;\">\r" +
    "\n" +
    "                    <label style=\"font-weight:normal\">High Risk: {{data.HighRisk_SPANImport[hrSpanIndex].HighRisk}}</label></br>\r" +
    "\n" +
    "                    <label style=\"font-weight:normal\">Date First Identified: {{data.HighRisk_SPANImport[hrSpanIndex].DateFirstIdentifiedAsHighRisk | date: 'dd-MM-yyyy HH:mma'}}</label></br>\r" +
    "\n" +
    "                    <label style=\"font-weight:normal\">Date Last Updated: {{data.HighRisk_SPANImport[hrSpanIndex].DateHighRiskLastUpdated | date: 'dd-MM-yyyy HH:mma'}}</label>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-12 bs-example mh-text\" style=\"padding: 2px;\">\r" +
    "\n" +
    "              <div class=\"panel-body\" style=\"padding:5px;\">\r" +
    "\n" +
    "                <div class=\"col-md-6\" ng-attr-title=\"{{data.PrimaryHealthProvider_UserNotes[mhIndex].EntryDate | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "                  <label style=\"font-weight:normal\">User Notes:</label>\r" +
    "\n" +
    "                  <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "                    <button type=\"button\" name=\"mhBack\" class=\"btn btn-default pull-left\" ng-disabled=\"mhIndex >= data.PrimaryHealthProvider_UserNotes.length-1\" ng-click=\"goMhBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <div class=\"pull-left\">\r" +
    "\n" +
    "                      <input class=\"enterDataNumInput\" type=\"text\" ng-keypress=\"jumpTo($event,'mh')\" ng-change=\"mhIndexChange(mhIndex)\" ng-model=\"mhIndex\" ></input>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <button type=\"button\" name=\"mhFwd\" class=\"btn btn-default pull-left\" ng-disabled=\"mhIndex === 0\" ng-click=\"goMhForward()\"><i class=\"glyphicon glyphicon-arrow-right\" \r" +
    "\n" +
    "                      style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                  </div><br/>\r" +
    "\n" +
    "                  <textarea class=\"col-md-12 enterDataBox\" rows=\"4\" style=\"font-weight:normal;\" type=\"text\" ng-required=\"true\" ng-model=\"mhText\" name=\"mentalProviderTxt\" ng-class=\"{enterDataDirty: enterWdgtForm.mentalProviderTxt.$dirty && enterWdgtForm.mentalProviderTxt.$valid}\" id=\"mhText\" ng-change=\"enterDataChanged()\" maxlength=\"128\"></textarea>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\" > \r" +
    "\n" +
    "                  <label style=\"font-weight:normal\">VistA Records:</label>\r" +
    "\n" +
    "                  \r" +
    "\n" +
    "                  <div class=\"col-md-12 enterDataBox\" style=\"background-color:#e6e6e6;\">\r" +
    "\n" +
    "                   <label style=\"font-weight:normal\">{{noDataFound}}</label>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-12 bs-example sp-text\" style=\"padding: 2px;\">\r" +
    "\n" +
    "              <div class=\"panel-body\" style=\"padding:5px;\">\r" +
    "\n" +
    "                <div class=\"col-md-6\" ng-attr-title=\"{{data.SafetyPlan_UserNotes[spIndex].EntryDate | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "                  <label style=\"font-weight:normal\">User Notes:</label>\r" +
    "\n" +
    "                  <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "                    <button type=\"button\" name=\"spBack\" class=\"btn btn-default pull-left\" ng-disabled=\"spIndex >= data.SafetyPlan_UserNotes.length-1\" ng-click=\"goSpBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <div class=\"pull-left\">\r" +
    "\n" +
    "                      <input type=\"text\" ng-keypress=\"jumpTo($event,'sp')\" class=\"enterDataNumInput\" ng-model=\"spIndex\" ></input>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <button type=\"button\" name=\"spFwd\" class=\"btn btn-default pull-left\" ng-disabled=\"spIndex === 0\" ng-click=\"goSpForward()\"><i class=\"glyphicon glyphicon-arrow-right\" \r" +
    "\n" +
    "                      style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                  </div><br>\r" +
    "\n" +
    "                  <textarea class=\"col-md-12 enterDataBox\" rows=\"4\" style=\"font-weight:normal;\" type=\"text\" ng-required=\"true\" ng-model=\"spText\" name=\"safetyPlanTxt\" ng-class=\"{enterDataDirty: enterWdgtForm.safetyPlanTxt.$dirty && enterWdgtForm.safetyPlanTxt.$valid}\" ng-change=\"enterDataChanged()\" id=\"spText\" maxlength=\"128\"></textarea>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-md-6\" \r" +
    "\n" +
    "                     ng-attr-title=\"{{data.SafetyPlan_SPANImport[spSpanIndex].DateSafetyPlanCompletedOrUpdated | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "                  <label style=\"font-weight:normal\">VistA Records:</label>\r" +
    "\n" +
    "                  <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "                    <button type=\"button\" name=\"spSpanBack\" class=\"btn btn-default pull-left\" ng-disabled=\"spSpanIndex >= data.SafetyPlan_SPANImport.length-1\" ng-click=\"goSpSpanBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <div class=\"pull-left\">\r" +
    "\n" +
    "                      <input type=\"text\" ng-keypress=\"jumpTo($event,'spspan')\" class=\"enterDataNumInput\" ng-model=\"spSpanIndex\" ></input>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <button type=\"button\" name=\"spSpanFwd\" class=\"btn btn-default pull-left\" ng-disabled=\"spSpanIndex === 0\" ng-click=\"goSpSpanForward()\"><i class=\"glyphicon glyphicon-arrow-right\" style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                   <div class=\"col-md-12 enterDataBox\" style=\"background-color:#e6e6e6;\">\r" +
    "\n" +
    "                    <label style=\"font-weight:normal\">Safety Plan Current: {{data.SafetyPlan_SPANImport[spSpanIndex].SafetyPlanCurrent}}</label></br>    \r" +
    "\n" +
    "                    <label style=\"font-weight:normal\">Date Completed/Updated: {{data.SafetyPlan_SPANImport[spSpanIndex].DateSafetyPlanCompletedOrUpdated | date: 'dd-MM-yyyy HH:mma'}}</label>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-12 bs-example comment-text\" style=\"padding: 2px;\">\r" +
    "\n" +
    "               <div class=\"panel-body\" style=\"padding:5px;\">\r" +
    "\n" +
    "                 <div class=\"col-md-12\" ng-attr-title=\"{{data.GeneralComments[commentIndex].EntryDate | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "                   <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "                      <button type=\"button\" name=\"commentBack\" class=\"btn btn-default pull-left\" ng-disabled=\"commentIndex >= data.GeneralComments.length-1\" ng-click=\"goCommentBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                      </button>\r" +
    "\n" +
    "                      <div class=\"pull-left\">\r" +
    "\n" +
    "                        <input type=\"text\" ng-keypress=\"jumpTo($event,'comment')\" class=\"enterDataNumInput\" ng-model=\"commentIndex\" ></input>\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                      <button type=\"button\" name=\"commentFwd\" class=\"btn btn-default pull-left\" ng-disabled=\"commentIndex === 0\" ng-click=\"goCommentForward()\"><i class=\"glyphicon glyphicon-arrow-right\" style=\"font-size:13px;width: 18px;\"></i>\r" +
    "\n" +
    "                      </button>\r" +
    "\n" +
    "                   </div>\r" +
    "\n" +
    "                    <textarea class=\"col-md-12 enterDataBox\" rows=\"4\" style=\"font-weight:normal;\" type=\"text\" ng-required=\"true\" ng-model=\"commentText\" name=\"commentTxt\" ng-class=\"{enterDataDirty: enterWdgtForm.commentTxt.$dirty && enterWdgtForm.commentTxt.$valid}\" ng-change=\"enterDataChanged()\" id=\"commentText\"></textarea>\r" +
    "\n" +
    "                 </div>\r" +
    "\n" +
    "               </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-6\" style=\"float:right;\">\r" +
    "\n" +
    "              <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"addNewData()\" style=\"float:right;margin:5px;\">Add Data</button>\r" +
    "\n" +
    "              <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"clearEdits()\" style=\"float:right;margin:5px;\">Clear Edits</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

  $templateCache.put("client/components/widget/widgets/facilityRoster/facilityRoster.html",
    "<div id=\"facilityRosterDiv\" title=\"Navigate to header and click down arrow to enter table, tab to leave table rows\">\r" +
    "\n" +
    "    <table id=\"tblFacilityRoster\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    " "
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
    "                    ng-class=\"{active: mode === 'MINUTES'}\">Minutes</button>\r" +
    "\n" +
    "\r" +
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
    "<div id=\"medicationDiv\" class=\"medication\" title=\"Medication Widget\">\r" +
    "\n" +
    "    <table id=\"tblMedication\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "        <thead> \r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Medication\" title=\"Sort by Medication\" href=\"\" ng-click=\"predicate = 'Medication'; reverse=false\">Medication</a></th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"meds in data track by $index | orderBy:predicate:reverse\">\r" +
    "\n" +
    "            <td>{{ meds.MedicationName }}</td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div> "
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
    "<div id=\"ageGroupDiv\" class=\"nationalAgeGroups\" title=\"National Age Groups Widget\">\r" +
    "\n" +
    "\t<table id=\"tblAgeGroups\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div> "
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
    "<div id=\"nationalGenderDiv\" class=\"nationalGenderDistribution\" title=\"National Gender Widget\">\r" +
    "\n" +
    "\t<table id=\"tblGenderDistribution\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\r" +
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
    "<div id=\"militaryBranchDiv\" class=\"nationalMilitaryBranch\" title=\"Military Branch Widget\">\r" +
    "\n" +
    "\t<table id=\"tblMilitaryBranch\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/nationalOutReachStatus/nationalOutReachStatus.html",
    "<div id=\"outReachDiv\" class=\"nationalOutReachStatus\" title=\"OutReach Status Widget\">\r" +
    "\n" +
    "\t<table id=\"tblNationalOutReachStatus\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\r" +
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
    "<div class=\"nationalTopMidRisk\" style=\"height:100%;width:100%;\">\r" +
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
    "<div class=\"nationalVAMC\" title=\"National VAMC Widget\">\r" +
    "\n" +
    "\t<table id=\"tblVAMC\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "\t\t<thead>\t\r" +
    "\n" +
    "\t\t\t<th scope=\"col\" tabindex=\"-1\"><a alt=\"VAMC Name\" title=\"Sort by VAMC Name\" href=\"\" ng-click=\"predicate = 'VAMC Name'; reverse=false\">VAMC Name</a></th>\r" +
    "\n" +
    "\t\t\t<th scope=\"col\" tabindex=\"-1\"><a alt=\"State\" title=\"Sort by State\" href=\"\" ng-click=\"predicate = 'State'; reverse=false\">State</a></th>\r" +
    "\n" +
    "\t\t\t<th scope=\"col\" tabindex=\"-1\"><a alt=\"VISN\" title=\"Sort by VISN\" href=\"\" ng-click=\"predicate = 'VISN'; reverse=false\">VISN</a></th>\r" +
    "\n" +
    "\t\t\t<th scope=\"col\" tabindex=\"-1\"><a alt=\"Total Number of Patients\" title=\"Sort by Total Number of Patients\" href=\"\" ng-click=\"predicate = 'Total Number of Patients'; reverse=false\">Total Number of Patients</a></th>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"ind in data track by $index | orderBy:predicate:reverse\">\r" +
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
    "<div id=\"patientFlagDiv\" class=\"patient-flags\" title=\"Patient Flags Widget\">\r" +
    "\n" +
    "    <table id=\"tblPatientFlags\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "        <thead>\r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Flag\" title=\"Sort by Flag\" href=\"\" ng-click=\"predicate = 'Flag'; reverse=false\">Flag</a></th>\r" +
    "\n" +
    "            <th scope=\"col\" tabindex=\"-1\"><a alt=\"Cat\" title=\"Sort by Cat\" href=\"\" ng-click=\"predicate = 'Cat'; reverse=false\">Cat</a></th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"flags in data | orderBy:predicate:reverse\">\r" +
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
    "<div id=\"patientRosterDiv\" title=\"Navigate to header and click tab arrow to enter table, esc to leave table rows\">\r" +
    "\n" +
    "    <table id=\"tblPatient\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div> \r" +
    "\n"
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

  $templateCache.put("client/components/widget/widgets/predictionChart/predictionChart.html",
    "<div class=\"prediction-chart\" style=\"height:100%;width:100%;\">\r" +
    "\n" +
    "    <nvd3-line-chart\r" +
    "\n" +
    "            data=\"data\",\r" +
    "\n" +
    "            height=\"450\"\r" +
    "\n" +
    "            forcex=\"[0.5,17.5]\"\r" +
    "\n" +
    "            xAxisTickValues=\"xAxisTickValuesFunction()\"\r" +
    "\n" +
    "            xAxisTickFormat=\"xAxisTickFormatFunction()\"\r" +
    "\n" +
    "            xAxisShowMaxMin=\"false\"\r" +
    "\n" +
    "            xAxisLabel=\"Month\"\r" +
    "\n" +
    "            yAxisTickFormat=\"yAxisTickFormatFunction()\"\r" +
    "\n" +
    "            yAxisLabel=\"Attempts\"\r" +
    "\n" +
    "            yAxisRotateLabels=\"true\"\r" +
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
    "            useInteractiveGuideline=\"true\"\r" +
    "\n" +
    "            tooltips=\"true\">\r" +
    "\n" +
    "    </nvd3-line-chart>\r" +
    "\n" +
    "</div>"
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
    "<div title=\"Health Indicators Suicide Statistics Widget\">\r" +
    "\n" +
    "\t<br>This product uses the Health Indicators Warehouse API but is not endorsed or certified by the Health Indicators Warehouse or its associated Federal agencies.\r" +
    "\n" +
    "\t<div id=\"suicideStatisticsDiv\" class=\"suicideStatistics\">\r" +
    "\n" +
    "\t<table id=\"tblSuicideStatistics\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<br>For more information visit the Suicide Deaths per 100000 indicator site at HealthIndicators.gov <a title=\"Suicide deaths per 100000 @ HealthIndicators.gov\" \r" +
    "\n" +
    "\thref=\"http://www.healthindicators.gov/Indicators/Suicide-deaths-per-100000_1105/Profile/ClassicData\">\r" +
    "\n" +
    "\thttp://www.healthindicators.gov/Indicators/Suicide-deaths-per-100000_1105/Profile/ClassicData</a>\r" +
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
    "<div id=\"VISNRosterDiv\" title=\"Navigate to header and click down arrow to enter table, tab to leave table rows\"> \r" +
    "\n" +
    "    <table id=\"tblVismRoster\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" width=\"100%\">\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);
