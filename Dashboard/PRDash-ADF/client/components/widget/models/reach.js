/*
 * Copyright (c) 2015 Perceptive Reach License ALL Rights Reserved.
 *
 * Not sure what license goes here yet.
 */

'use strict';

angular.module('ui.models')
  .factory('VeteranRosterDataModel', function ($http, WidgetDataModel) {
    function VeteranRosterDataModel() {
    }

    VeteranRosterDataModel.prototype = Object.create(WidgetDataModel.prototype);
    VeteranRosterDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(VeteranRosterDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.vamc = (dataModelOptions && dataModelOptions.vamc) ? dataModelOptions.vamc : 9;

        this.updateScope([]);
        this.getData();
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
              record.push(String(fullName));
              record.push(String(veteransByVAMC[veteran].SSN));
              record.push(String(veteransByVAMC[veteran].Phone));
              record.push(String(veteransByVAMC[veteran].DateIdentifiedRisk));
              record.push(String(veteransByVAMC[veteran].RiskLevel)); 
              //record.push(String(veteransByVAMC[veteran].OutreachStatus));
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
              var select = "<select class='form-control'><option value=''></option>"+ options+ "</select>";
              record.push(String(select));
                              
              output.push(record);
          }
          output.sort(function(a,b) {return (a.RiskLevel > b.RiskLevel) ? 1 : ((b.RiskLevel > a.RiskLevel) ? -1 : 0);} );
          var columnHeaders = [];
          data = [this.vamc, output, outreachStatus];//{vamc : this.vamc, roster : output};
          console.log(data);
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
        //$http.cancel(this.intervalPromise);
      }
    });

    return VeteranRosterDataModel;
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
  }).factory('PatientFlagDataModel', function ($http, WidgetDataModel) {
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
  }).factory('MedicationDataModel', function ($http, WidgetDataModel) {
    function MedicationDataModel() {
    }

    MedicationDataModel.prototype = Object.create(WidgetDataModel.prototype);
    MedicationDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(MedicationDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getAPI();
      },

      getAPI: function () {
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
  });