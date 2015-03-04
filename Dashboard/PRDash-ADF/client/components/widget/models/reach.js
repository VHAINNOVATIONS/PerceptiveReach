/*
 * Copyright (c) 2015 Perceptive Reach License ALL Rights Reserved.
 *
 * Not sure what license goes here yet.
 */

'use strict';

angular.module('ui.models')  
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
  });