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
        this.setCommon(data);
      }.bind(this));
    };

    CommonDataModel.prototype.setCommon = function (data) {
      if (data && (!angular.equals(this.dataModelOptions.common, data))) {
        this.dataModelOptions.common = data;
      }
    };

    CommonDataModel.prototype.destroy = function () {
      WidgetDataModel.prototype.destroy.call(this);
    };

    return CommonDataModel;
  })
  .factory('PatientDataModel', function ($http, CommonDataModel) {
    function PatientDataModel() {
    }

    PatientDataModel.prototype = Object.create(CommonDataModel.prototype);
    angular.extend(PatientDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentsta3N = null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentsta3N = this.sta3N;
          this.sta3N = (dataModelOptions && dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : 9;
          if(this.sta3N != this.currentsta3N)
            this.getData();
        }.bind(this));

        this.widgetScope.$on('defaultWidgetsSelected', function (event, data) {
          this.dataModelOptions.common = data;
          this.sta3N = data.data.facilitySelected.facility;
          this.getData();
        }.bind(this));
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/patient?sta3N=' + this.sta3N)
        .success(function(rtnVal) {
          var patientsBysta3N = rtnVal.patients;
          var outreachStatus = rtnVal.outreachStatus;
          var output = [];
          var sta3N = "";
          var columnHeaders = [];
          data = [this.sta3N, patientsBysta3N, outreachStatus];
          this.updateScope(data);
        }.bind(this));
      },

      saveOutreachData: function (outreachStatus, veteranID, facilityID) {
        var user = JSON.parse(sessionStorage.user);
        $http.put('/api/patient?vetReachID=' + veteranID, {'outreachStatus': outreachStatus, 'UserID':user.UserID, 'facilityID':facilityID})
        .success(function(data) {
        });
      },
      updatesta3N: function (sta3N) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.sta3N = sta3N;
        this.sta3N = sta3N;
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
        //$http.cancel(this.intervalPromise);
      }
    });

    return PatientDataModel;
  })
  .factory('ClinicalDecisionSupportDataModel', function ($http, CommonDataModel) {
    function ClinicalDecisionSupportDataModel() {
    }

    ClinicalDecisionSupportDataModel.prototype = Object.create(CommonDataModel.prototype);
    angular.extend(ClinicalDecisionSupportDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentRiskLevel = null;
        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentRiskLevel = this.riskLevel;
          this.riskLevel = (dataModelOptions && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.RiskLevelID) ? dataModelOptions.common.data.veteranObj.RiskLevelID : null;
          this.guidelineType = (dataModelOptions && dataModelOptions.guidelineType) ? dataModelOptions.guidelineType : null;
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
          //console.log('inside Clinical decision support success');
          //console.log(dataset);
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
        CommonDataModel.prototype.destroy.call(this);
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

        $http.get('/api/totalRiskByVAMCPieChart?reachID='+ this.vamc)
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
.factory('ContactBaseDataModel', function ($http, CommonDataModel) {
    function ContactBaseDataModel() {
    }

    ContactBaseDataModel.prototype = Object.create(CommonDataModel.prototype);
    ContactBaseDataModel.prototype.constructor = CommonDataModel;

    angular.extend(ContactBaseDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;

        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        if(!this.reachID) {
          this.updateScope(data);
        }
        else {
          $http.get('/api/patientContact?reachID='+ this.reachID)
          .success(function(dataset) {
                  data = dataset;
                  this.updateScope(data);
              }.bind(this));
        }
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return ContactBaseDataModel;
  })
.factory('EmergencyContactDataModel', function ($http, CommonDataModel) {
    function EmergencyContactDataModel() {
    }

    EmergencyContactDataModel.prototype = Object.create(CommonDataModel.prototype);
    EmergencyContactDataModel.prototype.constructor = CommonDataModel;

    angular.extend(EmergencyContactDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;

        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        if(!this.reachID) {
          this.updateScope(data);
        }
        else {
          $http.get('/api/emergencyContact?reachID='+ this.reachID)
                .success(function(dataset) {
                        data = dataset;
                        this.updateScope(data);
                    }.bind(this));
        }
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return EmergencyContactDataModel;
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
.factory('MedicationDataModel', function ($http, CommonDataModel) {
    function MedicationDataModel() {
    }

    MedicationDataModel.prototype = Object.create(CommonDataModel.prototype);
    MedicationDataModel.prototype.constructor = CommonDataModel;

    angular.extend(MedicationDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        //this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;
        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));

        this.updateScope('-');
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/medicationData?reachID='+ this.reachID)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return MedicationDataModel;
  })
.factory('AppointmentDataModel', function ($http, CommonDataModel) {
    function AppointmentDataModel() {
    }

    AppointmentDataModel.prototype = Object.create(CommonDataModel.prototype);
    AppointmentDataModel.prototype.constructor = CommonDataModel;

    angular.extend(AppointmentDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));

        this.updateScope('-');
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/appointmentData?reachID='+ this.reachID)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return AppointmentDataModel;
  })
.factory('DiagnosesDataModel', function ($http, CommonDataModel) {
    function DiagnosesDataModel() {
    }

    DiagnosesDataModel.prototype = Object.create(CommonDataModel.prototype);
    DiagnosesDataModel.prototype.constructor = CommonDataModel;

    angular.extend(DiagnosesDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));

        this.updateScope('-');
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/DiagnosesData?reachID='+ this.reachID)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return DiagnosesDataModel;
  })
.factory('SuicideStatisticsDataModel', function ($http, WidgetDataModel) {
    function SuicideStatisticsDataModel() {
    }

    SuicideStatisticsDataModel.prototype = Object.create(WidgetDataModel.prototype);
    SuicideStatisticsDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(SuicideStatisticsDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];


      $http.get('/api/suicideData')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });
    return SuicideStatisticsDataModel;
  })
  .factory('AgeGroupsMetricsDataModel', function ($http, CommonDataModel) {
    function AgeGroupsMetricsDataModel() {
    }

    AgeGroupsMetricsDataModel.prototype = Object.create(CommonDataModel.prototype);
    AgeGroupsMetricsDataModel.prototype.constructor = CommonDataModel;

    angular.extend(AgeGroupsMetricsDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
          if(dataModelOptions.common.data.facilitySelected.surveillance) {
            this.STA3N = dataModelOptions.common.data.facilitySelected.surveillance;
          }

          if(dataModelOptions.common.data.visnSelected.surveillance) {
            this.VISN = dataModelOptions.common.data.visnSelected.surveillance;
          }
        }
        else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
          this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
        }

        this.widgetScope.$on('commonDataChanged', function (event, data) {

          this.currentVISN = this.VISN;
          this.currentSTA3N = this.STA3N;

          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
            this.VISN = (dataModelOptions.common.data.visnSelected.surveillance) ? dataModelOptions.common.data.visnSelected.surveillance : null;
            this.STA3N = (dataModelOptions.common.data.facilitySelected.surveillance) ? dataModelOptions.common.data.facilitySelected.surveillance : null;
          }
          else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
            this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
            this.VISN = null;
          }

          if(this.STA3N != this.currentSTA3N || this.VISN != this.currentVISN) {
            this.getData();
          }

        }.bind(this));

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        var parameter = '';
        if (this.VISN || this.STA3N) {
            parameter += "?";
        }

        if (this.VISN) {
            parameter += "VISN=" + this.VISN;
        }

        if (this.STA3N) {
            if (this.VISN) parameter += '&';
            parameter += "STA3N=" + this.STA3N;
        }
        $http.get('/api/ageGroupsMetrics'+ parameter)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return AgeGroupsMetricsDataModel;
  })
  /* .factory('NationalCombatEraDataModel', function ($http, WidgetDataModel) {
    function NationalCombatEraDataModel() {
    }

    NationalCombatEraDataModel.prototype = Object.create(WidgetDataModel.prototype);
    NationalCombatEraDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(NationalCombatEraDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
    //this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];


      $http.get('/api/nationalCombatEra')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });
    return NationalCombatEraDataModel;
  })
   .factory('NationalCurrentSafetyPlanDataModel', function ($http, WidgetDataModel) {
    function NationalCurrentSafetyPlanDataModel() {
    }

    NationalCurrentSafetyPlanDataModel.prototype = Object.create(WidgetDataModel.prototype);
    NationalCurrentSafetyPlanDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(NationalCurrentSafetyPlanDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
    //this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];


      $http.get('/api/nationalCurrentSafetyPlan')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });
    return NationalCurrentSafetyPlanDataModel;
  })*/
  .factory('GenderDistributionMetricsDataModel', function ($http, CommonDataModel) {
    function GenderDistributionMetricsDataModel() {
    }

    GenderDistributionMetricsDataModel.prototype = Object.create(CommonDataModel.prototype);
    GenderDistributionMetricsDataModel.prototype.constructor = CommonDataModel;

    angular.extend(GenderDistributionMetricsDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;

        if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
          if(dataModelOptions.common.data.facilitySelected.surveillance) {
            this.STA3N = dataModelOptions.common.data.facilitySelected.surveillance;
          }

          if(dataModelOptions.common.data.visnSelected.surveillance) {
            this.VISN = dataModelOptions.common.data.visnSelected.surveillance;
          }
        }
        else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
          this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
        }

        this.widgetScope.$on('commonDataChanged', function (event, data) {

          this.currentVISN = this.VISN;
          this.currentSTA3N = this.STA3N;

          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
            this.VISN = (dataModelOptions.common.data.visnSelected.surveillance) ? dataModelOptions.common.data.visnSelected.surveillance : null;
            this.STA3N = (dataModelOptions.common.data.facilitySelected.surveillance) ? dataModelOptions.common.data.facilitySelected.surveillance : null;
          }
          else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
            this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
            this.VISN = null;
          }

          if(this.STA3N != this.currentSTA3N || this.VISN != this.currentVISN) {
            this.getData();
          }

        }.bind(this));

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        var parameter = '';
        if (this.VISN || this.STA3N) {
            parameter += "?";
        }

        if (this.VISN) {
            parameter += "VISN=" + this.VISN;
        }

        if (this.STA3N) {
            if (this.VISN) parameter += '&';
            parameter += "STA3N=" + this.STA3N;
        }
        $http.get('/api/genderDistributionMetrics'+ parameter)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return GenderDistributionMetricsDataModel;
  })
  .factory('PredictionChartDataModel', function ($http, CommonDataModel) {
    function PredictionChartDataModel() {
    }

    PredictionChartDataModel.prototype = Object.create(CommonDataModel.prototype);
    PredictionChartDataModel.prototype.constructor = CommonDataModel;

    angular.extend(PredictionChartDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;


        if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
          if(dataModelOptions.common.data.facilitySelected.surveillance) {
            this.STA3N = dataModelOptions.common.data.facilitySelected.surveillance;
          }
        }
        else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
            this.STA3N = null;
        }

        this.widgetScope.$on('commonDataChanged', function (event, data) {

          this.currentSTA3N = this.STA3N;

          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
            this.STA3N = (dataModelOptions.common.data.facilitySelected.surveillance) ? dataModelOptions.common.data.facilitySelected.surveillance : null;
            if(this.STA3N != this.currentSTA3N) {
              this.getData();
            }
          }

        }.bind(this));

        this.getData();
      },

      getData: function () {

        if (this.STA3N) {
          var parameter = "?STA3N=" + this.STA3N;
          $http.get('/api/prediction'+ parameter).success(function(predictionData) {
            this.updateScope(predictionData);
          }.bind(this));
          return;
        }
        this.updateScope([]);
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return PredictionChartDataModel;
  })
  /*  .factory('NationalHighRiskFlagDataModel', function ($http, WidgetDataModel) {
    function NationalHighRiskFlagDataModel() {
    }

    NationalHighRiskFlagDataModel.prototype = Object.create(WidgetDataModel.prototype);
    NationalHighRiskFlagDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(NationalHighRiskFlagDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];


      $http.get('/api/nationalHighRiskFlag')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });
    return NationalHighRiskFlagDataModel;
  })*/
  .factory('MilitaryBranchMetricsDataModel', function ($http, CommonDataModel) {
    function MilitaryBranchMetricsDataModel() {
    }

    MilitaryBranchMetricsDataModel.prototype = Object.create(CommonDataModel.prototype);
    MilitaryBranchMetricsDataModel.prototype.constructor = CommonDataModel;

    angular.extend(MilitaryBranchMetricsDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
          if(dataModelOptions.common.data.facilitySelected.surveillance) {
            this.STA3N = dataModelOptions.common.data.facilitySelected.surveillance;
          }

          if(dataModelOptions.common.data.visnSelected.surveillance) {
            this.VISN = dataModelOptions.common.data.visnSelected.surveillance;
          }
        }
        else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
          this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
        }

        this.widgetScope.$on('commonDataChanged', function (event, data) {

          this.currentVISN = this.VISN;
          this.currentSTA3N = this.STA3N;

          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
            this.VISN = (dataModelOptions.common.data.visnSelected.surveillance) ? dataModelOptions.common.data.visnSelected.surveillance : null;
            this.STA3N = (dataModelOptions.common.data.facilitySelected.surveillance) ? dataModelOptions.common.data.facilitySelected.surveillance : null;
          }
          else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
            this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
            this.VISN = null;
          }

          if(this.STA3N != this.currentSTA3N || this.VISN != this.currentVISN) {
            this.getData();
          }

        }.bind(this));

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        var parameter = '';
        if (this.VISN || this.STA3N) {
            parameter += "?";
        }

        if (this.VISN) {
            parameter += "VISN=" + this.VISN;
        }

        if (this.STA3N) {
            if (this.VISN) parameter += '&';
            parameter += "STA3N=" + this.STA3N;
        }

        $http.get('/api/militaryBranchMetrics'+ parameter)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return MilitaryBranchMetricsDataModel;
  })
  /* .factory('NationalPTSDMDDSUDDataModel', function ($http, WidgetDataModel) {
    function NationalPTSDMDDSUDDataModel() {
    }

    NationalPTSDMDDSUDDataModel.prototype = Object.create(WidgetDataModel.prototype);
    NationalPTSDMDDSUDDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(NationalPTSDMDDSUDDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
    //this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];


      $http.get('/api/nationalPTSDMDDSUD')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });
    return NationalPTSDMDDSUDDataModel;
  })*/
  .factory('TopMidRiskMetricsDataModel', function ($http, CommonDataModel) {
      function TopMidRiskMetricsDataModel() {
      }

      TopMidRiskMetricsDataModel.prototype = Object.create(CommonDataModel.prototype);
      TopMidRiskMetricsDataModel.prototype.constructor = CommonDataModel;

      angular.extend(TopMidRiskMetricsDataModel.prototype, {
        init: function () {
        var dataModelOptions = this.dataModelOptions;
        if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
          if(dataModelOptions.common.data.facilitySelected.surveillance) {
            this.STA3N = dataModelOptions.common.data.facilitySelected.surveillance;
          }

          if(dataModelOptions.common.data.visnSelected.surveillance) {
            this.VISN = dataModelOptions.common.data.visnSelected.surveillance;
          }
        }
        else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
          this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
        }

        this.widgetScope.$on('commonDataChanged', function (event, data) {

          this.currentVISN = this.VISN;
          this.currentSTA3N = this.STA3N;

          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
            this.VISN = (dataModelOptions.common.data.visnSelected.surveillance) ? dataModelOptions.common.data.visnSelected.surveillance : null;
            this.STA3N = (dataModelOptions.common.data.facilitySelected.surveillance) ? dataModelOptions.common.data.facilitySelected.surveillance : null;
          }
          else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
            this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
            this.VISN = null;
          }

          if(this.STA3N != this.currentSTA3N || this.VISN != this.currentVISN) {
            this.getData();
          }

        }.bind(this));

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        var parameter = '';
        if (this.VISN || this.STA3N) {
            parameter += "?";
        }

        if (this.VISN) {
            parameter += "VISN=" + this.VISN;
        }

        if (this.STA3N) {
            if (this.VISN) parameter += '&';
            parameter += "STA3N=" + this.STA3N;
        }

        $http.get('/api/topMidRiskMetrics'+ parameter)
        .success(function(dataset) {
            var data = [];
            for (var i = 0; i < dataset.length; i++) {
               data.push({key:dataset[i].RiskLevel,
                    values:[{
                              RiskLabel: dataset[i].RiskLevel,
                              value: dataset[i].Total
                            }]
            });
        }
        this.updateScope(data);
       }.bind(this));
          //}
      },

      destroy: function () {
         CommonDataModel.prototype.destroy.call(this);
        }
      });

      return TopMidRiskMetricsDataModel;
  })

  /* .factory('NationalVAClinicTwelveMonthsDataModel', function ($http, WidgetDataModel) {
    function NationalVAClinicTwelveMonthsDataModel() {
    }

    NationalVAClinicTwelveMonthsDataModel.prototype = Object.create(WidgetDataModel.prototype);
    NationalVAClinicTwelveMonthsDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(NationalVAClinicTwelveMonthsDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
    //this.reachID = (dataModelOptions && dataModelOptions.reachID) ? dataModelOptions.reachID : 12;

        this.updateScope('-');
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];


      $http.get('/api/nationalVAClinicTwelveMonths')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
      }
    });
    return NationalVAClinicTwelveMonthsDataModel;
  })*/
   .factory('VAMCMetricsDataModel', function ($http, CommonDataModel) {
    function VAMCMetricsDataModel() {
    }

    VAMCMetricsDataModel.prototype = Object.create(CommonDataModel.prototype);
    VAMCMetricsDataModel.prototype.constructor = CommonDataModel;

    angular.extend(VAMCMetricsDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentID = null;
        var currentVISN = null;
        var currentSTA3N = null;
        if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
          if(dataModelOptions.common.data.facilitySelected.surveillance) {
            currentSTA3N = dataModelOptions.common.data.facilitySelected.surveillance;
          }

          if(dataModelOptions.common.data.visnSelected.surveillance) {
            currentVISN = dataModelOptions.common.data.visnSelected.surveillance;
          }
        }
        else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
          currentSTA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
        }

        this.widgetScope.$on('commonDataChanged', function (event, data) {

          this.currentVISN = this.VISN;
          this.currentSTA3N = this.STA3N;

          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
            this.VISN = (dataModelOptions.common.data.visnSelected.surveillance) ? dataModelOptions.common.data.visnSelected.surveillance : null;
            this.STA3N = (dataModelOptions.common.data.facilitySelected.surveillance) ? dataModelOptions.common.data.facilitySelected.surveillance : null;
          }
          else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
            this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
            this.VISN = null;
          }

          if(this.STA3N != this.currentSTA3N || this.VISN != this.currentVISN) {
            this.getData();
          }

        }.bind(this));

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];

        var parameter = '';
        if (this.VISN || this.STA3N) {
            parameter += "?";
        }

        if (this.VISN) {
            parameter += "VISN=" + this.VISN;
        }

        if (this.STA3N) {
            if (this.VISN) parameter += '&';
            parameter += "STA3N=" + this.STA3N;
        }
        $http.get('/api/VAMCMetrics'+ parameter)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return VAMCMetricsDataModel;
  })
  .factory('OutreachStatusMetricsDataModel', function ($http, CommonDataModel) {
    function OutreachStatusMetricsDataModel() {
    }

    OutreachStatusMetricsDataModel.prototype = Object.create(CommonDataModel.prototype);
    OutreachStatusMetricsDataModel.prototype.constructor = CommonDataModel;

    angular.extend(OutreachStatusMetricsDataModel.prototype, {
        init: function () {
		   var dataModelOptions = this.dataModelOptions;
		   if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
  			 if(dataModelOptions.common.data.facilitySelected.surveillance) {
  			   this.STA3N = dataModelOptions.common.data.facilitySelected.surveillance;
  			 }

  			 if(dataModelOptions.common.data.visnSelected.surveillance) {
  			   this.VISN = dataModelOptions.common.data.visnSelected.surveillance;
			 }
		   }
		   else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
			   this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
		   }

		   this.widgetScope.$on('commonDataChanged', function (event, data) {

  			 this.currentVISN = this.VISN;
  			 this.currentSTA3N = this.STA3N;

  			 if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
  			   this.VISN = (dataModelOptions.common.data.visnSelected.surveillance) ? dataModelOptions.common.data.visnSelected.surveillance : null;
  			   this.STA3N = (dataModelOptions.common.data.facilitySelected.surveillance) ? dataModelOptions.common.data.facilitySelected.surveillance : null;
  			 }
  			 else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
  			   this.STA3N = (dataModelOptions.common.data.facilitySelected.facility) ? dataModelOptions.common.data.facilitySelected.facility : null;
  			   this.VISN = null;
  			 }

  			 this.getData();

		   }.bind(this));

		   this.updateScope([]);
       if(this.widgetScope.common.data.activeView == "surveillance")
       {
         this.getData();
       }
		 },

			getData: function () {
			var that = this;
			var data = [];

			var parameter = '';
			if (this.VISN || this.STA3N) {
			   parameter += "?";
			}

			if (this.VISN) {
			   parameter += "VISN=" + this.VISN;
			}

			if (this.STA3N) {
			   if (this.VISN) parameter += '&';
			   parameter += "STA3N=" + this.STA3N;
			}

      $http.get('/api/outReachStatusMetrics'+ parameter)
      .success(function(dataset) {
              data = dataset;

              var outreachItems=[{statusName:'IdentifiedPrimaryProvider',displayName:'Identified a primary patient provider.'},
                                 {statusName:'NotifiedProvider',displayName:'Notified provider of the specific patient and program requirements '},
                                 {statusName:'AskedProviderReview',displayName:'Asked provider to review treatment plans for the patient.'},
                                 {statusName:'ReceivedNotification',displayName:'Received notification from Site Facilitator about the patient '},
                                 {statusName:'ReviewedCurrentDiagnosis',displayName:'Reviewed current diagnoses and treatments'},
                                 {statusName:'EstablishedContact',displayName:'Established contact with the patient to review current diagnoses, symptoms, adherence and problems  '},
                                 {statusName:'UpdatedPlan',displayName:'Updated the plan for management and treatment as appropriate'},
                                 {statusName:'EvaluateCaring',displayName:'Evaluate appropriateness of Caring Communications program'},
                                 {statusName:'EvaluateSafetyPlan',displayName:'Evaluate appropriateness of Safety Planning'},
                                 {statusName:'Deceased',displayName:'Deceased'},{statusName:'CannotContact',displayName:'Cannot Contact'},
                                 {statusName:'RefusedServices',displayName:'Refused Services'},{statusName:'CareFromCommunity',displayName:'Care from community'},
                                 {statusName:'ClinicallyNotAtRisk',displayName:'Clinically not at risk'},{statusName:'Other',displayName:'Other'}];

              var outreachData = [];
              for (var i = 0; i < outreachItems.length; i++) { 
                var obj = {};
                obj.checkListStatus = outreachItems[i].displayName;
                obj.complete = data[0]['Sum_'+ outreachItems[i].statusName] == null? 0: data[0]['Sum_'+ outreachItems[i].statusName];
                obj.percent = (data[0]['Percent_'+ outreachItems[i].statusName] == null? 0: data[0]['Percent_'+ outreachItems[i].statusName]) + '%';
                outreachData.push(obj);
              }                  

              this.updateScope(outreachData);
          }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return OutreachStatusMetricsDataModel;
  })
  .factory('FacilityDataModel', function ($http, CommonDataModel) {
    function FacilityDataModel() {
    }

    FacilityDataModel.prototype = Object.create(CommonDataModel.prototype);
    FacilityDataModel.prototype.constructor = CommonDataModel;

    angular.extend(FacilityDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentVISN = null;

        if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
          if(dataModelOptions.common.data.visnSelected.surveillance)
            this.VISN = dataModelOptions.common.data.visnSelected.surveillance;
        }
        else if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
          this.VISN = null;
        }

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentVISN = this.VISN;

          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
            if(dataModelOptions.common.data.visnSelected.surveillance != null)
              this.VISN = dataModelOptions.common.data.visnSelected.surveillance;
          }
          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
            this.VISN = null;
          }
          if(this.VISN != this.currentVISN)
            this.getData();

        }.bind(this));

        this.widgetScope.$on('defaultWidgetsSelected', function (event, data) {
          this.dataModelOptions.common = data;
          this.currentVISN = this.VISN;

          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "surveillance"){
            if(dataModelOptions.common.data.visnSelected.surveillance != null)
              this.VISN = dataModelOptions.common.data.visnSelected.surveillance;
          }
          if(dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.activeView == "facility"){
            this.VISN = null;//(dataModelOptions.common.data.visnSelected.facility != null) ? dataModelOptions.common.data.visnSelected.facility : null;
          }
          if(this.VISN != this.currentVISN)
            this.getData();
        }.bind(this));
        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];
        var activeView = that.dataModelOptions.common.data.activeView;
        var parameter = '';

        if(activeView == "surveillance"){
          if(this.VISN)
          parameter = "?VISN=" + this.VISN;
        }

        //if activeView == "facility", then return all facilities
        
        $http.get('/api/facilityRoster'+ parameter)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return FacilityDataModel;
  })
  .factory('VISNDataModel', function ($http, CommonDataModel) {
    function VISNDataModel() {
    }

    VISNDataModel.prototype = Object.create(CommonDataModel.prototype);
    VISNDataModel.prototype.constructor = CommonDataModel;

    angular.extend(VISNDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentID = null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {

          this.currentID = this.ID;

          if(this.ID != this.currentID)
            this.getData();

        }.bind(this));

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];
      
        $http.get('/api/visnRoster')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return VISNDataModel;
})
.factory('EnterDataDataModel', function ($http, CommonDataModel) {
    function EnterDataDataModel() {
    }

    EnterDataDataModel.prototype = Object.create(CommonDataModel.prototype);
    EnterDataDataModel.prototype.constructor = CommonDataModel;

    angular.extend(EnterDataDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;
        var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

        this.widgetScope.$on('commonDataChanged', function (event, data) {
          this.currentReachID = this.reachID;
          this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
          if(this.reachID != this.currentReachID)
            this.getData();
        }.bind(this));

        this.updateScope('-');
      },

      getData: function () {
        var that = this;
        var data = [];

        $http.get('/api/enterdata?reachID='+ this.reachID)
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },
      saveNewUserData: function(jsonData){
        $http.put('/api/enterdata?reachID='+this.reachID,{'UpdatedUserData':jsonData})
        .success(function(){
          this.getData();
        }.bind(this));
      },
      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return EnterDataDataModel;
  })
  .factory('CommunityResourceDataModel', function ($http, CommonDataModel) {
      function CommunityResourceDataModel() {
      }

      CommunityResourceDataModel.prototype = Object.create(CommonDataModel.prototype);
      CommunityResourceDataModel.prototype.constructor = CommonDataModel;

      angular.extend(CommunityResourceDataModel.prototype, {
         init: function () {
          var dataModelOptions = this.dataModelOptions;
          var currentReachID = (dataModelOptions && dataModelOptions.common && dataModelOptions.common.data && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;

          this.widgetScope.$on('commonDataChanged', function (event, data) {
            this.currentReachID = this.reachID;
            this.reachID = (dataModelOptions && dataModelOptions.common.data.veteranObj && dataModelOptions.common.data.veteranObj.ReachID) ? dataModelOptions.common.data.veteranObj.ReachID : null;
            if(this.reachID != this.currentReachID)
              this.getData();
          }.bind(this));

          this.updateScope('-');
        },

        getData: function () {
          var that = this;
          var data = [];

          $http.get('/api/communityResource')
          .success(function(dataset) {
                  data = dataset;
                  this.updateScope(data);
              }.bind(this));
        },

        destroy: function () {
          CommonDataModel.prototype.destroy.call(this);
        }
      });

      return CommunityResourceDataModel;
    })
  .factory('CDSQuestionnaireDataModel', function ($http, CommonDataModel) {
    function CDSQuestionnaireDataModel() {
    }

    CDSQuestionnaireDataModel.prototype = Object.create(CommonDataModel.prototype);
    CDSQuestionnaireDataModel.prototype.constructor = CommonDataModel;

    angular.extend(CDSQuestionnaireDataModel.prototype, {
       init: function () {
        var dataModelOptions = this.dataModelOptions;

        this.widgetScope.$on('defaultWidgetsSelected', function (event, data) {
          this.dataModelOptions.common = data;
          this.getData();
        }.bind(this));

        this.updateScope([]);
        this.getData();
      },

      getData: function () {
        var that = this;
        var data = [];
      
        $http.get('/api/CDSQuestionnaire')
        .success(function(dataset) {
                data = dataset;
                this.updateScope(data);
            }.bind(this));
      },

      destroy: function () {
        CommonDataModel.prototype.destroy.call(this);
      }
    });

    return CDSQuestionnaireDataModel;
  });
