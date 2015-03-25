/*
 * Copyright (c) 2015 Perceptive Reach License ALL Rights Reserved.
 *
 * Not sure what license goes here yet.
 */

'use strict';

angular.module('ui.models')
  .factory('CommonDataModel', function (WidgetDataModel) {
    function CommonDataModel() {}

    CommonDataModel.prototype = Object.create(WidgetDataModel.prototype);

    CommonDataModel.prototype.setup = function (widget, scope) {
      WidgetDataModel.prototype.setup.call(this, widget, scope);

      this.dataModelOptions = this.dataModelOptions || {};
      this.dataModelOptions.common = this.dataModelOptions.common  ||  { data: 'default value' };
     
      scope.$on('commonDataChanged', function (event, data) {
        console.log('Common data changed for: ' + this.widgetScope.widget.title);
        this.setCommon(data);
      }.bind(this));
    };

    CommonDataModel.prototype.setCommon = function (data) {
      if (data && (!angular.equals(this.dataModelOptions.common, data))) {
        console.log(this.widgetScope.widget.title + ' data model options changed');
        this.dataModelOptions.common = data;
        this.widgetScope.$emit('widgetChanged', this.widgetScope.widget);
      }
    };

    return CommonDataModel;
  })
  .factory('VeteranRosterDataModel', function ($http, CommonDataModel) {
    function VeteranRosterDataModel() {
    }

    //VeteranRosterDataModel.prototype = Object.create(WidgetDataModel.prototype);
    //VeteranRosterDataModel.prototype.constructor = WidgetDataModel;
    VeteranRosterDataModel.prototype = Object.create(CommonDataModel.prototype);
    angular.extend(VeteranRosterDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentVAMC = null;
        this.widgetScope.$on('commonDataChanged', function (event, data) {
          console.log('Inside Common data changed for : ' + this.widgetScope.widget.title);
          /*console.log(data);
          console.log(this.dataModelOptions);*/
          //CommonDataModel.prototype.setCommon.call(this,data);
          this.currentVAMC = this.vamc;
          this.vamc = (dataModelOptions && dataModelOptions.common.data.facilitySelected) ? dataModelOptions.common.data.facilitySelected : 9;
          /*console.log('widgetScope');
          console.log(this.widgetScope);
          console.log('commonData:');
          console.log(this.dataModelOptions.common);*/
          if(this.vamc != this.currentVAMC)
            this.getData();
        }.bind(this));
        //this.updateScope([]);
        //this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];
        var outreachStatus = null;

        $http.get('/api/getListOfOutreachStatus')
        .success(function(listOfOutreachStatus) {
          outreachStatus = listOfOutreachStatus;
        }.bind(this));

        $http.get('/api/veteranRoster?id=' + this.vamc)
        .success(function(veteransByVAMC) {
          var output = [];
          var vamc = "";
          
          while(outreachStatus == null){} // wait until outreachStatus is not null

          console.log("outreachStatus -  ");
          console.log(outreachStatus);  
          for (var veteran in veteransByVAMC) {
              vamc = veteransByVAMC[0].VAMC
              var record = [];
              var fullName = veteransByVAMC[veteran].LastName + ", " +veteransByVAMC[veteran].FirstName + " " + veteransByVAMC[veteran].MiddleName; 
             /* record.push(String(fullName));
              record.push(String(veteransByVAMC[veteran].SSN));
              record.push(String(veteransByVAMC[veteran].Phone));
              record.push(String(veteransByVAMC[veteran].DateIdentifiedRisk));
              record.push(String(veteransByVAMC[veteran].RiskLevel)); */
              //record.push(String(veteransByVAMC[veteran].OutreachStatus));
              veteransByVAMC[veteran].Name = fullName;
              var options = "";
              var temp = "";
              var selected = " selected='selected'";
              for(var outreachStat in outreachStatus){
                if(veteransByVAMC[veteran].OutreachStatus == outreachStatus[outreachStat].OutReachStatusID)
                  temp = "<option value=" + outreachStatus[outreachStat].OutReachStatusID + selected + ">" + outreachStatus[outreachStat].StatusName + "</option>";
                else
                  temp = "<option value=" + outreachStatus[outreachStat].OutReachStatusID + ">" + outreachStatus[outreachStat].StatusName + "</option>";
                options += temp;
              }
              var select = "<select class='form-control' style='width: 180px;' id='vet_" + veteransByVAMC[veteran].ReachID + "'><option value=''></option>"+ options+ "</select>";
              //record.push(String(select));
              veteransByVAMC[veteran].OutreachStatusSelect = select;                
              //output.push(veteransByVAMC);
          }
          //output.sort(function(a,b) {return (a.RiskLevel > b.RiskLevel) ? 1 : ((b.RiskLevel > a.RiskLevel) ? -1 : 0);} );
          var columnHeaders = [];
          //data = [this.vamc, output, outreachStatus];//{vamc : this.vamc, roster : output};
          data = [this.vamc, veteransByVAMC, outreachStatus];
          console.log(data);
          this.updateScope(data);
        }.bind(this));
      },

      saveOutreachData: function (outreachStatus, veteranID) {
        $http.put('/api/veteranRoster?vetReachID=' + veteranID, {'outreachStatus': outreachStatus})
        .success(function(data) {
          //alert(data);
        });  
      },
      updateVAMC: function (vamc) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.vamc = vamc;
        this.vamc = vamc;
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
        //$http.cancel(this.intervalPromise);
      }
    });

    return VeteranRosterDataModel;
  })
  .factory('ClinicalDecisionSupportDataModel', function ($http, CommonDataModel) {
    function ClinicalDecisionSupportDataModel() {
    }

    /*ClinicalDecisionSupportDataModel.prototype = Object.create(WidgetDataModel.prototype);
    ClinicalDecisionSupportDataModel.prototype.constructor = WidgetDataModel;*/
    ClinicalDecisionSupportDataModel.prototype = Object.create(CommonDataModel.prototype);
    angular.extend(ClinicalDecisionSupportDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentRiskLevel = null;
        this.widgetScope.$on('commonDataChanged', function (event, data) {
          console.log('Inside Common data changed for : ' + this.widgetScope.widget.title);
          /*console.log(data);
          console.log(this.dataModelOptions);*/
          //CommonDataModel.prototype.setCommon.call(this,data);
          this.currentRiskLevel = this.riskLevel;
          this.riskLevel = (dataModelOptions && dataModelOptions.common.data.veteranObj.RiskLevelID) ? dataModelOptions.common.data.veteranObj.RiskLevelID : null;
          this.guidelineType = (dataModelOptions && dataModelOptions.guidelineType) ? dataModelOptions.guidelineType : null;
          /*console.log('widgetScope');
          console.log(this.widgetScope);
          console.log('commonData:');
          console.log(this.dataModelOptions.common);*/
          if(this.riskLevel != this.currentRiskLevel)
            this.getData();
        }.bind(this));
        

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];
        var options = "";

        if(this.riskLevel && this.guidelineType)
          options += '?guideType=' + this.guidelineType + '&riskLevel=' + this.riskLevel;
        else if(this.riskLevel || this.guidelineType)
          options += (this.riskLevel) ? '?riskLevel=' + this.riskLevel : '?guideType=' + this.guidelineType;
        
        $http.get('/api/clinicalDecisionSupport' + options) // '/api/clinicalDecisionSupport?guideType=%27SRB%27&riskLevel=1'
        .success(function(dataset) {
          console.log('inside Clinical decision support success');
          console.log(dataset);
          data = dataset;
          this.updateScope(data);
        }.bind(this));
      },

      updateRiskLevel: function (riskLevel) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.riskLevel = riskLevel;
        this.riskLevel = riskLevel;
      },

      updateGuidelineType: function (guidelineType) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.guidelineType = guidelineType;
        this.guidelineType = guidelineType;
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return ClinicalDecisionSupportDataModel;
  })      
  .factory('TotalRisksDataModel', function ($http, WidgetDataModel) {
    function TotalRisksDataModel() {
    }

    TotalRisksDataModel.prototype = Object.create(WidgetDataModel.prototype);
    TotalRisksDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(TotalRisksDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.vamc = (dataModelOptions && dataModelOptions.vamc) ? dataModelOptions.vamc : 9;

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/totalRiskByVAMCPieChart?id='+ this.vamc)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      updateVAMC: function (vamc) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.vamc = vamc;
        this.vamc = vamc;
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return TotalRisksDataModel;
  })
.factory('ContactBaseDataModel', function ($http, WidgetDataModel) {
    function ContactBaseDataModel() {
    }

    ContactBaseDataModel.prototype = Object.create(WidgetDataModel.prototype);
    ContactBaseDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(ContactBaseDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        //this.vamc = (dataModelOptions && dataModelOptions.vamc) ? dataModelOptions.vamc : 9;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/vetContactData')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return ContactBaseDataModel;
  })
.factory('ContactEmergencyDataModel', function ($http, WidgetDataModel) {
    function ContactEmergencyDataModel() {
    }

    ContactEmergencyDataModel.prototype = Object.create(WidgetDataModel.prototype);
    ContactEmergencyDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(ContactEmergencyDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/vetEmergencyData?id='+ this.reachID)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return ContactEmergencyDataModel;
  })
.factory('PatientFlagDataModel', function ($http, WidgetDataModel) {
    function PatientFlagDataModel() {
    }

    PatientFlagDataModel.prototype = Object.create(WidgetDataModel.prototype);
    PatientFlagDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(PatientFlagDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/patientFlagData')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return PatientFlagDataModel;
  })
.factory('MedicationDataModel', function ($http, WidgetDataModel) {
    function MedicationDataModel() {
    }

    MedicationDataModel.prototype = Object.create(WidgetDataModel.prototype);
    MedicationDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(MedicationDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/medicationData')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return MedicationDataModel;
  })
.factory('AppointmentDataModel', function ($http, WidgetDataModel) {
    function AppointmentDataModel() {
    }

    AppointmentDataModel.prototype = Object.create(WidgetDataModel.prototype);
    AppointmentDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(AppointmentDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/appointmentData')
        .success(function(dataset) {
                data = dataset; 
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });

    return AppointmentDataModel;
  });