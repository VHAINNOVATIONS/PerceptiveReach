/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

angular.module('ui.widgets', ['datatorrent.mlhrTable', 'nvd3ChartDirectives', 'datatables','datatables.scroller','datatables.buttons']);
angular.module('ui.websocket', ['ui.visibility', 'ui.notify']);
angular.module('ui.models', ['ui.visibility', 'ui.websocket']);

/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.models')
  .factory('RandomBaseDataModel', function (WidgetDataModel, Visibility) {
    function RandomBaseDataModel() {
    }

    RandomBaseDataModel.prototype = Object.create(WidgetDataModel.prototype);
    RandomBaseDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(RandomBaseDataModel.prototype, {
      init: function () {
        this.stopUpdates = false;
        this.visibilityListener = Visibility.change(function (e, state) {
          if (state === 'hidden') {
            this.stopUpdates = true;
          } else {
            this.stopUpdates = false;
          }
        }.bind(this));
      },

      updateScope: function (data) {
        if (!this.stopUpdates) {
          WidgetDataModel.prototype.updateScope.call(this, data);
        }
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
        Visibility.unbind(this.visibilityListener);
      }
    });

    return RandomBaseDataModel;
  })
  .factory('RandomDataModel', function ($interval, WidgetDataModel) {
    function RandomDataModel() {
    }

    RandomDataModel.prototype = Object.create(WidgetDataModel.prototype);
    RandomDataModel.prototype.constructor = WidgetDataModel;

    angular.extend(RandomDataModel.prototype, {
      init: function () {
        var dataModelOptions = this.dataModelOptions;
        this.limit = (dataModelOptions && dataModelOptions.limit) ? dataModelOptions.limit : 100;

        this.updateScope('-');
        this.startInterval();
      },

      startInterval: function () {
        $interval.cancel(this.intervalPromise);

        this.intervalPromise = $interval(function () {
          var value = Math.floor(Math.random() * this.limit);
          this.updateScope(value);
        }.bind(this), 500);
      },

      updateLimit: function (limit) {
        this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
        this.dataModelOptions.limit = limit;
        this.limit = limit;
      },

      destroy: function () {
        WidgetDataModel.prototype.destroy.call(this);
        $interval.cancel(this.intervalPromise);
      }
    });

    return RandomDataModel;
  })
  .factory('RandomPercentageDataModel', function (RandomBaseDataModel, $interval) {
    function RandomPercentageDataModel() {
    }

    RandomPercentageDataModel.prototype = Object.create(RandomBaseDataModel.prototype);

    RandomPercentageDataModel.prototype.init = function () {
      var value = 50;

      this.intervalPromise = $interval(function () {
        value += Math.random() * 40 - 20;
        value = value < 0 ? 0 : value > 100 ? 100 : value;

        this.updateScope(value);
      }.bind(this), 500);
    };

    RandomPercentageDataModel.prototype.destroy = function () {
      RandomBaseDataModel.prototype.destroy.call(this);
      $interval.cancel(this.intervalPromise);
    };

    return RandomPercentageDataModel;
  })
  .factory('RandomTopNDataModel', function (RandomBaseDataModel, $interval) {
    function RandomTopNDataModel() {
    }

    RandomTopNDataModel.prototype = Object.create(RandomBaseDataModel.prototype);

    RandomTopNDataModel.prototype.init = function () {
      this.intervalPromise = $interval(function () {
        var topTen = _.map(_.range(0, 10), function (index) {
          return {
            name: 'item' + index,
            value: Math.floor(Math.random() * 100)
          };
        });
        this.updateScope(topTen);
      }.bind(this), 500);
    };

    RandomTopNDataModel.prototype.destroy = function () {
      RandomBaseDataModel.prototype.destroy.call(this);
      $interval.cancel(this.intervalPromise);
    };

    return RandomTopNDataModel;
  })
  .factory('RandomBaseTimeSeriesDataModel', function (RandomBaseDataModel, $interval) {
    function RandomTimeSeriesDataModel(options) {
      this.upperBound = (options && options.upperBound) ? options.upperBound : 100;
      this.rate = (options && options.rate) ? options.rate : Math.round(this.upperBound / 2);
    }

    RandomTimeSeriesDataModel.prototype = Object.create(RandomBaseDataModel.prototype);
    RandomTimeSeriesDataModel.prototype.constructor = RandomBaseDataModel;

    angular.extend(RandomTimeSeriesDataModel.prototype, {
      init: function () {
        RandomBaseDataModel.prototype.init.call(this);

        var max = 30;
        var upperBound = this.upperBound;
        var data = [];
        var chartValue = Math.round(upperBound / 2);
        var rate = this.rate;

        function nextValue() {
          chartValue += Math.random() * rate - rate / 2;
          chartValue = chartValue < 0 ? 0 : chartValue > upperBound ? upperBound : chartValue;
          return Math.round(chartValue);
        }

        var now = Date.now();
        for (var i = max - 1; i >= 0; i--) {
          data.push({
            timestamp: now - i * 1000,
            value: nextValue()
          });
        }

        this.updateScope(data);

        this.intervalPromise = $interval(function () {
          if (data.length >= max) {
            data.shift();
          }
          data.push({
            timestamp: Date.now(),
            value: nextValue()
          });

          this.updateScope(data);
        }.bind(this), 1000);
      },

      destroy: function () {
        RandomBaseDataModel.prototype.destroy.call(this);
        $interval.cancel(this.intervalPromise);
      }
    });

    return RandomTimeSeriesDataModel;
  })
  .factory('RandomTimeSeriesDataModel', function (RandomBaseTimeSeriesDataModel) {
    function RandomTimeSeriesDataModel(options) {
      RandomBaseTimeSeriesDataModel.call(this, options);
    }

    RandomTimeSeriesDataModel.prototype = Object.create(RandomBaseTimeSeriesDataModel.prototype);

    angular.extend(RandomTimeSeriesDataModel.prototype, {
      updateScope: function (data) {
        var chart = {
          data: data,
          max: 30,
          chartOptions: {
            vAxis: {}
          }
        };

        RandomBaseTimeSeriesDataModel.prototype.updateScope.call(this, chart);
      }
    });

    return RandomTimeSeriesDataModel;
  })
  .factory('RandomMetricsTimeSeriesDataModel', function (RandomBaseTimeSeriesDataModel) {
    function RandomMetricsTimeSeriesDataModel(options) {
      RandomBaseTimeSeriesDataModel.call(this, options);
    }

    RandomMetricsTimeSeriesDataModel.prototype = Object.create(RandomBaseTimeSeriesDataModel.prototype);

    angular.extend(RandomMetricsTimeSeriesDataModel.prototype, {
      updateScope: function (data) {
        var chart = [
          {
            key: 'Stream1',
            values: data
          },
          {
            key: 'Stream2',
            values: _.map(data, function (item) {
              return { timestamp: item.timestamp, value: item.value + 10 };
            })
          }
        ];

        RandomBaseTimeSeriesDataModel.prototype.updateScope.call(this, chart);
      }
    });

    return RandomMetricsTimeSeriesDataModel;
  })
  .factory('RandomNVD3TimeSeriesDataModel', function (RandomBaseTimeSeriesDataModel) {
    function RandomTimeSeriesDataModel(options) {
      RandomBaseTimeSeriesDataModel.call(this, options);
    }

    RandomTimeSeriesDataModel.prototype = Object.create(RandomBaseTimeSeriesDataModel.prototype);

    angular.extend(RandomTimeSeriesDataModel.prototype, {
      updateScope: function (data) {
        var chart = [
          {
            key: 'Data',
            values: data
          }
        ];

        RandomBaseTimeSeriesDataModel.prototype.updateScope.call(this, chart);
      }
    });

    return RandomTimeSeriesDataModel;
  })
  .factory('RandomMinutesDataModel', function (RandomBaseDataModel, $interval) {
    function RandomTimeSeriesDataModel(options) {
      this.limit = (options && options.limit) ? options.limit : 500;
    }

    RandomTimeSeriesDataModel.prototype = Object.create(RandomBaseDataModel.prototype);

    RandomTimeSeriesDataModel.prototype.init = function () {
      this.generateChart();
      this.intervalPromise = $interval(this.generateChart.bind(this), 2000);
    };

    RandomTimeSeriesDataModel.prototype.generateChart = function () {
      var minuteCount = 30;
      var data = [];
      var limit = this.limit;
      var chartValue = limit / 2;

      function nextValue() {
        chartValue += Math.random() * (limit * 0.4) - (limit * 0.2);
        chartValue = chartValue < 0 ? 0 : chartValue > limit ? limit : chartValue;
        return chartValue;
      }

      var now = Date.now();

      for (var i = minuteCount - 1; i >= 0; i--) {
        data.push({
          timestamp: now - i * 1000 * 60,
          value: nextValue()
        });
      }

      var widgetData = [
        {
          key: 'Data',
          values: data
        }
      ];

      this.updateScope(widgetData);
    };

    RandomTimeSeriesDataModel.prototype.destroy = function () {
      RandomBaseDataModel.prototype.destroy.call(this);
      $interval.cancel(this.intervalPromise);
    };

    return RandomTimeSeriesDataModel;
  });
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

/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.models')
  .factory('WebSocketDataModel', function (WidgetDataModel, webSocket) {
    function WebSocketDataModel() {
    }

    WebSocketDataModel.prototype = Object.create(WidgetDataModel.prototype);

    WebSocketDataModel.prototype.init = function () {
      this.topic = null;
      this.callback = null;
      if (this.dataModelOptions && this.dataModelOptions.defaultTopic) {
        this.update(this.dataModelOptions.defaultTopic);
      }
    };

    WebSocketDataModel.prototype.update = function (newTopic) {
      var that = this;

      if (this.topic && this.callback) {
        webSocket.unsubscribe(this.topic, this.callback);
      }

      this.callback = function (message) {
        that.updateScope(message);
        that.widgetScope.$apply();
      };

      this.topic = newTopic;
      webSocket.subscribe(this.topic, this.callback, this.widgetScope);
    };

    WebSocketDataModel.prototype.destroy = function () {
      WidgetDataModel.prototype.destroy.call(this);

      if (this.topic && this.callback) {
        webSocket.unsubscribe(this.topic, this.callback);
      }
    };

    return WebSocketDataModel;
  })
  .factory('TimeSeriesDataModel', function (WebSocketDataModel) {
    function TimeSeriesDataModel() {
    }

    TimeSeriesDataModel.prototype = Object.create(WebSocketDataModel.prototype);

    TimeSeriesDataModel.prototype.init = function () {
      WebSocketDataModel.prototype.init.call(this);
    };

    TimeSeriesDataModel.prototype.update = function (newTopic) {
      WebSocketDataModel.prototype.update.call(this, newTopic);
      this.items = [];
    };

    TimeSeriesDataModel.prototype.updateScope = function (value) {
      value = _.isArray(value) ? value[0] : value;

      this.items.push({
        timestamp: parseInt(value.timestamp, 10), //TODO
        value: parseInt(value.value, 10) //TODO
      });

      if (this.items.length > 100) { //TODO
        this.items.shift();
      }

      var chart = {
        data: this.items,
        max: 30
      };

      WebSocketDataModel.prototype.updateScope.call(this, chart);
      this.data = [];
    };

    return TimeSeriesDataModel;
  })
  .factory('PieChartDataModel', function (WebSocketDataModel) {
    function PieChartDataModel() {
    }

    PieChartDataModel.prototype = Object.create(WebSocketDataModel.prototype);

    PieChartDataModel.prototype.init = function () {
      WebSocketDataModel.prototype.init.call(this);
      this.data = [];
    };

    PieChartDataModel.prototype.update = function (newTopic) {
      WebSocketDataModel.prototype.update.call(this, newTopic);
    };

    PieChartDataModel.prototype.updateScope = function (value) {
      var sum = _.reduce(value, function (memo, item) {
        return memo + parseFloat(item.value);
      }, 0);

      var sectors = _.map(value, function (item) {
        return {
          key: item.label,
          y: item.value / sum
        };
      });

      sectors = _.sortBy(sectors, function (item) {
        return item.key;
      });

      WebSocketDataModel.prototype.updateScope.call(this, sectors);
    };

    return PieChartDataModel;
  });

/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.visibility', [])
  .factory('Visibility', function ($window) {
    return $window.Visibility;
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.websocket')
  .factory('Visibility', function ($window) {
    return $window.Visibility;
  })
  .provider('webSocket', function () {
    var visibilityTimeout = 20000;
    var maxConnectionAttempts = 5;
    var connectionAttemptInterval = 2000;
    var webSocketURL;
    var explicitConnect;
    var closeRequested;

    return {
      $get: function ($q, $rootScope, $timeout, notificationService, Visibility, $log, $window) {

        var socket;

        var webSocketService;

        var deferred = $q.defer();

        var webSocketError = false;

        var connectionAttempts = 0;

        var onopen = function () {
          $log.info('WebSocket connection has been made. URL: ', webSocketURL);
          connectionAttempts = 0;
          deferred.resolve();
          $rootScope.$apply();
        };

        var onclose = function() {
          // Reset the deferred
          deferred = $q.defer();

          // Check if this close was requested
          if (!closeRequested) {
             
            // Check connectionAttempts count
            if (connectionAttempts < maxConnectionAttempts) {
              // Try to re-establish connection
              var url = this.url;
              connectionAttempts++;
              $timeout(function() {
                $log.info('Attempting to reconnect to websocket');
                webSocketService.connect(url);
              }, connectionAttemptInterval);
            }

            else {
              $log.error('Could not re-establish the WebSocket connection.');
              notificationService.notify({
                type: 'error',
                title: 'Could not re-establish WebSocket Connection',
                text: 'The dashboard lost contact with your DataTorrent Gateway for over ' +
                      Math.round((maxConnectionAttempts * connectionAttemptInterval)/1000) +
                      ' seconds. Double-check your connection and try refreshing the page.'
              });
            }

          }

          // Otherwise reset some flags
          else {
            connectionAttempts = 0;
            closeRequested = false;
          }
        };

        // TODO: listeners for error and close, exposed on
        // service itself
        var onerror = function () {
          webSocketError = true;
          $log.error('WebSocket encountered an error');
        };

        var onmessage = function (event) {
          if (stopUpdates) { // stop updates if page is inactive
            return;
          }

          var message = JSON.parse(event.data);

          var topic = message.topic;

          if (topicMap.hasOwnProperty(topic)) {
            if ($window.WS_DEBUG) {
              if ($window.WS_DEBUG === true) {
                $log.debug('WebSocket ', topic, ' => ', message.data);
              }
              else {
                var search = new RegExp($window.WS_DEBUG + '');
                if (search.test(topic)) {
                  $log.debug('WebSocket ', topic, ' => ', message.data);
                }
              }
            }
            topicMap[topic].fire(message.data);
          }
        };

        var topicMap = {}; // topic -> [callbacks] mapping

        var stopUpdates = false;


        if (Visibility.isSupported()) {
          var timeoutPromise;

          Visibility.change(angular.bind(this, function (e, state) {
            if (state === 'hidden') {
              timeoutPromise = $timeout(function () {
                stopUpdates = true;
                timeoutPromise = null;
              }, visibilityTimeout);
            } else {
              stopUpdates = false;

              if (timeoutPromise) {
                $timeout.cancel(timeoutPromise);
              }

              $log.debug('visible');
            }
          }));
        }

        webSocketService = {
          send: function (message) {
            var msg = JSON.stringify(message);

            deferred.promise.then(function () {
              $log.debug('send ' + msg);
              socket.send(msg);
            });
          },

          subscribe: function (topic, callback, $scope) {
            var callbacks = topicMap[topic];

            // If a jQuery.Callbacks object has not been created for this
            // topic, one should be created and a "subscribe" message 
            // should be sent.
            if (!callbacks) {

              // send the subscribe message
              var message = { type: 'subscribe', topic: topic };
              this.send(message);

              // create the Callbacks object
              callbacks = jQuery.Callbacks();
              topicMap[topic] = callbacks;
            }

            // When scope is provided...
            if ($scope) {

              // ...it's $digest method should be called
              // after the callback has been triggered, so
              // we have to wrap the function.
              var wrappedCallback = function () {
                callback.apply({}, arguments);
                $scope.$digest();
              };
              callbacks.add(wrappedCallback);

              // We should also be listening for the destroy
              // event so we can automatically unsubscribe.
              $scope.$on('$destroy', angular.bind(this, function () {
                this.unsubscribe(topic, wrappedCallback);
              }));

              return wrappedCallback;
            }
            else {
              callbacks.add(callback);
              return callback;
            }
          },

          unsubscribe: function (topic, callback) {
            if (topicMap.hasOwnProperty(topic)) {
              var callbacks = topicMap[topic];
              callbacks.remove(callback);

              // callbacks.has() will return false
              // if there are no more handlers
              // registered in this callbacks collection.
              if (!callbacks.has()) {
                
                // Send the unsubscribe message first
                var message = { type: 'unsubscribe', topic: topic };
                this.send(message);

                // Then remove the callbacks object for this topic
                delete topicMap[topic];
                
              }
            }
          },

          disconnect: function() {
            if (!socket) {
              return;
            }
            closeRequested = true;
            socket.close();
          },

          connect: function(url) {
            if (!url) {
              if (webSocketURL) {
                url = webSocketURL;
              }
              else {
                throw new TypeError('No WebSocket connection URL specified in connect method');
              }
            }

            if (socket && socket.readyState === $window.WebSocket.OPEN) {
              $log.info('webSocket.connect called, but webSocket connection already established.');
              return;
            }

            socket = new $window.WebSocket(url);
            // deferred = $q.defer();
            socket.onopen = onopen;
            socket.onclose = onclose;
            socket.onerror = onerror;
            socket.onmessage = onmessage;

            // resubscribe to topics
            // send the subscribe message
            for (var topic in topicMap) {
              if (topicMap.hasOwnProperty(topic)) {
                var message = { type: 'subscribe', topic: topic };
                this.send(message);
              }
            }
          }
        };

        if (!explicitConnect) {
          webSocketService.connect();
        }

        return webSocketService;
      },

      setVisibilityTimeout: function (timeout) {
        visibilityTimeout = timeout;
      },

      setWebSocketURL: function (wsURL) {
        webSocketURL = wsURL;
      },

      setExplicitConnection: function(flag) {
        explicitConnect = flag;
      },

      setMaxConnectionAttempts: function(max) {
        maxConnectionAttempts = max;
      },

      setConnectionAttemptInterval: function(interval) {
        maxConnectionAttempts = interval;
      }
    };
  });

/**
 * Copied from https://github.com/lithiumtech/angular_and_d3
 */

/* jshint ignore:start */

function Gauge(element, configuration)
{
  this.element = element;

  var self = this; // for internal d3 functions

  this.configure = function(configuration)
  {
    this.config = configuration;

    this.config.size = this.config.size * 0.9;

    this.config.raduis = this.config.size * 0.97 / 2;
    this.config.cx = this.config.size / 2;
    this.config.cy = this.config.size / 2;

    this.config.min = undefined != configuration.min ? configuration.min : 0;
    this.config.max = undefined != configuration.max ? configuration.max : 100;
    this.config.range = this.config.max - this.config.min;

    this.config.majorTicks = configuration.majorTicks || 5;
    this.config.minorTicks = configuration.minorTicks || 2;

    this.config.greenColor 	= configuration.greenColor || "#109618";
    this.config.yellowColor = configuration.yellowColor || "#FF9900";
    this.config.redColor 	= configuration.redColor || "#DC3912";

    this.config.transitionDuration = configuration.transitionDuration || 500;
  }

  this.render = function()
  {
    this.body = d3.select( this.element )
      .append("svg:svg")
      .attr("class", "gauge")
      .attr("width", this.config.size)
      .attr("height", this.config.size);

    this.body.append("svg:circle")
      .attr("cx", this.config.cx)
      .attr("cy", this.config.cy)
      .attr("r", this.config.raduis)
      .style("fill", "#ccc")
      .style("stroke", "#000")
      .style("stroke-width", "0.5px");

    this.body.append("svg:circle")
      .attr("cx", this.config.cx)
      .attr("cy", this.config.cy)
      .attr("r", 0.9 * this.config.raduis)
      .style("fill", "#fff")
      .style("stroke", "#e0e0e0")
      .style("stroke-width", "2px");

    for (var index in this.config.greenZones)
    {
      this.drawBand(this.config.greenZones[index].from, this.config.greenZones[index].to, self.config.greenColor);
    }

    for (var index in this.config.yellowZones)
    {
      this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, self.config.yellowColor);
    }

    for (var index in this.config.redZones)
    {
      this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, self.config.redColor);
    }

    if (undefined != this.config.label)
    {
      var fontSize = Math.round(this.config.size / 9);
      this.body.append("svg:text")
        .attr("x", this.config.cx)
        .attr("y", this.config.cy / 2 + fontSize / 2)
        .attr("dy", fontSize / 2)
        .attr("text-anchor", "middle")
        .text(this.config.label)
        .style("font-size", fontSize + "px")
        .style("fill", "#333")
        .style("stroke-width", "0px");
    }

    var fontSize = Math.round(this.config.size / 16);
    var majorDelta = this.config.range / (this.config.majorTicks - 1);
    for (var major = this.config.min; major <= this.config.max; major += majorDelta)
    {
      var minorDelta = majorDelta / this.config.minorTicks;
      for (var minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.max); minor += minorDelta)
      {
        var point1 = this.valueToPoint(minor, 0.75);
        var point2 = this.valueToPoint(minor, 0.85);

        this.body.append("svg:line")
          .attr("x1", point1.x)
          .attr("y1", point1.y)
          .attr("x2", point2.x)
          .attr("y2", point2.y)
          .style("stroke", "#666")
          .style("stroke-width", "1px");
      }

      var point1 = this.valueToPoint(major, 0.7);
      var point2 = this.valueToPoint(major, 0.85);

      this.body.append("svg:line")
        .attr("x1", point1.x)
        .attr("y1", point1.y)
        .attr("x2", point2.x)
        .attr("y2", point2.y)
        .style("stroke", "#333")
        .style("stroke-width", "2px");

      if (major == this.config.min || major == this.config.max)
      {
        var point = this.valueToPoint(major, 0.63);

        this.body.append("svg:text")
          .attr("x", point.x)
          .attr("y", point.y)
          .attr("dy", fontSize / 3)
          .attr("text-anchor", major == this.config.min ? "start" : "end")
          .text(major)
          .style("font-size", fontSize + "px")
          .style("fill", "#333")
          .style("stroke-width", "0px");
      }
    }

    var pointerContainer = this.body.append("svg:g").attr("class", "pointerContainer");

    var midValue = (this.config.min + this.config.max) / 2;

    var pointerPath = this.buildPointerPath(midValue);

    var pointerLine = d3.svg.line()
      .x(function(d) { return d.x })
      .y(function(d) { return d.y })
      .interpolate("basis");

    pointerContainer.selectAll("path")
      .data([pointerPath])
      .enter()
      .append("svg:path")
      .attr("d", pointerLine)
      .style("fill", "#dc3912")
      .style("stroke", "#c63310")
      .style("fill-opacity", 0.7)

    pointerContainer.append("svg:circle")
      .attr("cx", this.config.cx)
      .attr("cy", this.config.cy)
      .attr("r", 0.12 * this.config.raduis)
      .style("fill", "#4684EE")
      .style("stroke", "#666")
      .style("opacity", 1);

    var fontSize = Math.round(this.config.size / 10);
    pointerContainer.selectAll("text")
      .data([midValue])
      .enter()
      .append("svg:text")
      .attr("x", this.config.cx)
      .attr("y", this.config.size - this.config.cy / 4 - fontSize)
      .attr("dy", fontSize / 2)
      .attr("text-anchor", "middle")
      .style("font-size", fontSize + "px")
      .style("fill", "#000")
      .style("stroke-width", "0px");

    this.redraw(this.config.min, 0);
  }

  this.buildPointerPath = function(value)
  {
    var delta = this.config.range / 13;

    var head = valueToPoint(value, 0.85);
    var head1 = valueToPoint(value - delta, 0.12);
    var head2 = valueToPoint(value + delta, 0.12);

    var tailValue = value - (this.config.range * (1/(270/360)) / 2);
    var tail = valueToPoint(tailValue, 0.28);
    var tail1 = valueToPoint(tailValue - delta, 0.12);
    var tail2 = valueToPoint(tailValue + delta, 0.12);

    return [head, head1, tail2, tail, tail1, head2, head];

    function valueToPoint(value, factor)
    {
      var point = self.valueToPoint(value, factor);
      point.x -= self.config.cx;
      point.y -= self.config.cy;
      return point;
    }
  }

  this.drawBand = function(start, end, color)
  {
    if (0 >= end - start) return;

    this.body.append("svg:path")
      .style("fill", color)
      .attr("d", d3.svg.arc()
        .startAngle(this.valueToRadians(start))
        .endAngle(this.valueToRadians(end))
        .innerRadius(0.65 * this.config.raduis)
        .outerRadius(0.85 * this.config.raduis))
      .attr("transform", function() { return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate(270)" });
  }

  this.redraw = function(value, transitionDuration)
  {
    var pointerContainer = this.body.select(".pointerContainer");

    pointerContainer.selectAll("text").text(Math.round(value));

    var pointer = pointerContainer.selectAll("path");
    pointer.transition()
      .duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration)
      //.delay(0)
      //.ease("linear")
      //.attr("transform", function(d)
      .attrTween("transform", function()
      {
        var pointerValue = value;
        if (value > self.config.max) pointerValue = self.config.max + 0.02*self.config.range;
        else if (value < self.config.min) pointerValue = self.config.min - 0.02*self.config.range;
        var targetRotation = (self.valueToDegrees(pointerValue) - 90);
        var currentRotation = self._currentRotation || targetRotation;
        self._currentRotation = targetRotation;

        return function(step)
        {
          var rotation = currentRotation + (targetRotation-currentRotation)*step;
          return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate(" + rotation + ")";
        }
      });
  }

  this.valueToDegrees = function(value)
  {
    // thanks @closealert
    //return value / this.config.range * 270 - 45;
    return value / this.config.range * 270 - (this.config.min / this.config.range * 270 + 45);
  }

  this.valueToRadians = function(value)
  {
    return this.valueToDegrees(value) * Math.PI / 180;
  }

  this.valueToPoint = function(value, factor)
  {
    return { 	x: this.config.cx - this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
      y: this.config.cy - this.config.raduis * factor * Math.sin(this.valueToRadians(value)) 		};
  }

  // initialization
  this.configure(configuration);
}

/* jshint ignore:end */
/*!
 * visibly - v0.6 Aug 2011 - Page Visibility API Polyfill
 * http://github.com/addyosmani
 * Copyright (c) 2011 Addy Osmani
 * Dual licensed under the MIT and GPL licenses.
 *
 * Methods supported:
 * visibly.onVisible(callback)
 * visibly.onHidden(callback)
 * visibly.hidden()
 * visibly.visibilityState()
 * visibly.visibilitychange(callback(state));
 */

;(function () {

    window.visibly = {
        q: document,
        p: undefined,
        prefixes: ['webkit', 'ms','o','moz','khtml'],
        props: ['VisibilityState', 'visibilitychange', 'Hidden'],
        m: ['focus', 'blur'],
        visibleCallbacks: [],
        hiddenCallbacks: [],
        genericCallbacks:[],
        _callbacks: [],
        cachedPrefix:"",
        fn:null,

        onVisible: function (_callback) {
            if(typeof _callback == 'function' ){
                this.visibleCallbacks.push(_callback);
            }
        },
        onHidden: function (_callback) {
            if(typeof _callback == 'function' ){
                this.hiddenCallbacks.push(_callback);
            }
        },
        getPrefix:function(){
            if(!this.cachedPrefix){
                for(var l=0;b=this.prefixes[l++];){
                    if(b + this.props[2] in this.q){
                        this.cachedPrefix =  b;
                        return this.cachedPrefix;
                    }
                }    
             }
        },

        visibilityState:function(){
            return  this._getProp(0);
        },
        hidden:function(){
            return this._getProp(2);
        },
        visibilitychange:function(fn){
            if(typeof fn == 'function' ){
                this.genericCallbacks.push(fn);
            }

            var n =  this.genericCallbacks.length;
            if(n){
                if(this.cachedPrefix){
                     while(n--){
                        this.genericCallbacks[n].call(this, this.visibilityState());
                    }
                }else{
                    while(n--){
                        this.genericCallbacks[n].call(this, arguments[0]);
                    }
                }
            }

        },
        isSupported: function (index) {
            return ((this.cachedPrefix + this.props[2]) in this.q);
        },
        _getProp:function(index){
            return this.q[this.cachedPrefix + this.props[index]]; 
        },
        _execute: function (index) {
            if (index) {
                this._callbacks = (index == 1) ? this.visibleCallbacks : this.hiddenCallbacks;
                var n =  this._callbacks.length;
                while(n--){
                    this._callbacks[n]();
                }
            }
        },
        _visible: function () {
            window.visibly._execute(1);
            window.visibly.visibilitychange.call(window.visibly, 'visible');
        },
        _hidden: function () {
            window.visibly._execute(2);
            window.visibly.visibilitychange.call(window.visibly, 'hidden');
        },
        _nativeSwitch: function () {
            this[this._getProp(2) ? '_hidden' : '_visible']();
        },
        _listen: function () {
            try { /*if no native page visibility support found..*/
                if (!(this.isSupported())) {
                    if (this.q.addEventListener) { /*for browsers without focusin/out support eg. firefox, opera use focus/blur*/
                        window.addEventListener(this.m[0], this._visible, 1);
                        window.addEventListener(this.m[1], this._hidden, 1);
                    } else { /*IE <10s most reliable focus events are onfocusin/onfocusout*/
                        if (this.q.attachEvent) {
                            this.q.attachEvent('onfocusin', this._visible);
                            this.q.attachEvent('onfocusout', this._hidden);
                        }
                    }
                } else { /*switch support based on prefix detected earlier*/
                    this.q.addEventListener(this.cachedPrefix + this.props[1], function () {
                        window.visibly._nativeSwitch.apply(window.visibly, arguments);
                    }, 1);
                }
            } catch (e) {}
        },
        init: function () {
            this.getPrefix();
            this._listen();
        }
    };

    this.visibly.init();
})();

/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtCdsQuestionnaire', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/CDSQuestionnaire/CDSQuestionnaire.html',
      scope: {
        data: '=',
      },
      controller: function ($scope) {
        $scope.GotoQuestions =  function () {
          $scope.filteredQuestions = [];
          $('#cdsConditionDiv input:radio:checked').each(function(){
            var conditionId = $(this).attr('id').replace('Condition_','');
            var conditionName = $(this).attr('name');

            var filteredQs= jQuery.grep($scope.data.questions, function( n, i ) {
                                  return n.Condition_ID == conditionId ;
                            });
            var arrayItem = {ConditionName: conditionName, Questions: filteredQs};
            $scope.filteredQuestions.push(arrayItem);
          });
          $('#cdsConditionDiv').toggleClass('hidden');
          $('#cdsQuestionDiv').toggleClass('hidden');
        }

        $scope.GotoTreatments  =  function () {
          $scope.filteredTreatments = [];
          $('#cdsQuestionDiv .cdsUIList button').each(function(){
             var questionId = $(this).attr('id').replace('question_','');
             var conditionName = $(this).attr('name');
             var filterTrtmnts = [];

             if($(this).find('span:first').text() == 'Yes')
             { 
               filterTrtmnts = jQuery.grep($scope.data.treatments, function( n, i ) {
                                      return  n.Question_ID == questionId && n.Response_ID == 2;
                                   });
             }
             else if($(this).find('span:first').text() == 'No')
             { 
               filterTrtmnts = jQuery.grep($scope.data.treatments, function( n, i ) {
                                      return n.Question_ID == questionId && n.Response_ID == 3;
                                });
             }
             var arrayItem = {ConditionName: conditionName, Treatments: filterTrtmnts};

             if(filterTrtmnts.length > 0){
                var ExistingNode = $.grep($scope.filteredTreatments,function(n,i){
                  if(n.ConditionName == arrayItem.ConditionName)
                  {
                    return true;
                  }
                  return false;
                });

                if(ExistingNode.length > 0)
                {
                  ExistingNode[0].Treatments.push(filterTrtmnts[0]);
                }
                else
                {
                $scope.filteredTreatments.push(arrayItem);
                }
             }
          })
          $('#cdsQuestionDiv').toggleClass('hidden');
          $('#cdsTreatmentDiv').toggleClass('hidden');
        }

         $scope.BacktoConditions  =  function () {
          $('#cdsQuestionDiv').toggleClass('hidden');
          $('#cdsConditionDiv').toggleClass('hidden');
        }

        $scope.BacktoQuestions =  function () {
          $('#cdsTreatmentDiv').toggleClass('hidden');
          $('#cdsQuestionDiv').toggleClass('hidden');
        } 

        $scope.resizeConditionList = function(){
          var containerHeight = parseInt($('#cdsQuestionnaire').parent().css('height'),10);
          $('#cdsQuestionnaire .cdsUIList').css('height',.65 * containerHeight);
        }   

        $scope.AnswerSelected = function(e){
          var selectedText = $(e.currentTarget).text();
          $(e.currentTarget).parent().parent().find('button>span:first').text(selectedText);
          return false;
        } 

        $scope.RadioBtnClicked = function(){
          if($('#cdsConditionDiv input:radio:checked').length > 0)
          {
            $scope.IsChecked = true;
          }
          else
          {
            $scope.IsChecked = false;
          }
        }

        $scope.IsChecked = false;

        $scope.ResetQuestions = function(){
          $('#cdsConditionDiv input:radio').attr('checked',false);
          $scope.IsChecked = false;          
        }

      },
     link: function postLink(scope, element, attr) {

        scope.$on("gridsterResized", function (){
            $timeout(function(){
              scope.resizeConditionList();
            },1000);
        });

        scope.$watch('data', function (data) {
          if (data) {
            scope.data = data;
            $timeout(function(){
              scope.resizeConditionList();
            },2000);
          }
         
        });

        $('#cdsTabs').click(function(e){
          var tabContentId = $(e.target).attr('href');
          if(tabContentId)
          {
            $('#cdsTabs>li').removeClass('active');
            $(e.target).parent().addClass('active');
            $('#cdsTabContent>div').removeClass('in').removeClass('active')
            $(tabContentId).addClass('in').addClass('active');
          }
          return false;
        });

        $("#dropdownMenu2").on("click", "li a", function() {
            var platform = $(this).text();
            $("#dropdown_title2").html(platform);
            $('#printPlatform').html(platform);
        });  
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtAppointment', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/appointment/appointment.html',
      scope: {
        data: '=',
      },
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging',false)
            .withOption('order', [1, 'desc']);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2)
        ];
        /*$resource('data.json').query().$promise.then(function(persons) {
            vm.persons = persons;
        });*/
      },
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data) {
            scope.data = data;
          }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtBarChart', function ($filter) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/barChart/barChart.html',
      scope: {
        data: '=data'
      },
      controller: function ($scope) {
        var filter = $filter('date');

        $scope.xAxisTickFormatFunction = function () {
          return function(d) {
            return filter(d, 'HH:mm');
          };
        };

        $scope.xFunction = function(){
          return function(d) {
            return d.timestamp;
          };
        };
        $scope.yFunction = function(){
          return function(d) {
            return d.value;
          };
        };
      },
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data && data[0] && data[0].values && (data[0].values.length > 1)) {
            var timeseries = _.sortBy(data[0].values, function (item) {
              return item.timestamp;
            });

            var start = timeseries[0].timestamp;
            var end = timeseries[timeseries.length - 1].timestamp;
            scope.start = start;
            scope.end = end;
          }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtClinicalDecisionSupport', function ($sce) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/clinicalDecisionSupport/clinicalDecisionSupport.html',
      scope: {
        data: '=',
      },
      controller: function ($scope) {
        
      },
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data && data.length != 0) {
            var cds = data;
            var deliminiter = "@@";
            for(var cpgIndex in cds){
              var featuresList = [];
              var featuresInitial = "";
              var featuresHtml = "";
              var fullHMTL = "";
              if (cds[cpgIndex].Features.indexOf(deliminiter) != -1){
                featuresInitial = cds[cpgIndex].Features.split(":")[0].trim() + ":";
                featuresList = cds[cpgIndex].Features.split(":")[1].trim().split(deliminiter);
                for(var feature in featuresList){
                  featuresHtml += (featuresList[feature] != "") ? "<li>" + featuresList[feature] + "</li>" : "";
                } 
                fullHMTL = featuresInitial + "<div style='overflow:auto; height:80px; widgth:auto'><ul>" + featuresHtml + "</ul></div>"; 
                cds[cpgIndex].Features = $sce.trustAsHtml(fullHMTL);
              }
            }
            scope.cpgList = cds;            
          }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtCommunityresource', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/communityResource/communityresource.html',
      scope: {
        data: '=',
      },
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging',false)
            .withOption('order', [1, 'desc']);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3)
        ];
        /*$resource('data.json').query().$promise.then(function(persons) {
            vm.persons = persons;
        });*/
      },
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data) {
            scope.data = data;
          }
        });
      }
    };
  });

/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtContact', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/contact/contact.html',
      scope: {
        data: '=data'
      }     
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'; 

angular.module('ui.widgets')
  .directive('wtDiagnoses', function ($timeout) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/diagnoses/diagnoses.html',
      scope: {
        data: '=',
      },
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging',false)
            .withOption('bDestroy',true)
            .withOption('order', [1, 'desc']);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2)
        ];
        /*$resource('data.json').query().$promise.then(function(persons) {
            vm.persons = persons;
        });*/
      },
	link: function postLink(scope, element) {
        scope.$on("bindEvents", function (){
          $($('#diagnosisDiv table')[0]).find('th').each(function(){
            $(this).attr('tabindex','-1');
          });
         
          $timeout(function(){
            $('#diagnosisDiv .dataTables_scrollHeadInner,#diagnosisDiv table').css({'width':''});  
            var containerHeight = parseInt($('#diagnosisDiv').parent().css('height'),10);
            $('#diagnosisDiv .dataTables_scrollBody').css('height',.78 * containerHeight);  
          },2500);
        });

        $timeout(function(){
            scope.$emit('bindEvents');
            
        },1500);

       
        

        scope.$watch('data', function (data) {
          $.fn.dataTable.ext.errMode = 'throw';
          if (data) {
             scope.data = data;  
        }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtEmergencyContact', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/emergencyContact/emergencyContact.html',
      scope: {
        data: '=data'
      }     
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



'use strict';

angular.module('ui.widgets')
  .directive('wtEnterData', function ($timeout) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/enterdata/enterdata.html',
      controller: function ($scope) {

        $scope.noDataFound = '--No Data Available--'

        $scope.jumpTo = function(keyPress,section){
          if (keyPress.which === 13)
          {
            switch(section){
              case "hr":
                  $scope.hrIndex = parseInt($scope.hrIndex, 10); 
                  $scope.enterWdgtForm.highRiskTxt.$setPristine();
                  if ($scope.hrIndex > $scope.data.HighRisk_UserNotes.length-1) {
                    $scope.hrIndex = $scope.data.HighRisk_UserNotes.length-1;
                  } else if ($scope.hrIndex < 0 || isNaN($scope.hrIndex)) {
                    $scope.hrIndex = 0;
                  }
                  $scope.hrText = $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes;
                  break;
              case "hrspan":
                  $scope.hrSpanIndex = parseInt($scope.hrSpanIndex, 10);
                  if ($scope.hrSpanIndex > $scope.data.HighRisk_SPANImport.length-1) {
                    $scope.hrSpanIndex = $scope.data.HighRisk_SPANImport.length-1;
                  } else if ($scope.hrSpanIndex < 0 || isNaN($scope.hrSpanIndex)) {
                    $scope.hrSpanIndex = 0;
                  }
                  break;
              case "mh":
                  $scope.mhIndex = parseInt($scope.mhIndex, 10); 
                  $scope.enterWdgtForm.mentalProviderTxt.$setPristine();
                  if ($scope.mhIndex > $scope.data.PrimaryHealthProvider_UserNotes.length-1) {
                    $scope.mhIndex = $scope.data.PrimaryHealthProvider_UserNotes.length-1;
                  } else if ($scope.mhIndex < 0 || isNaN($scope.mhIndex)) {
                    $scope.mhIndex = 0;
                  }
                  $scope.mhText = $scope.data.PrimaryHealthProvider_UserNotes[$scope.mhIndex].UserNotes;
                  break;
              case "sp":
                  $scope.spIndex = parseInt($scope.spIndex, 10); 
                  $scope.enterWdgtForm.safetyPlanTxt.$setPristine();
                  if ($scope.spIndex > $scope.data.SafetyPlan_UserNotes.length-1) {
                    $scope.spIndex = $scope.data.SafetyPlan_UserNotes.length-1;
                  } else if ($scope.spIndex < 0 || isNaN($scope.spIndex)) {
                    $scope.spIndex = 0;
                  }
                  $scope.spText = $scope.data.SafetyPlan_UserNotes[$scope.spIndex].UserNotes;
                  break;
              case "spspan":
                  $scope.spSpanIndex = parseInt($scope.spSpanIndex, 10);
                  if ($scope.spSpanIndex > $scope.data.SafetyPlan_SPANImport.length-1) {
                    $scope.spSpanIndex = $scope.data.SafetyPlan_SPANImport.length-1;
                  } else if ($scope.spSpanIndex < 0 || isNaN($scope.spSpanIndex)) {
                    $scope.spSpanIndex = 0;
                  }
                  break;
              case "comment":
                  $scope.commentIndex = parseInt($scope.commentIndex, 10); 
                  $scope.enterWdgtForm.commentTxt.$setPristine();
                  if ($scope.commentIndex > $scope.data.GeneralComments.length-1) {
                    $scope.commentIndex = $scope.data.GeneralComments.length-1;
                  } else if ($scope.commentIndex < 0 || isNaN($scope.commentIndex)) {
                    $scope.commentIndex = 0;
                  }
                  $scope.commentText = $scope.data.GeneralComments[$scope.commentIndex].Comment;
                  break;
            }
          }
        };

        //HIGH RISK SECTION

        $scope.hrIndex = 0;
        $scope.hrSpanIndex = 0;
        $scope.hrText = '';

        $scope.goHrBack = function() {
          if ($scope.hrIndex < $scope.data.HighRisk_UserNotes.length-1) {
            $scope.enterWdgtForm.highRiskTxt.$setPristine();
            $scope.hrIndex+=1;
            $scope.hrText = $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes;
          }
        };
        $scope.goHrForward = function() {
          if ($scope.hrIndex !== 0) {
            $scope.enterWdgtForm.highRiskTxt.$setPristine();
            $scope.hrIndex-=1;
            $scope.hrText = $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes;           
          }
        };

        $scope.goHrSpanBack = function() {
          if ($scope.hrSpanIndex < $scope.data.HighRisk_SPANImport.length-1) {
            $scope.hrSpanIndex+=1;
          }
        };

        $scope.goHrSpanForward = function() {
          if ($scope.hrSpanIndex !== 0) {
            $scope.hrSpanIndex-=1;
          }
        };

        //MENTAL HEALTH PROVIDER SECTION

        $scope.mhIndex = 0;
        $scope.mhText = '';

        $scope.mhIndexChange = function(value) {
          //TODO
        }

        $scope.goMhBack = function() {
          if ($scope.mhIndex < $scope.data.PrimaryHealthProvider_UserNotes.length-1) {
            $scope.enterWdgtForm.mentalProviderTxt.$setPristine();
            $scope.mhIndex+=1;
            $scope.mhText = $scope.data.PrimaryHealthProvider_UserNotes[$scope.mhIndex].UserNotes;
          }
        };
        $scope.goMhForward = function() {
          if ($scope.mhIndex !== 0) {
            $scope.enterWdgtForm.mentalProviderTxt.$setPristine();
            $scope.mhIndex-=1;
            $scope.mhText = $scope.data.PrimaryHealthProvider_UserNotes[$scope.mhIndex].UserNotes;           
          }
        };

        //SYSTEM PLAN SECTION
        $scope.spIndex = 0;
        $scope.spSpanIndex = 0;
        $scope.spText = '';

        $scope.spIndexChange = function(value) {

        }

        $scope.goSpBack = function() {
          if ($scope.spIndex < $scope.data.SafetyPlan_UserNotes.length-1) {
            $scope.enterWdgtForm.safetyPlanTxt.$setPristine();
            $scope.spIndex+=1;
            $scope.spText = $scope.data.SafetyPlan_UserNotes[$scope.spIndex].UserNotes;
          }
        };

        $scope.goSpForward = function() {
          if ($scope.spIndex !== 0) {
            $scope.enterWdgtForm.safetyPlanTxt.$setPristine();
            $scope.spIndex-=1;
            $scope.spText = $scope.data.SafetyPlan_UserNotes[$scope.spIndex].UserNotes;           
          }
        };

         $scope.goSpSpanBack = function() {
          if ($scope.spSpanIndex < $scope.data.SafetyPlan_SPANImport.length-1) {
            $scope.spSpanIndex+=1;
          }
        };

        $scope.goSpSpanForward = function() {
          if ($scope.spSpanIndex !== 0) {
            $scope.spSpanIndex-=1;
          }
        };

        //GENERAL COMMENTS SECTION

        $scope.commentIndex = 0;
        $scope.commentText = '';

        $scope.goCommentBack = function() {
          if ($scope.commentIndex < $scope.data.GeneralComments.length-1) {
            $scope.enterWdgtForm.commentTxt.$setPristine();
            $scope.commentIndex+=1;
            $scope.commentText = $scope.data.GeneralComments[$scope.commentIndex].Comment;
          }
        };

        $scope.goCommentForward = function() {
          if ($scope.commentIndex !== 0) {
            $scope.enterWdgtForm.commentTxt.$setPristine();
            $scope.commentIndex-=1;
            $scope.commentText = $scope.data.GeneralComments[$scope.spIndex].Comment;           
          }
        };

        $scope.clearEdits = function(){
          $scope.SetWidgetData();
          $scope.common.data.EnterDataIsUnsaved = false;
        };

        $scope.SetWidgetData = function(data){
          if(data)
          {
            $scope.data = data;
          }

          $scope.enterWdgtForm.highRiskTxt.$setPristine();
          $scope.enterWdgtForm.mentalProviderTxt.$setPristine();
          $scope.enterWdgtForm.safetyPlanTxt.$setPristine();
          $scope.enterWdgtForm.commentTxt.$setPristine();

          $scope.hrIndex = 0;
          $scope.hrSpanIndex = 0;
          $scope.mhIndex = 0;
          $scope.spIndex = 0;
          $scope.spSpanIndex = 0;
          $scope.commentIndex = 0;

          $scope.hrText = $scope.noDataFound;
          $scope.mhText = $scope.noDataFound;
          $scope.spText = $scope.noDataFound;
          $scope.commentText = $scope.noDataFound;

          //Initialize control values
          if($scope.data.HighRisk_UserNotes && $scope.data.HighRisk_UserNotes.length > 0)
          {
            $scope.hrText = $scope.data.HighRisk_UserNotes[0].UserNotes;
          }
          
          if($scope.data.PrimaryHealthProvider_UserNotes && $scope.data.PrimaryHealthProvider_UserNotes.length > 0)
          {
            $scope.mhText = $scope.data.PrimaryHealthProvider_UserNotes[0].UserNotes;
          }

          if($scope.data.SafetyPlan_UserNotes && $scope.data.SafetyPlan_UserNotes.length > 0)
          {
            $scope.spText = $scope.data.SafetyPlan_UserNotes[0].UserNotes;
          }

          if($scope.data.GeneralComments && $scope.data.GeneralComments.length > 0)
          {
            $scope.commentText = $scope.data.GeneralComments[0].Comment;
          }

          if($scope.data.OutreachStatus && $scope.data.OutreachStatus.length > 0 )
          {
            $scope.IdentifiedPrimaryProvider = $scope.data.OutreachStatus[0].IdentifiedPrimaryProvider;
            $scope.NotifiedProvider = $scope.data.OutreachStatus[0].NotifiedProvider;
            $scope.AskedProviderReview = $scope.data.OutreachStatus[0].AskedProviderReview;
            $scope.ReceivedNotification = $scope.data.OutreachStatus[0].ReceivedNotification;
            $scope.ReviewedCurrentDiagnosis = $scope.data.OutreachStatus[0].ReviewedCurrentDiagnosis;
            $scope.EstablishedContact = $scope.data.OutreachStatus[0].EstablishedContact;
            $scope.UpdatedPlan = $scope.data.OutreachStatus[0].UpdatedPlan;
            $scope.EvaluateCaring = $scope.data.OutreachStatus[0].EvaluateCaring;
            $scope.EvaluateSafetyPlan = $scope.data.OutreachStatus[0].EvaluateSafetyPlan;
            $scope.Deceased = $scope.data.OutreachStatus[0].Deceased;
            $scope.CannotContact = $scope.data.OutreachStatus[0].CannotContact;
            $scope.RefusedServices = $scope.data.OutreachStatus[0].RefusedServices;
            $scope.CareFromCommunity = $scope.data.OutreachStatus[0].CareFromCommunity;
            $scope.ClinicallyNotAtRisk = $scope.data.OutreachStatus[0].ClinicallyNotAtRisk;
            $scope.Other = $scope.data.OutreachStatus[0].Other;
            
            $scope.outreachStatus = $scope.data.OutreachStatus[0];
          }
          
        };

        // ADD DATA SECTION
       
        $scope.addNewData = function() {
          $scope.common.data.EnterDataIsUnsaved = false;
          var UpdatedHR_UserNotes = {isNew: false};
          var UpdatedMH_UserNotes = {isNew:  false};
          var UpdatedSP_UserNotes = {isNew: false};
          var UpdatedGC_UserNotes = {isNew: false};
          var addDate = new Date().toLocaleDateString();

          if ($scope.enterWdgtForm.highRiskTxt.$valid &&(($scope.data.HighRisk_UserNotes.length == 0 && $scope.hrText != $scope.noDataFound) || 
               ($scope.data.HighRisk_UserNotes.length > 0 && $scope.hrText != $scope.data.HighRisk_UserNotes[$scope.hrIndex].UserNotes)))
          {
             UpdatedHR_UserNotes = {
                entry: $scope.hrText,
                date: addDate,
                isNew: true
              }
          }

          if ($scope.enterWdgtForm.mentalProviderTxt.$valid && (($scope.data.PrimaryHealthProvider_UserNotes.length == 0 && $scope.mhText != $scope.noDataFound) || 
               ($scope.data.PrimaryHealthProvider_UserNotes.length > 0 && $scope.mhText != $scope.data.PrimaryHealthProvider_UserNotes[$scope.mhIndex].UserNotes)))
          {
             UpdatedMH_UserNotes = {
                entry: $scope.mhText,
                date: addDate,
                isNew: true
              }
          }

          if ($scope.enterWdgtForm.safetyPlanTxt.$valid && (($scope.data.SafetyPlan_UserNotes.length == 0 && $scope.spText != $scope.noDataFound) || 
               ($scope.data.SafetyPlan_UserNotes.length > 0 && $scope.spText != $scope.data.SafetyPlan_UserNotes[$scope.spIndex].UserNotes)))
          {
             UpdatedSP_UserNotes = {
                entry: $scope.spText,
                date: addDate,
                isNew: true
              }
          }

          if ($scope.enterWdgtForm.commentTxt.$valid && (($scope.data.GeneralComments.length == 0 && $scope.commentText != $scope.noDataFound) || 
               ($scope.data.GeneralComments.length > 0 && $scope.commentText != $scope.data.GeneralComments[$scope.commentIndex].Comment)))
          {
             UpdatedGC_UserNotes = {
                entry: $scope.commentText,
                date: addDate,
                isNew: true
              }
          }

            Updated_OutreachStatus = {};
            if($scope.IdentifiedPrimaryProvider != $scope.data.OutreachStatus[0].IdentifiedPrimaryProvider)
            {
              Updated_OutreachStatus.IdentifiedPrimaryProvider = $scope.IdentifiedPrimaryProvider;
            }

            if($scope.NotifiedProvider != $scope.data.OutreachStatus[0].NotifiedProvider)
            {
              Updated_OutreachStatus.NotifiedProvider = $scope.NotifiedProvider;
            }

            if($scope.AskedProviderReview != $scope.data.OutreachStatus[0].AskedProviderReview)
            {
              Updated_OutreachStatus.AskedProviderReview = $scope.AskedProviderReview;
            }

            if($scope.ReceivedNotification != $scope.data.OutreachStatus[0].ReceivedNotification)
            {
              Updated_OutreachStatus.ReceivedNotification = $scope.ReceivedNotification;
            }

            if($scope.ReviewedCurrentDiagnosis != $scope.data.OutreachStatus[0].ReviewedCurrentDiagnosis)
            {
              Updated_OutreachStatus.ReviewedCurrentDiagnosis = $scope.ReviewedCurrentDiagnosis;
            }
            
            if($scope.EstablishedContact != $scope.data.OutreachStatus[0].EstablishedContact)
            {
              Updated_OutreachStatus.EstablishedContact = $scope.EstablishedContact;
            }
            
            if($scope.UpdatedPlan != $scope.data.OutreachStatus[0].UpdatedPlan)
            {
              Updated_OutreachStatus.UpdatedPlan = $scope.UpdatedPlan;
            }
            
            if($scope.EvaluateCaring != $scope.data.OutreachStatus[0].EvaluateCaring)
            {
              Updated_OutreachStatus.EvaluateCaring = $scope.EvaluateCaring;
            }

            if($scope.EvaluateSafetyPlan != $scope.data.OutreachStatus[0].EvaluateSafetyPlan)
            {
              Updated_OutreachStatus.EvaluateSafetyPlan = $scope.EvaluateSafetyPlan;
            }
            
            if($scope.Deceased != $scope.data.OutreachStatus[0].Deceased)
            {
              Updated_OutreachStatus.Deceased = $scope.Deceased;
            }
            
            if($scope.CannotContact != $scope.data.OutreachStatus[0].CannotContact)
            {
              Updated_OutreachStatus.CannotContact = $scope.CannotContact;
            }

            if($scope.RefusedServices != $scope.data.OutreachStatus[0].RefusedServices)
            {
              Updated_OutreachStatus.RefusedServices = $scope.RefusedServices;
            }

            if($scope.CareFromCommunity != $scope.data.OutreachStatus[0].CareFromCommunity)
            {
              Updated_OutreachStatus.CareFromCommunity = $scope.CareFromCommunity;
            }

            if($scope.ClinicallyNotAtRisk != $scope.data.OutreachStatus[0].ClinicallyNotAtRisk)
            {
              Updated_OutreachStatus.ClinicallyNotAtRisk = $scope.ClinicallyNotAtRisk;
            }

            if($scope.Other != $scope.data.OutreachStatus[0].Other)
            {
              Updated_OutreachStatus.Other = $scope.Other;
            }

          $scope.widget.dataModel.saveNewUserData({
                                                    hrUserNotes: UpdatedHR_UserNotes,
                                                    mhUserNotes: UpdatedMH_UserNotes,
                                                    spUserNotes: UpdatedSP_UserNotes,
                                                    gcUserNotes: UpdatedGC_UserNotes,
                                                    outreachStatus: Updated_OutreachStatus
                                                  });
          };

          $scope.enterDataChanged = function(){
            $scope.common.data.EnterDataIsUnsaved = true
          };

          $scope.resizeWidgetDataArea = function(){
            var containerHeight = parseInt($('#enterWdgtDataForm').parent().css('height'),10);
            $('.enterWdgtDataDiv').css('height',.80 * containerHeight);
          } 

      },
      link: function postLink(scope, element, attr) {
        scope.$on("gridsterResized", function (){
            $timeout(function(){
              scope.resizeWidgetDataArea();
            },1000);
        });
        scope.$watch('widgetData', function(data){
          scope.SetWidgetData(data);
          $timeout(function(){
              scope.resizeWidgetDataArea();
            },2000);
        });
      }
    }
  });

/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtFacilityRoster', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/facilityRoster/facilityRoster.html',
     
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.facilityList = $scope.widgetData;
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return new Promise( function(resolve, reject){
            if ($scope.widgetData)
              resolve($scope.widgetData);
            else
              resolve([]);
          });
        })
        .withOption('paging',false)
        .withOption('bDestroy',true)
        .withOption('order', [1, 'desc']);
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('STA3N').withTitle('VAMC'),
            DTColumnBuilder.newColumn('VAMC_Name').withTitle('VAMC Name'),
            DTColumnBuilder.newColumn('StateAbbr').withTitle('State'),
            DTColumnBuilder.newColumn('VISN').withTitle('VISN'),
            DTColumnBuilder.newColumn('Total').withTitle('Patients'),
            DTColumnBuilder.newColumn('AtRisk').withTitle('At-Risk Persons'),
            DTColumnBuilder.newColumn('Prediction').withTitle('Prediction Alert'),
          ];
      },
      link: function postLink(scope, element, attr) {
        scope.$on("bindEvents", function (){

          scope.dtInstance.changeData(function() {
                return new Promise( function(resolve, reject){
                  if (scope.facilityList)
                  {
                    resolve(scope.facilityList);
                  }
                  else
                  {
                    resolve([]);
                  }
                });
              });

          $($('#facilityRosterDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+',Down/Up arrows to navigate, Spacebar to select and Tab to Exit rows">'+$(this).text()+'</a>');
            $(this).attr('scope','col');
            $(this).attr('tabindex','-1');
          }); 

          $($('#facilityRosterDiv table')[0]).find('th').keydown(function(event){ 
          if (event.keyCode == 40 || event.key == 'Down' || event.keyCode == 38 || event.key == 'Up') {
            var isRowAtFocus = $('#tblFacilityRoster').find('tr.rowAtFocus');
            if(isRowAtFocus.length > 0)
            {
              isRowAtFocus.removeClass('rowAtFocus');
              isRowAtFocus.css('backgroundColor','');
              if(event.keyCode == 40)
              {
                if(isRowAtFocus.next())
                {
                  isRowAtFocus.next().addClass('rowAtFocus');
                  isRowAtFocus.next().css('backgroundColor','#f5f5f5');  
                }  
              }
              else
              {
                if(isRowAtFocus.prev())
                {
                  isRowAtFocus.prev().addClass('rowAtFocus');
                  isRowAtFocus.prev().css('backgroundColor','#f5f5f5');  
                }
              }
            }
            else
            {
              $($('#tblFacilityRoster>tbody>tr')[0]).addClass('rowAtFocus');
              $($('#tblFacilityRoster>tbody>tr')[0]).css('backgroundColor','#f5f5f5');
            }
            return false;
          }

          if (event.keyCode == '32' || event.key == 'Spacebar') {
            $('#tblFacilityRoster').find('tr.rowAtFocus').css('backgroundColor','');
            $('#tblFacilityRoster').find('tr.rowAtFocus').click();
            return false;
          }

        });
		
          $('#tblFacilityRoster').on( 'click', 'tr', function (event) {
            if(scope.eventTimer == event.timeStamp) return;
			
            scope.eventTimer = event.timeStamp;
            var facilityId = null;
            var facilityName = null;
            var commonData = scope.widget.dataModelOptions.common;
            var activeView = commonData.data.activeView;
            //if(scope.previousSelectedRowIndex == event.currentTarget.rowIndex){
            if($(this).hasClass('selected')){
              if(activeView != "facility"){
                $(this).removeClass('selected');  
                //$('tr.selected').removeClass('selected');
                $(this).removeClass('selected').removeClass('selected');
                var activeView = commonData.data.activeView;
                facilityId = '';  
                facilityName = '';
              } 
              else
                facilityId = commonData.data.facilitySelected.facility;             
                facilityName = commonData.data.facilitySelected.facilityName;             
            }
            else{
              console.log("tableroster:",$('#tblFacilityRoster'));//.cells().nodes().removeClass('selected');
              console.log("facilityroster has class:",$('#tblFacilityRoster tbody tr').hasClass('selected'));
              console.log("facilityroster tr:",$('#tblFacilityRoster tbody tr'));
              $('#tblFacilityRoster tbody tr').filter(['.selected'].join()).removeClass('selected');
              $(this).addClass('selected');      
              // update common data object with new patient object
              console.log("eventClick:", event);
              facilityId = parseInt(event.currentTarget.cells[0].innerText);
              facilityName = event.currentTarget.cells[1].innerText;
              /*var obj = jQuery.grep(scope.patientList, function( n, i ) {
                return ( n.ReachID == vetId );
              });*/
              console.log("Facility ID Selected: ",facilityId);
              //delete obj[0].OutreachStatusSelect;              
            }
            
            if(activeView == "surveillance")
            {
              commonData.data.facilitySelected.surveillance = facilityId;
              commonData.data.facilitySelected.surveillanceName = facilityName;
            }
            else if(activeView == "facility")
            {
              if(commonData.data.facilitySelected && commonData.data.facilitySelected.facility != facilityId )
              {
                commonData.data.veteranObj = '';
              }
              commonData.data.facilitySelected.facility = facilityId;
              commonData.data.facilitySelected.facilityName = facilityName;
            }
            // broadcast message throughout system
            scope.$root.$broadcast('commonDataChanged', commonData);
          });

          $('#facilityRosterDiv .dataTables_scrollHeadInner,#facilityRosterDiv table').css({'width':''});
          var containerHeight = parseInt($('#facilityRosterDiv').parent().css('height'),10);
        });
		

        scope.$watch('widgetData', function(data){
          if(data != null && data.length >0){
              scope.data = data;
              scope.facilityList = data;
               scope.$emit('bindEvents');

              $timeout(function(){               
                $.fn.dataTable.ext.errMode = 'throw';
                var commonData = scope.widget.dataModelOptions.common;
                var activeView = commonData.data.activeView;
                var selectedRow = null; 
                if(activeView == "facility"){
                  if(commonData.data.facilitySelected.facility == null || commonData.data.facilitySelected.facility.toString().length == 0)
                  {
                    $('#tblFacilityRoster').find( "tbody>tr:first" ).click();
                  }
                  else
                  {
                    $('#tblFacilityRoster tbody tr').each(function(){
                        var textcolumn = $(this).find('td').eq(0).text();
                        if($(this).find('td').eq(0).text() == commonData.data.facilitySelected.facility){
                            selectedRow = $(this);
                            selectedRow.click();
                        }
                    }); 
                  }  
                }
                else if(activeView == "surveillance"){
                  if(commonData.data.facilitySelected.surveillance != null && commonData.data.facilitySelected.surveillance.toString().length > 0)
                  {
                    $('#tblFacilityRoster tbody tr').each(function(){
                        var textcolumn = $(this).find('td').eq(0).text();
                        if($(this).find('td').eq(0).text() == commonData.data.facilitySelected.surveillance){
                            selectedRow = $(this);
                            selectedRow.addClass('selected');
                        }
                    });                                
                  }  
                }

                if(selectedRow)
                {
                  var rowPosition = selectedRow[0].rowIndex-8;
                  if(rowPosition > 0 && $('#facilityRosterDiv').parent().scrollTop() == 0)
                  {
                    $('#facilityRosterDiv').parent().animate({  
                      scrollTop: $('#tblFacilityRoster tbody tr').eq(rowPosition).offset().top
                    },500);
                  }
                }
                
              },1500)            
            }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtFluid', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/fluid/fluid.html',
      scope: true,
      controller: function ($scope) {
        $scope.$on('widgetResized', function (event, size) {
          $scope.width = size.width || $scope.width;
          $scope.height = size.height || $scope.height;
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtGauge', function () {
    return {
      replace: true,
      scope: {
        label: '@',
        min: '=',
        max: '=',
        value: '='
      },
      link: function (scope, element, attrs) {
        var config = {
          size: 200,
          label: attrs.label,
          min: undefined !== scope.min ? scope.min : 0,
          max: undefined !== scope.max ? scope.max : 100,
          minorTicks: 5
        };

        var range = config.max - config.min;
        config.yellowZones = [
          { from: config.min + range * 0.75, to: config.min + range * 0.9 }
        ];
        config.redZones = [
          { from: config.min + range * 0.9, to: config.max }
        ];

        scope.gauge = new Gauge(element[0], config);
        scope.gauge.render();

        function update(value) {
          var percentage;
          if (_.isString(value)) {
            percentage = parseFloat(value);
          } else if (_.isNumber(value)) {
            percentage = value;
          }

          if (!_.isUndefined(percentage)) {
            scope.gauge.redraw(percentage);
          }
        }

        update(0);

        scope.$watch('value', function (value) {
          if (scope.gauge) {
            update(value);
          }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtHistoricalChart', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/historicalChart/historicalChart.html',
      scope: {
        chart: '='
      },
      controller: function ($scope) {
        $scope.mode = 'MINUTES';

        $scope.changeMode = function (mode) {
          $scope.mode = mode;
          $scope.$emit('modeChanged', mode);
        };
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtLineChart', function () {
    return {
      template: '<div class="line-chart"></div>',
      scope: {
        chart: '='
      },
      replace: true,
      link: function postLink(scope, element) {
        var lineChart = new google.visualization.LineChart(element[0]);

        function draw(chart) {
          var data = chart.data;

          var table = new google.visualization.DataTable();
          table.addColumn('datetime');
          table.addColumn('number');
          table.addRows(data.length);

          var view = new google.visualization.DataView(table);

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            table.setCell(i, 0, new Date(item.timestamp));
            var value = parseFloat(item.value);
            table.setCell(i, 1, value);
          }

          var chartOptions = {
            legend: 'none',
            vAxis: { minValue: 0, maxValue: 100 }
            //chartArea: { top: 20, left: 30, height: 240 }
          };

          if (chart.max) {
            var lastTimestamp;

            if (data.length) {
              var last = data[data.length - 1];
              lastTimestamp = last.timestamp;
            } else {
              lastTimestamp = Date.now();
            }

            var max = new Date(lastTimestamp);
            var min = new Date(lastTimestamp - (chart.max - 1) * 1000);

            angular.extend(chartOptions, {
              hAxis: { viewWindow: { min: min, max: max }}
            });
          }

          if (chart.chartOptions) {
            angular.extend(chartOptions, chart.chartOptions);
          }

          lineChart.draw(view, chartOptions);
        }

        scope.$watch('chart', function (chart) {
          if (!chart) {
            chart = {
              data: [],
              max: 30
            };
          }

          if (chart.data) {
            draw(chart);
          }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtMedication', function ($timeout) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/medication/medication.html',
      scope: {
        data: '=',
      }, 
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging',false);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0)
        ];
        /*$resource('data.json').query().$promise.then(function(persons) {
            vm.persons = persons;
        });*/
      },
	link: function postLink(scope, element) {
    		scope.$on("bindEvents", function (){
    			$($('#medicationDiv table')[0]).find('th').each(function(){
    			  $(this).attr('tabindex','-1');
    			});
    		});
        $timeout(function(){
          scope.$emit('bindEvents');      
        },1500);          

        $timeout(function(){
          $('#medicationDiv .dataTables_scrollHeadInner,#medicationDiv table').css({'width':''});
          var containerHeight = parseInt($('#medicationDiv').parent().css('height'),10);
          $('#medicationDiv .dataTables_scrollBody').css('height',.78 * containerHeight);
        },2500);

        scope.$watch('data', function (data) {
          if (data) {
            scope.data = data;
          }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtMetricsChart', function ($filter, MetricsChartHistory) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/metricsChart/metricsChart.html',
      scope: {
        data: '=?',
        metrics: '=',
        controller: '='
      },
      controller: function ($scope) {
        var filter = $filter('date');
        var yAxisFilter = $filter('number');

        $scope.xAxisTickFormatFunction = function () {
          return function (d) {
            return filter(d, 'mm:ss');
          };
        };

        $scope.yAxisTickFormatFunction = function () {
          return function (d) {
            return yAxisFilter(d);
          };
        };

        $scope.xFunction = function () {
          return function (d) {
            return d.timestamp;
          };
        };
        $scope.yFunction = function () {
          return function (d) {
            return d.value;
          };
        };

        $scope.chartCallback = function () { // callback to access nvd3 chart
          //console.log('chartCallback');
          //console.log(arguments);
          //console.log(chart.legend.dispatch.);
          //chart.legend.dispatch.on('legendClick', function(newState) {
          //  console.log(newState);
          //});
        };

        $scope.maxTimeLimit = 300;

        $scope.options = [
          {
            value: 30,
            label: 'last 30 seconds'
          },
          {
            value: 60,
            label: 'last minute'
          },
          {
            value: 120,
            label: 'last two minutes'
          },
          {
            value: $scope.maxTimeLimit,
            label: 'last 5 minutes'
          }
        ];
        $scope.timeFrame = $scope.options[0];


        var chartHistory = null;
        if ($scope.controller) {
          chartHistory = new MetricsChartHistory($scope, $scope.metrics, $scope.maxTimeLimit, $scope.timeFrame.value);
          $scope.controller.addPoint = function (point) {
            chartHistory.addPoint(point);
          };
        }

        $scope.timeFrameChanged = function (newTimeFrame) {
          if (chartHistory) {
            chartHistory.updateChart(Date.now(), newTimeFrame.value);
          }
        };
      },
      link: function postLink(scope) {
        scope.data = [];
      }
    };
  })
  .factory('MetricsChartHistory', function () {
    function MetricsChartHistory(scope, metrics, maxTimeLimit, timeLimit) {
      this.scope = scope;
      this.metrics = metrics;
      this.maxTimeLimit = maxTimeLimit;
      this.timeLimit = timeLimit;
      this.history = [];

      this.series = [];

      _.each(metrics, function (metric) {
        this.series.push({
          key: metric.key,
          disabled: !metric.visible,
          color: metric.color
        });
      }.bind(this));
    }

    angular.extend(MetricsChartHistory.prototype, {
      updateHistory: function (now, point) {
        var historyStartTime = now - this.maxTimeLimit * 1000;

        var ind = _.findIndex(this.history, function (historyPoint) {
          return historyPoint.timestamp >= historyStartTime;
        });
        if (ind > 1) {
          this.history = _.rest(this.history, ind - 1);
        }

        var historyPoint = {
          timestamp: now,
          data: point
        };
        this.history.push(historyPoint);
      },

      updateChart: function (now, timeLimit) {
        this.timeLimit = timeLimit;

        var startTime = now - 1000 * timeLimit;

        var history = _.filter(this.history, function (historyPoint) { //TODO optimize
          return historyPoint.timestamp >= startTime;
        });

        _.each(this.metrics, function (metric, index) {
          var metricKey = metric.key;

          var values = _.map(history, function (historyPoint) {
            return {
              timestamp: historyPoint.timestamp,
              value: Math.round(parseInt(historyPoint.data[metricKey], 10))
            };
          });

          this.series[index].values = values;
        }.bind(this));

        if (history.length > 1) {
          this.scope.data = _.clone(this.series);
          this.scope.start = Math.min(startTime, _.first(history).timestamp);
          this.scope.end = _.last(history).timestamp;
        }
      },

      addPoint: function (point) {
        var now = Date.now();
        this.updateHistory(now, point);

        this.updateChart(now, this.timeLimit);
      }
    });

    return MetricsChartHistory;
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalAgeGroups', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nationalAgeGroups/nationalAgeGroups.html',
     
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.ageGroupsList = $scope.widgetData;
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return new Promise( function(resolve, reject){
            if ($scope.widgetData)
              resolve($scope.widgetData);
            else
              resolve([]);
          });
        })
        .withOption('paging',false)
        .withOption('bDestroy',true)
        .withOption('order', [1, 'desc']);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('AgeRange').withTitle('Age Groups'),
            DTColumnBuilder.newColumn('RiskLevelDescription').withTitle('Risk Level Group'),
            DTColumnBuilder.newColumn('Total').withTitle('At-Risk Persons')
        ];
      },
     link: function postLink(scope, element, attr) {
	
        scope.$on("bindEvents", function (){
      		$($('#ageGroupDiv table')[0]).find('th').each(function(){
      			$(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort 			by '+ $(this).text()+'">'+$(this).text()+'</a>');
      			$(this).attr('scope','col');
      			$(this).attr('tabindex','-1');
          });
          
          $timeout(function(){
            $('#ageGroupDiv .dataTables_scrollHeadInner,#ageGroupDiv table').css({'width':''});
            var containerHeight = parseInt($('#ageGroupDiv').parent().css('height'),10);
            $('#ageGroupDiv .dataTables_scrollBody').css('height',.78 * containerHeight);
          },2500);
    		});
        scope.$watch('widgetData', function (data) {
          $timeout(function(){
            $.fn.dataTable.ext.errMode = 'throw';
            scope.$emit('bindEvents');
            if (data != null && data.length >0) {
              scope.data = data;
              scope.ageGroupsList = data;
              var promise = new Promise( function(resolve, reject){
                    if (scope.ageGroupsList)
                      resolve(scope.ageGroupsList);
                    else
                      resolve([]);
                  });
              
              scope.dtInstance.changeData(function() {
                  return promise;
              });
                
            }
          },1000)
        });

       
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalData', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/national/national.html',
      scope: {
        data: '=data'
      }     
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalData', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/national/national.html',
      scope: {
        data: '=data'
      }     
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalGenderDistribution', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nationalGenderDistribution/nationalGenderDistribution.html',
      
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.genderDistributionList = $scope.widgetData;
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return new Promise( function(resolve, reject){
            if ($scope.widgetData)
              resolve($scope.widgetData);
            else
              resolve([]);
          });
        })  
          .withDOM('lfrti')
            .withOption('deferRender', true)
            // Do not forget to add the scrollY option!!!
            .withOption('paging',false)
            .withOption('bDestroy',true)
            .withOption('order', [1, 'desc']);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumns = [
          DTColumnBuilder.newColumn('Gender').withTitle('Gender'),
          DTColumnBuilder.newColumn('RiskLevel').withTitle('Risk Level Group'),  
          DTColumnBuilder.newColumn('Total').withTitle('At-Risk Persons')
        ];
      },
     link: function postLink(scope, element, attr) {
	
        scope.$on("bindEvents", function (){
      		$($('#nationalGenderDiv table')[0]).find('th').each(function(){
      			$(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
      			$(this).attr('scope','col');
      			$(this).attr('tabindex','-1');
          });
    		});
        scope.$watch('widgetData', function (data) {

          $timeout(function(){
            $.fn.dataTable.ext.errMode = 'throw';
            scope.$emit('bindEvents');
            if (data != null && data.length >0) {
              scope.data = data;
              scope.genderDistributionList = data;
              var promise = new Promise( function(resolve, reject){
                    if (scope.genderDistributionList)
                      resolve(scope.genderDistributionList);
                    else
                      resolve([]);
                  });
             scope.dtInstance.changeData(function() {
                  return promise;
              });
            }
          },1000)
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalData', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/national/national.html',
      scope: {
        data: '=data'
      }     
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalMilitaryBranch', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nationalMilitaryBranch/nationalMilitaryBranch.html',
       
	controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

	//$scope.dtOptions = DTOptionsBuilder.newOptions()
  //$scope.dtInstanceAbstract = {};
  $scope.dtInstance = {};
  $scope.militaryBranchList = $scope.widgetData;
  $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
    return new Promise( function(resolve, reject){
      if ($scope.widgetData)
        resolve($scope.widgetData);
      else
        resolve([]);
    });
  })
	.withOption('paging',false)
  .withOption('bDestroy',true)
	.withOption('order', [1, 'desc']);
	//.withPaginationType('full_numbers').withDisplayLength(5);
	$scope.dtColumns = [
        DTColumnBuilder.newColumn('BranchDesc').withTitle('Branch'),
        DTColumnBuilder.newColumn('RiskLevel').withTitle('Risk Level Group'),
        DTColumnBuilder.newColumn('Total').withTitle('At-Risk Persons')
	];
  },
link: function postLink(scope, element, attr) {	
    scope.$on("bindEvents", function (){
  		$($('#militaryBranchDiv table')[0]).find('th').each(function(){
  			$(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
  			$(this).attr('scope','col');
  			$(this).attr('tabindex','-1');
      });
      $timeout(function(){
        $('#militaryBranchDiv .dataTables_scrollHeadInner,#militaryBranchDiv table').css({'width':''}); 
        var containerHeight = parseInt($('#militaryBranchDiv').parent().css('height'),10);
        $('#militaryBranchDiv .dataTables_scrollBody').css('height',.78 * containerHeight);
      },1000)
		});
	scope.$watch('widgetData', function (data) {
    $timeout(function(){
      $.fn.dataTable.ext.errMode = 'throw';
      scope.$emit('bindEvents');
  	  if (data != null && data.length >0) {
  		  scope.data = data;
  		  scope.militaryBranchList = data;
        var promise = new Promise( function(resolve, reject){
              if (scope.militaryBranchList)
                resolve(scope.militaryBranchList);
              else
                resolve([]);
            });
        scope.dtInstance.changeData(function() {
                  return promise;
              });
  	  }
     },1000)
	});
}
}
});

/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalOutReachStatus', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nationalOutReachStatus/nationalOutReachStatus.html',
      
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.outreachStatusList = $scope.widgetData;
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return new Promise( function(resolve, reject){
            if ($scope.widgetData)
              resolve($scope.widgetData);
            else
              resolve([]);
          });
        })
        .withOption('paging',false)
        .withOption('bDestroy',true)
        .withOption('order', [1, 'desc']);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('checkListStatus').withTitle('Outreach Status'),
            DTColumnBuilder.newColumn('complete').withTitle('Total Complete'),
            DTColumnBuilder.newColumn('percent').withTitle('Percent Complete')
        ];
      },
     link: function postLink(scope, element, attr) {	
        scope.$on("bindEvents", function (){
      		$($('#outReachDiv table')[0]).find('th').each(function(){
      			$(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
      			$(this).attr('scope','col');
      			$(this).attr('tabindex','-1');
          });

          $timeout(function(){
            $('#outReachDiv .dataTables_scrollHeadInner,#outReachDiv table').css({'width':''});
            var containerHeight = parseInt($('#outReachDiv').parent().css('height'),10);
            $('#outReachDiv .dataTables_scrollBody').css('height',.78 * containerHeight);
          },2500);

		    });
        scope.$watch('widgetData', function (data) {  
          $timeout(function(){
            $.fn.dataTable.ext.errMode = 'throw';
            scope.$emit('bindEvents');

            if (data != null && data.length >0) {
              scope.data = data;
              scope.outreachStatusList = data;
              var promise = new Promise( function(resolve, reject){
                    if (scope.outreachStatusList)
                      resolve(scope.outreachStatusList);
                    else
                      resolve([]);
                  });
              scope.dtInstance.changeData(function() {
                  return promise;
              });
            }
          },1000)
        });


      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalData', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/national/national.html',
      scope: {
        data: '=data'
      }     
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalTopMidRisk', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nationalTopMidRisk/nationalTopMidRisk.html',
      scope: {
        data: '=data'
      },
      controller: function ($scope) {
        $scope.xAxisTickFormatFunction = function () {
          return function(d) {
          	return d;
          };
        };
        $scope.xFunction = function(){
          return function(d) {
            return d.RiskLabel;
          };
        };
        $scope.yFunction = function(){
          return function(d) {
            return d.value;
          };
        };
      }
    };
});
      
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalData', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/national/national.html',
      scope: {
        data: '=data'
      }     
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNationalVamc', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nationalVAMC/nationalVAMC.html',
      scope: {
        data: '=',
      },
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('lfrti')
            .withScroller()
            .withOption('deferRender', true)
            // Do not forget to add the scrollY option!!!
            .withOption('scrollY', 200)
            .withOption('paging',false)
            .withOption('order', [1, 'desc']);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3)
        ];
      },
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data) {
            scope.data = data;
          }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtNvd3LineChart', function ($filter) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/nvd3LineChart/nvd3LineChart.html',
      scope: {
        data: '=data',
        showLegend: '@',
        showTimeRange: '=?',
        timeAxisFormat: '=?'
      },
      controller: function ($scope) {
        var filter = $filter('date');
        var numberFilter = $filter('number');

        $scope.xAxisTickFormatFunction = function () {
          return function (d) {
            return filter(d, $scope.timeAxisFormat);
          };
        };

        $scope.yAxisTickFormatFunction = function () {
          return function (d) {
            if (d > 999) {
              var value;
              var scale;
              if (d < 999999) {
                value = Math.round(d/1000);
                scale = 'k';
              } else {
                value = Math.round(d/1000000);
                scale = 'm';
              }
              return numberFilter(value) + scale;
            } else {
              return numberFilter(d);
            }
          };
        };

        $scope.xFunction = function () {
          return function (d) {
            return d.timestamp;
          };
        };
        $scope.yFunction = function () {
          return function (d) {
            return d.value;
          };
        };
      },
      link: function postLink(scope, element, attrs) {
        if (!_.has(attrs, 'showTimeRange')) {
          scope.showTimeRange = true;
        }

        scope.timeAxisFormat = scope.timeAxisFormat || 'HH:mm';

        scope.$watch('data', function (data) {
          if (data && data[0] && data[0].values && (data[0].values.length > 1)) {
            var timeseries = _.sortBy(data[0].values, function (item) {
              return item.timestamp;
            });

            var start = timeseries[0].timestamp;
            var end = timeseries[timeseries.length - 1].timestamp;
            scope.start = start;
            scope.end = end;
          }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtPatientFlags', function ($timeout) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/patientFlags/patientFlags.html',
      scope: {
        data: '='
      },
      controller: function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('lfrti')
            .withScroller()
            .withOption('deferRender', true)
            // Do not forget to add the scorllY option!!!
            .withOption('scrollY', 200)
            .withOption('paging',false)
            .withOption('bDestroy',true)
            .withOption('order', [1, 'asc']);
        //.withPaginationType('full_numbers').withDisplayLength(5);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1)
        ];
        /*$resource('data.json').query().$promise.then(function(persons) {
            vm.persons = persons;
        });*/
      },
	link: function postLink(scope, element) {
		scope.$on("bindEvents", function (){
			$($('#patientFlagDiv table')[0]).find('th').each(function(){
			  $(this).attr('tabindex','-1');
			});
		});
    scope.$watch('data', function (data) {
      if (data) { 

    		$timeout(function(){
          $.fn.dataTable.ext.errMode = 'throw';
          scope.$emit('bindEvents');
            scope.data = data;
        },1500)            
      }
    });
	  scope.updateCategory
  }
};
});
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtPatientRosterTable', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/patientTable/patientTable.html',
      
      controller: function ($scope, $compile, $filter, $http, $modal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder,FileSaver) {
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.patientList = $scope.widgetData;
        $scope.OutreachMap = {};
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
              return new Promise( function(resolve, reject){
                if ($scope.widgetData)
                  resolve($scope.widgetData);
                else
                  resolve([]);
              });
 
          })//.fromSource($scope.widgetData) newOptions().
            .withOption('createdRow', function(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            })
            .withOption('rowCallback', rowCallback)
            .withDOM('frtip')
            .withButtons([
                {
                  text: '<a name="PatientExport" class="glyphicon glyphicon-export"></a>',
                  action: function (e, dt, node, config) {
                      JSONToCSVConvertor($scope.patientList,'PatientRoster');
                  }
                }
            ])
            .withScroller()
            .withOption('deferRender', true)
            // Do not forget to add the scrollY option!!!
            .withOption('scrollY', 200)
            .withOption('scrollX', '100%')
            .withOption('bDestroy',true)
            .withOption('aaSorting', [
                [3, 'desc']
            ])
            .withLanguage({
              "sInfo": "Total Records: _TOTAL_"
            });

         function JSONToCSVConvertor(JSONData,title) {
            var exportHeaders = ['ReachID','FirstName','LastName','SSN','HomePhone','DateIdentifiedAsAtRisk','RiskLevel','CurrentStatus']
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            var d = new Date();

            var month = d.getMonth()+1;
            var day = d.getDate();
            var time = d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
            var fileDateTime = d.getFullYear() +
            (month<10 ? '0' : '') + month +
            (day<10 ? '0' : '') + day + "_" + time;
            var CSV = '';
            
            //Headers
            var row = "";
            for (var index in arrData[0]) {
              if($.inArray(index, exportHeaders) > 0)
              {
                row += index + ',';
              }
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
            
            //Rows-Data
            for (var i = 0; i < arrData.length; i++) {
                var row = "";
                for (var index in arrData[i]) {
                    if($.inArray(index, exportHeaders) > 0)
                    {
                      if(index === 'OutreachStatus')
                      {
                        var arrValue = arrData[i][index] == null ? "" : $filter('filter')($scope.outreachStatusList, {OutReachStatusID: 
                                                                                          parseInt(arrData[i][index]) })[0].StatusDesc;  
                      }
                      else
                      {
                        var arrValue = arrData[i][index] == null ? "" : arrData[i][index];  
                      }
                      row += arrValue + ',';
                    }
                }
                row.slice(0, row.length - 1);
                CSV += row + '\r\n';
            }
            
            var blob = new Blob([CSV], { type: "text/csv;charset=utf-8" });
            var user = JSON.parse(sessionStorage.user);
            var logMessage = 'User - ' + user.UserName;
            var params = {
              action:'Patient Roster Export'
            }

            $http.post('/api/audit',params)
            .success(function(data) {
               FileSaver.saveAs(blob, "PatientRoster_" + fileDateTime + ".csv");
            });
           
        };

        $scope.dtColumns = [
            DTColumnBuilder.newColumn('Name').withTitle('Name'),
            DTColumnBuilder.newColumn('SSN').withTitle('SSN'),
            DTColumnBuilder.newColumn('HomePhone').withTitle('Phone'),
            DTColumnBuilder.newColumn('DateIdentifiedAsAtRisk').withTitle('Date First Identified'),
            DTColumnBuilder.newColumn('RiskLevel').withTitle('Statistical Risk Level'),
            DTColumnBuilder.newColumn('CurrentStatus').withTitle('Outreach Status').withOption('width', '10%').notSortable().renderWith(function(data, type, full, meta) {
               var data1 = data.split('|')[0]
               var data2 = data.split('|')[1]
               var template = '<div>' + data1 + '</div><br/><div>'+data2+'</div>';
               return  template;
            })
        ];

        $scope.rowClickHandler= function(info) {
          if($scope.common.data.EnterDataIsUnsaved == true){
              $(".unsavedDataAlert").fadeIn();
              return;
          }

          var selectedRow = $("#tblPatient tr:contains('"+info.SSN+"')");
          if(selectedRow.hasClass('selected'))
          {
            return;
          } 
          else
          {
            $('#tblPatient tr.selected').removeClass('selected');
            selectedRow.addClass('selected');
            var commonData = $scope.widget.dataModelOptions.common;
            var vetId = info.ReachID;
            var obj = jQuery.grep($scope.patientList, function( n, i ) {
              return ( n.ReachID == vetId );
            });
            commonData.data.veteranObj = obj[0];
            commonData.data.patientRosterScrollPos = $('#patientRosterDiv .dataTables_scrollBody').scrollTop();;
            console.log("CommonDataAfterClick: ", commonData);
            // broadcast message throughout system
            $scope.$parent.$parent.$parent.$broadcast('commonDataChanged', commonData);

          }

        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
          $('td', nRow).unbind('click');
          $('td', nRow).bind('click', function() {
              $scope.$apply(function() {
                  $scope.rowClickHandler(aData);
              });
          });
          return nRow;
        }

        $scope.removePatient =  function(){
          $modal.open({
            scope: $scope,
            templateUrl: 'client/components/widget/widgets/patientTable/removePatientModal.html',
            controller: 'RemovePatientCtrl',
            backdrop  : 'static',
            keyboard  : false,
            resolve: {
                params: function() {
                    return {
                      veteranObj: $scope.widget.dataModelOptions.common.data.veteranObj
                    };
                }
            }
          });
        }

        $scope.resizeWidgetDataArea = function(){
          var containerHeight = parseInt($('#patientRosterDiv').parent().css('height'),10);
          $('#patientRosterDiv').find('.dataTables_scrollBody').css('height',.5 * containerHeight);
        } 

      },
      link: function postLink(scope, element, attr) {
        scope.$on("gridsterResized", function (){
            $timeout(function(){
              scope.resizeWidgetDataArea();
            },1000);
        });

        scope.$on("updateSelectMenu", function (){
          var datamodelList = {};
          var patientList = scope.widgetData[1];          	 	  
    		  $($('#patientRosterDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
    				$(this).attr('scope','col');
            $(this).attr('tabindex','-1');
          });

          $('#patientRosterDiv .dt-buttons').attr('title','Patient Roster-Export to Excel')
			
		      $('#tblPatient_info').attr('title','Patient Table: Tab to move to the next control');
    
          $('#patientRosterDiv .dataTables_scrollHeadInner,#patientRosterDiv .dataTables_scrollHeadInner table').css({'width':''});   
          var containerHeight = parseInt($('#patientRosterDiv').parent().css('height'),10);
          $('#patientRosterDiv .dataTables_scrollBody').css('height',.78 * containerHeight);    
		  
    		  $('#tblPatient tbody>tr select').keydown(function(event){ 
            if (event.keyCode == '13' || event.key == 'Enter') {
              $(this).closest('tr').click();
              return false; 
            } 
            if (event.keyCode == '27' || event.key == 'Cancel') {
              $('#tblPatient_info').focus();
              $('#tblPatient_info').tooltip().mouseover();
              return false; 
            } 		  
          });

        });
        scope.$watch('widgetData', function(v){  
          if(v != null && v.length >0){
            scope.outreachStatusList = scope.widgetData[2];
            scope.patientList = scope.widgetData[1];

            var outreachStatus = scope.outreachStatusList;
            var patientsBysta3N = scope.patientList;

            scope.patientList.map(function(obj){
              scope.OutreachMap[obj.ReachID] = obj.OutreachStatus != null ?  $.grep(scope.outreachStatusList,function(e){
                                                                                      return e.OutReachStatusID == obj.OutreachStatus
                                                                                    })[0] : null;

          });
  
            scope.patientList = patientsBysta3N;
            var promise = new Promise( function(resolve, reject){
                  if (scope.patientList)
                    resolve(scope.patientList);
                  else
                    resolve([]);
                });
            scope.dtInstance.changeData(function() {
                  return promise;
              });
            
            $timeout(function(){
              $.fn.dataTable.ext.errMode = 'throw';
              scope.$emit('updateSelectMenu'); 
              var commonData = scope.widget.dataModelOptions.common;
              if(!commonData.data.veteranObj)
              {
                $($('#tblPatient').find( "td" )[1]).click()
              }
              else
              {
                $('#patientRosterDiv .dataTables_scrollBody').scrollTop(commonData.data.patientRosterScrollPos);
                $timeout(function() {
                  $('#tblPatient').find( "tbody>tr td:contains('"+commonData.data.veteranObj.Name+"')" ).click();
                }, 500);
              }

              scope.resizeWidgetDataArea();
               
            },500)            
          }
        });
      }
    };
  });
'use strict';

angular.module('ui.widgets')
	.controller('RemovePatientCtrl', ['$scope', '$modalInstance', 'params',
        function($scope, $modalInstance, params) {
        	$scope.name = params.veteranObj.Name;
        	$scope.ok = function(){
        		$modalInstance.dismiss('cancel');
        	}

        	$scope.cancel = function(){
        		$modalInstance.dismiss('cancel');
        	}
        }
]);
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtPieChart', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/pieChart/pieChart.html',
      scope: {
        data: '=data'
      },
      controller: function ($scope) {
        $scope.xFunction = function(){
          return function(d) {
            return d.key;
          };
        };
        $scope.yFunction = function(){
          return function(d) {
            return d.y;
          };
        };

        $scope.descriptionFunction = function(){
          return function(d){
            return d.key + ' ' + d.y;
          };
        };
      }
    };
  });
/* globals d3 */
'use strict';

angular.module('ui.widgets').directive('predictionChart', function () {
return {
    restrict: 'A',
    replace: true,
    templateUrl: 'client/components/widget/widgets/predictionChart/predictionChart.html',
    scope: {
      data: '=data'
    },
    controller: function ($scope) {
      $scope.xAxisTickFormatFunction = function () {
        return function (d) {
          return d;
        };
      };
      $scope.yAxisTickFormatFunction = function () {
        return function (d) {
          return d;
        };
      };
      $scope.xFunction = function () {
        return function (d) {
          return d.x;
        };
      };
      $scope.yFunction = function () {
        return function (d) {
          return d.y;
        };
      };
      $scope.xAxisTickValuesFunction = function () {
        return function () {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 17];
         };
      }; 
    },
  };
});

/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtRandom', function ($interval) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/random/random.html',
      link: function postLink(scope) {
        function update() {
          scope.number = Math.floor(Math.random() * 100);
        }

        var promise = $interval(update, 500);

        scope.$on('$destroy', function () {
          $interval.cancel(promise);
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtScopeWatch', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/scopeWatch/scopeWatch.html',
      scope: {
        scopeValue: '=value',
        valueClass: '@valueClass'
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtSelect', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/select/select.html',
      scope: {
        label: '@',
        value: '=',
        options: '='
      },
      controller: function ($scope) {
        $scope.prevValue = function () {
          var index = $scope.options.indexOf($scope.value);
          var nextIndex = (index - 1 + $scope.options.length) % $scope.options.length;
          $scope.value = $scope.options[nextIndex];
        };

        $scope.nextValue = function () {
          var index = $scope.options.indexOf($scope.value);
          var nextIndex = (index + 1) % $scope.options.length;
          $scope.value = $scope.options[nextIndex];
        };
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtExternalSuicideStatistics', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/suicideStatistics/suicideStatistics.html',
      
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = DTInstances;
        $scope.dtInstance = {};
        $scope.suicideStatusList = $scope.widgetData;
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return new Promise( function(resolve, reject){
            if ($scope.widgetData)
              resolve($scope.widgetData);
            else
              resolve([]);
          });
        })
        .withOption('paging',false)
        .withOption('bDestroy',true)
        .withOption('order', [0, 'asc']);
            //.withPaginationType('full_numbers').withDisplayLength(100);
			
        $scope.dtColumns = [
          DTColumnBuilder.newColumn('Age').withTitle('Age Range'),
          DTColumnBuilder.newColumn('Gender').withTitle('Gender'),
          DTColumnBuilder.newColumn('Value').withTitle('2013 Total Suicide Deaths Per 100K'),
          DTColumnBuilder.newColumn('Ethnicity').withTitle('Ethnicity')
        ];
      },
     link: function postLink(scope, element, attr) {
	
        scope.$on("bindEvents", function (){
		$($('#suicideStatisticsDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
			$(this).attr('scope','col');
			$(this).attr('tabindex','-1');
        });
		});
		
        scope.$watch('widgetData', function (data) {
		$timeout(function(){
      $.fn.dataTable.ext.errMode = 'throw';
                scope.$emit('bindEvents');
          if (data != null && data.length >0) {
            scope.data = data;
            scope.suicideStatusList = data;
            var promise = new Promise( function(resolve, reject){
              if (scope.suicideStatusList)
                resolve(scope.suicideStatusList);
              else
                resolve([]);
            });
           scope.dtInstance.changeData(function() {
                  return promise;
              });

          }
		      },1000)
        });

        $timeout(function(){
          $('#suicideStatisticsDiv .dataTables_scrollHeadInner,#suicideStatisticsDiv table').css({'width':''});
          var containerHeight = parseInt($('#suicideStatisticsDiv').parent().css('height'),10);
          $('#suicideStatisticsDiv .dataTables_scrollBody').css('height',.78 * containerHeight);  
        },2500);
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtTime', function ($interval) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/time/time.html',
      link: function (scope) {
        function update() {
          scope.time = new Date().toLocaleTimeString();
        }

        var promise = $interval(update, 500);

        scope.$on('$destroy', function () {
          $interval.cancel(promise);
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtTopN', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'client/components/widget/widgets/topN/topN.html',
      scope: {
        data: '='
      },
      controller: function ($scope) {
        $scope.tableOptions = {
          initialSorts: [
            { id: 'value', dir: '-' }
          ]
        };
        $scope.columns = [
          { id: 'name', key: 'name', label: 'Name' },
          { id: 'value', key: 'value', label: 'Value', sort: 'number' }
        ];
      },
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data) {
            scope.items = data;
          }
        });
      }
    };
  });
/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtVismRoster', function ($timeout) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'client/components/widget/widgets/vismRoster/vismRoster.html',
      
      controller: function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

        //$scope.dtOptions = DTOptionsBuilder.newOptions()
        //$scope.dtInstanceAbstract = {};
        $scope.dtInstance = {};
        $scope.visnList = $scope.widgetData;
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return new Promise( function(resolve, reject){
            if ($scope.widgetData)
              resolve($scope.widgetData);
            else
              resolve([]);
          });

        })
        .withOption('paging',false)
        .withOption('bDestroy',true)
        .withOption('order', [0, 'asc']);
            
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('VISN').withTitle('VISN'),
            DTColumnBuilder.newColumn('NetworkName').withTitle('Network Name'),
            DTColumnBuilder.newColumn('RegionServed').withTitle('Region Served'),
            DTColumnBuilder.newColumn('Total').withTitle('Patients'),
            DTColumnBuilder.newColumn('AtRisk').withTitle('At-Risk Persons')
        ];    
        $scope.eventTimer = null;
      },
      link: function postLink(scope, element, attr) {
          scope.$on("bindEvents", function (){
      
          scope.dtInstance.changeData(function() {
              return new Promise( function(resolve, reject){
                if (scope.visnList)
                  resolve(scope.visnList);
                else
                  resolve([]);
              });
          });


          $($('#VISNRosterDiv table')[0]).find('th').each(function(){
            $(this).html('<a href="" alt='+$(this).text()+' title="Click enter to sort by '+ $(this).text()+'">'+$(this).text()+'</a>');
            $(this).attr('scope','col');
            $(this).attr('tabindex','-1');
          });

        $($('#VISNRosterDiv table')[0]).find('th').keydown(function(event){ 
          if (event.keyCode == 40 || event.key == 'Down' || event.keyCode == 38 || event.key == 'Up') {
            var isRowAtFocus = $('#tblVismRoster').find('tr.rowAtFocus');
            if(isRowAtFocus.length > 0)
            {
              isRowAtFocus.removeClass('rowAtFocus');
              isRowAtFocus.css('backgroundColor','');
              if(event.keyCode == 40)
              {
                if(isRowAtFocus.next())
                {
                  isRowAtFocus.next().addClass('rowAtFocus');
                  isRowAtFocus.next().css('backgroundColor','#f5f5f5');  
                }  
              }
              else
              {
                if(isRowAtFocus.prev())
                {
                  isRowAtFocus.prev().addClass('rowAtFocus');
                  isRowAtFocus.prev().css('backgroundColor','#f5f5f5');  
                }
              }
            }
            else
            {
              $($('#tblVismRoster>tbody>tr')[0]).addClass('rowAtFocus');
              $($('#tblVismRoster>tbody>tr')[0]).css('backgroundColor','#f5f5f5');
            }
            $('#VISNRosterDiv .dataTables_scrollBody').animate({ scrollTop: $('#tblVismRoster').find('tr.rowAtFocus')[0].offsetTop }, 500);
            return false;
          }

          if (event.keyCode == '32' || event.key == 'Spacebar') {
            $('#tblVismRoster').find('tr.rowAtFocus').css('backgroundColor','');
            $('#tblVismRoster').find('tr.rowAtFocus').click();
            return false;
          }

        });

		
          $('#tblVismRoster').on( 'click', 'tr', function (event) {
            if(scope.eventTimer == event.timeStamp) return;
			
            scope.eventTimer = event.timeStamp;
            var visnId = null;
            var commonData = scope.widget.dataModelOptions.common;
            
            //if(scope.previousSelectedRowIndex == event.currentTarget.rowIndex){
            if($(this).hasClass('selected')){
              $(this).removeClass('selected');  
              //$('tr.selected').removeClass('selected');
              $(this).removeClass('selected').removeClass('selected');
              visnId = '';
              //scope.previousSelectedRowIndex = null;
            }
            else{
              //$('tr.selected').removeClass('selected');
              //$(this).addClass('selected');      
               $('#tblVismRoster tbody tr').filter(['.selected'].join()).removeClass('selected');
               console.log("VISNRoster selected:",$(this));
              $(this).addClass('selected');      
              // update common data object with new patient object
              visnId = parseInt(event.currentTarget.cells[0].innerText);
              /*var obj = jQuery.grep(scope.patientList, function( n, i ) {
                return ( n.ReachID == vetId );
              });*/
              console.log("VISN ID Selected: ",visnId);
              //delete obj[0].OutreachStatusSelect;              
            }

            var activeView = commonData.data.activeView;
            if(activeView == "surveillance"){
              commonData.data.visnSelected.surveillance = visnId;
              commonData.data.facilitySelected.surveillanceName = null; 
              commonData.data.facilitySelected.surveillance = null; 
            }
              
            else if(activeView == "facility")
              commonData.data.visnSelected.facility = visnId;
            //console.log("CommonDataAfterClick: ", commonData);

            // broadcast message throughout system
            scope.$root.$broadcast('commonDataChanged', commonData);
            //scope.$apply();
          });

          $('#VISNRosterDiv .dataTables_scrollHeadInner,#VISNRosterDiv table').css({'width':''}); 
          var containerHeight = parseInt($('#VISNRosterDiv').parent().css('height'),10);
          $('#VISNRosterDiv .dataTables_scrollBody').css('height',.78 * containerHeight);
        });
        scope.$watch('widgetData', function(data){
          if(data != null && data.length >0){
              scope.data = data;
              scope.visnList = data;
              scope.$emit('bindEvents');                           
              $timeout(function(){
                $.fn.dataTable.ext.errMode = 'throw';
                var commonData = scope.widget.dataModelOptions.common;
                var activeView = commonData.data.activeView;
                if(activeView == "surveillance"){
                  if(commonData.data.visnSelected.surveillance != null && commonData.data.visnSelected.surveillance.toString().length > 0)
                  {
                    var selectedRow = null; 
                    $('#tblVismRoster tbody tr').each(function(){
                        var textcolumn = $(this).find('td').eq(0).text();
                        if($(this).find('td').eq(0).text() == commonData.data.visnSelected.surveillance){
                            selectedRow = $(this);
                            selectedRow.addClass('selected');//click();
                            //selectedRow[0].click();//.dataTables_scrollBody
                            var rowPosition = selectedRow[0].rowIndex - 6;
                            if(rowPosition > 0)
                            {
                              $('#VISNRosterDiv').parent().animate({
                                scrollTop: $('#tblVismRoster tbody tr').eq(rowPosition).offset().top
                              },500)
                            }
                        }
                    });  
                  }    
                }                
              },1500)            
            }
        });
      }
    };
  });
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
    "                \r" +
    "\n" +
    "              <div ng-repeat=\"condition in data.conditions\">\r" +
    "\n" +
    "                <div ng-if=\"$index == 0 || $index != 0 && data.conditions[$index].Condition != data.conditions[$index-1].Condition\">\r" +
    "\n" +
    "                  <hr style=\"margin-top:5px;margin-bottom: 0px\"/>\r" +
    "\n" +
    "                  <label style=\"margin:0px\">\r" +
    "\n" +
    "                      {{condition.Condition}}\r" +
    "\n" +
    "                  </label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div>\r" +
    "\n" +
    "                  <input id=\"Condition_{{condition.Condition_ID}}\" ng-click=\"RadioBtnClicked()\" name=\"{{condition.Condition}}\" type=\"radio\" /> {{condition.Condition_SubQuestion}}\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "              <div style=\"height:40px;padding:5px;\">\r" +
    "\n" +
    "                <button ng-click=\"ResetQuestions()\" alt=\"Reset Questions\" title=\"Reset Questions\" ng-disabled=\"!IsChecked\"  class=\"btn btn-primary pull-left\">Reset Selection</button>\r" +
    "\n" +
    "                <button ng-click=\"GotoQuestions()\" alt=\"Next(Questions)\" title=\"Next(Questions)\" ng-disabled=\"!IsChecked\" class=\"btn btn-primary pull-right\">Next</button>\r" +
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
    "      <legend>Question(s):</legend>\r" +
    "\n" +
    "      <div class=\"cdsUIList\" style=\"margin:10px;padding:5px;overflow-y:scroll;\">\r" +
    "\n" +
    "          <div ng-repeat=\"question in filteredQuestions\">\r" +
    "\n" +
    "              <hr style=\"margin-top:5px;margin-bottom: 0px\"/>\r" +
    "\n" +
    "              <label>\r" +
    "\n" +
    "                  {{question.ConditionName}}\r" +
    "\n" +
    "              </label>\r" +
    "\n" +
    "              <div ng-repeat=\"q in question.Questions\">\r" +
    "\n" +
    "                <label style=\"font-weight: normal;\">{{$index+1}}. {{q.Question}}  </label>\r" +
    "\n" +
    "                <div class=\"dropdown\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default\"\r" +
    "\n" +
    "                            data-toggle=\"dropdown\" id=\"question_{{q.Question_ID}}\" name=\"{{question.ConditionName}}\">\r" +
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
    "                </div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "          </div>\r" +
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
    "          <div ng-repeat=\"t in filteredTreatments\">\r" +
    "\n" +
    "            <hr style=\"margin-top:5px;margin-bottom: 0px\"/>\r" +
    "\n" +
    "            <label>{{$index+1}}. {{t.ConditionName}}</label>\r" +
    "\n" +
    "            <div ng-repeat=\"treatment in t.Treatments\">\r" +
    "\n" +
    "              <label style=\"font-weight:normal;\">{{treatment.Treatment}}</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>  \r" +
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
    "<div name=\"clinicalDecisionSupport\" style=\"overflow:auto; height:auto; width:auto; padding: 15px\">\r" +
    "\n" +
    "\t<div ng-repeat=\"cpg in cpgList\">\r" +
    "\n" +
    "<b style=\"color:rgb(16, 52, 166); text-decoration: underline\">Welcome to Perceptive Reach</b>\r" +
    "\n" +
    "    <p>Perceptive Reach uses predictive (statistical) modeling to identify Veterans at risk for suicide and other adverse outcomes. The patients identified by the model are at increased risk for outcomes including suicide attempts, deaths from accidents, overdoses, injuries, all-cause mortality, hospitalizations for mental health conditions, and medical/surgical hospitalizations.</p>\r" +
    "\n" +
    "    <p>As participants in this program, facility coordinators will focus on implementing the program, engaging providers, and ensuring that providers are aware of which of their patients are at risk. Providers for Veterans identified will be asked to review the care Veterans receive and to enhance it as appropriate.</p>\r" +
    "\n" +
    "    <b>Dashboard Outreach & Intervention</b>\r" +
    "\n" +
    "    <p>Facility coordinators should first review their list of “at-risk” Veterans in the Patient Roster by VAMC widget on the Individual view and assign providers for each Veteran. Facility coordinators should then engage the providers and notify them of their “at-risk” patients.\r" +
    "\n" +
    "Detailed outreach and intervention steps for both facility coordinators and providers are located in the “Data Entry Widget” on this Dashboard. \r" +
    "\n" +
    "\t</p>\r" +
    "\n" +
    "    <b>Training & Additional Guidance</b>\r" +
    "\n" +
    "    <p>For additional instructional content and training on the program and Dashboard, please visit: <a href=\"http://vaww.mirecc.va.gov/reachvet/\" style=\"color:rgb(16, 52, 166)\">http://vaww.mirecc.va.gov/reachvet/</a></p>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("client/components/widget/widgets/communityResource/communityresource.html",
    "<div class=\"appointment\">\r" +
    "\n" +
    "\t<table id=\"tblAppointment\" datatable=\"ng\" dt-options=\"dtOptions\" dt-column-defs=\"dtColumnDefs\" class=\"row-border hover\">\r" +
    "\n" +
    "        <thead>\r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th><a href=\"\" ng-click=\"predicate = 'Name'; reverse=false\">Name</a></th>\r" +
    "\n" +
    "            <th><a href=\"\" ng-click=\"predicate = 'Address'; reverse=!reverse\">Address</a></th>\r" +
    "\n" +
    "            <th><a href=\"\" ng-click=\"predicate = 'Phone'; reverse=!reverse\">Phone</a></th>\r" +
    "\n" +
    "\t\t\t\t\t\t<th><a href=\"\" ng-click=\"predicate = 'Website'; reverse=!reverse\">Website</a></th>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"commResource in data track by $index | orderBy:predicate:reverse\">\r" +
    "\n" +
    "            <td>{{ commResource.Name }}</td>\r" +
    "\n" +
    "             <td>{{ commResource.Address }}</td>\r" +
    "\n" +
    "            <td>{{ commResource.Phone }}</td>\r" +
    "\n" +
    "\t\t\t\t\t\t<td>{{ commResource.Website }}</td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>\r" +
    "\n"
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
    "<div ng-form=\"enterWdgtForm\" id=\"enterWdgtDataForm\">\r" +
    "\n" +
    "  <div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-body\" style=\"padding-left:40px\">\r" +
    "\n" +
    "    <div class=\"enterWdgtDataDiv\" style=\"overflow-y:auto;overflow-x:hidden;\">\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "        <label>Outreach Status</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div style=\"padding-bottom:10px;\">Initiation Checklist- To be completed by site facilitator(s)</div>\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"IdentifiedPrimaryProvider\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          1. Identified a primary patient provider. <label class=\"enterDataDateFont\">{{outreachStatus.IdentifiedPrimaryProvider_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"NotifiedProvider\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          2. Notified provider of the specific patient and program requirements <label class=\"enterDataDateFont\">{{outreachStatus.NotifiedProvider_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"AskedProviderReview\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          3. Asked provider to review treatment plans for the patient. <label class=\"enterDataDateFont\">{{outreachStatus.AskedProviderReview_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div style=\"padding-bottom:10px;padding-top:10px\">Outreach Checklist- To be completed by patient provider(or facilitator with provider approval)</div>\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"ReceivedNotification\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          4.Received notification from Site Facilitator about the patient <label class=\"enterDataDateFont\">{{outreachStatus.ReceivedNotification_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"ReviewedCurrentDiagnosis\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          5. Reviewed current diagnoses and treatments <label class=\"enterDataDateFont\">{{outreachStatus.ReviewedCurrentDiagnosis_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"EstablishedContact\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          6. Established contact with the patient to review current diagnoses, symptoms, adherence and problems <label class=\"enterDataDateFont\">{{outreachStatus.EstablishedContact_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div style=\"padding-bottom:10px;padding-top:10px\">Care Evaluation Checklist – To Be Completed by Patient Provider (or Facilitator with Provider Approval)</div>\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"UpdatedPlan\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          7.Updated the plan for management and treatment as appropriate <label class=\"enterDataDateFont\">{{outreachStatus.UpdatedPlan_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"EvaluateCaring\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          8. Evaluate appropriateness of Caring Communications program <label class=\"enterDataDateFont\">{{outreachStatus.EvaluateCaring_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"EvaluateSafetyPlan\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          9. Evaluate appropriateness of Safety Planning <label class=\"enterDataDateFont\">{{outreachStatus.EvaluateSafetyPlan_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div style=\"padding-bottom:10px;padding-top:10px\">Reasons for not Receiving VA Services– To Be Completed by Patient Provider (or Facilitator with Provider Approval)</div>\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"Deceased\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          10. Deceased <label class=\"enterDataDateFont\">{{outreachStatus.Deceased_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"CannotContact\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          11. Cannot Contact <label class=\"enterDataDateFont\">{{outreachStatus.CannotContact_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"RefusedServices\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          12. Refused Services <label class=\"enterDataDateFont\">{{outreachStatus.RefusedServices_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"CareFromCommunity\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "         13. Care from community provider <label class=\"enterDataDateFont\">{{outreachStatus.CareFromCommunity_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"ClinicallyNotAtRisk\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          14. Clinically not at risk <label class=\"enterDataDateFont\">{{outreachStatus.ClinicallyNotAtRisk_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1 text-right\">\r" +
    "\n" +
    "          <input type=\"checkbox\" ng-model=\"Other\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3 text-left\">\r" +
    "\n" +
    "          15. Other <label class=\"enterDataDateFont\">{{outreachStatus.Other_Date | date:'MM/dd/yyyy' }}</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12 bs-example hr-text\">\r" +
    "\n" +
    "        <label style=\"margin-left:32px;\">High Risk Flag Information</label>\r" +
    "\n" +
    "          <div class=\"panel-body\">\r" +
    "\n" +
    "            <div class=\"col-md-6\" ng-attr-title=\"{{data.HighRisk_UserNotes[hrIndex].EntryDate | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "              <label style=\"font-weight:normal\">User Notes:</label>\r" +
    "\n" +
    "              <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "                <button type=\"button\" name=\"hrBack\" title=\"Previous High Risk Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"hrIndex >= data.HighRisk_UserNotes.length-1\" ng-click=\"goHrBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>Previous High Risk Info.\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "                <div class=\"pull-left\">\r" +
    "\n" +
    "                  <input type=\"text\" ng-keypress=\"jumpTo($event,'hr')\" class=\"enterDataNumInput\" ng-model=\"hrIndex\" title=\"High Risk: Jump To Record\"></input>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <button type=\"button\" name=\"hrFwd\" title=\"Next High Risk Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"hrIndex === 0\" ng-click=\"goHrForward()\"><i class=\"glyphicon glyphicon-arrow-right\" \r" +
    "\n" +
    "                  style=\"font-size:13px;width: 18px;\"></i>Next High Risk Info.\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "              </div><br/>\r" +
    "\n" +
    "              <textarea class=\"col-md-12 enterDataBox\" rows=\"4\" style=\"font-weight:normal;\" type=\"text\" ng-required=\"true\" ng-model=\"hrText\" name=\"highRiskTxt\" ng-change=\"enterDataChanged()\" ng-class=\"{enterDataDirty: enterWdgtForm.highRiskTxt.$dirty && enterWdgtForm.highRiskTxt.$valid}\" id=\"hrText\" maxlength=\"128\" title=\"High Risk Flag Information\"></textarea>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-md-6\" ng-attr-title=\"{{data.HighRisk_SPANImport[hrSpanIndex].DateHighRiskLastUpdated | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "              <label style=\"font-weight:normal\">SPAN Records:</label>\r" +
    "\n" +
    "              <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "                <button type=\"button\" name=\"hrSpanBack\" title=\"Previous High Risk Span Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"hrSpanIndex >= data.HighRisk_SPANImport.length-1\" ng-click=\"goHrSpanBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>Previous High Risk Span Info.\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "                <div class=\"pull-left\">\r" +
    "\n" +
    "                  <input title=\"High Risk Span: Jump To Record\" type=\"text\" ng-keypress=\"jumpTo($event,'hrspan')\" class=\"enterDataNumInput\" ng-model=\"hrSpanIndex\"></input>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <button type=\"button\" name=\"hrSpanFwd\" title=\"Next High Risk Span Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"hrSpanIndex === 0\" ng-click=\"goHrSpanForward()\"><i class=\"glyphicon glyphicon-arrow-right\"\r" +
    "\n" +
    "                  style=\"font-size:13px;width: 18px;\"></i>Next High Risk Span Info.\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "              <div class=\"col-md-12 enterDataBox\" style=\"background-color:#e6e6e6;\">\r" +
    "\n" +
    "                <label style=\"font-weight:normal\">High Risk: {{data.HighRisk_SPANImport[hrSpanIndex].HighRisk}}</label><br/>\r" +
    "\n" +
    "                <label style=\"font-weight:normal\">Date First Identified: {{data.HighRisk_SPANImport[hrSpanIndex].DateFirstIdentifiedAsHighRisk | date: 'dd-MM-yyyy HH:mma'}}</label><br/>\r" +
    "\n" +
    "                <label style=\"font-weight:normal\">Date Last Updated: {{data.HighRisk_SPANImport[hrSpanIndex].DateHighRiskLastUpdated | date: 'dd-MM-yyyy HH:mma'}}</label>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12 bs-example mh-text\">\r" +
    "\n" +
    "        <label style=\"margin-left:32px;\">Mental Health Provider Information</label>\r" +
    "\n" +
    "          <div class=\"panel-body\">\r" +
    "\n" +
    "            <div class=\"col-md-6\" ng-attr-title=\"{{data.PrimaryHealthProvider_UserNotes[mhIndex].EntryDate | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "              <label style=\"font-weight:normal\">User Notes:</label>\r" +
    "\n" +
    "              <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "                <button type=\"button\" name=\"mhBack\" title=\"Previous Mental Health Provider Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"mhIndex >= data.PrimaryHealthProvider_UserNotes.length-1\" ng-click=\"goMhBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>Previous Mental Health Provider Info.\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "                <div class=\"pull-left\">\r" +
    "\n" +
    "                  <input title=\"Mental Health Prov.: Jump To Record\" class=\"enterDataNumInput\" type=\"text\" ng-keypress=\"jumpTo($event,'mh')\" ng-change=\"mhIndexChange(mhIndex)\" ng-model=\"mhIndex\"></input>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <button type=\"button\" name=\"mhFwd\" title=\"Next Mental Health Provider Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"mhIndex === 0\" ng-click=\"goMhForward()\"><i class=\"glyphicon glyphicon-arrow-right\"  style=\"font-size:13px;width: 18px;\"></i>Next Mental Health Provider Info.\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "              </div><br/>\r" +
    "\n" +
    "              <textarea class=\"col-md-12 enterDataBox\" rows=\"4\" style=\"font-weight:normal;\" type=\"text\" ng-required=\"true\" ng-model=\"mhText\" name=\"mentalProviderTxt\" ng-class=\"{enterDataDirty: enterWdgtForm.mentalProviderTxt.$dirty && enterWdgtForm.mentalProviderTxt.$valid}\" id=\"mhText\" ng-change=\"enterDataChanged()\" maxlength=\"128\" title=\"Mental Health Provider Information\"></textarea>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-md-6\"> \r" +
    "\n" +
    "              <label style=\"font-weight:normal\">VistA Records:</label>\r" +
    "\n" +
    "              \r" +
    "\n" +
    "              <div class=\"col-md-12 enterDataBox\" style=\"background-color:#e6e6e6;\">\r" +
    "\n" +
    "               <label style=\"font-weight:normal\">{{noDataFound}}</label>\r" +
    "\n" +
    "             </div>\r" +
    "\n" +
    "           </div>\r" +
    "\n" +
    "         </div>\r" +
    "\n" +
    "       </div>\r" +
    "\n" +
    "     </div>\r" +
    "\n" +
    "     <div class=\"row\">\r" +
    "\n" +
    "      <div class=\"col-md-12 bs-example sp-text\">\r" +
    "\n" +
    "      <label style=\"margin-left:32px;\">Safety Plan Information</label>\r" +
    "\n" +
    "        <div class=\"panel-body\">\r" +
    "\n" +
    "          <div class=\"col-md-6\" ng-attr-title=\"{{data.SafetyPlan_UserNotes[spIndex].EntryDate | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "            <label style=\"font-weight:normal\">User Notes:</label>\r" +
    "\n" +
    "            <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "              <button type=\"button\" name=\"spBack\" title=\"Previous Safety Plan Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"spIndex >= data.SafetyPlan_UserNotes.length-1\" ng-click=\"goSpBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>Previous Safety Plan Info.\r" +
    "\n" +
    "              </button>\r" +
    "\n" +
    "              <div class=\"pull-left\">\r" +
    "\n" +
    "                <input title=\"Safety Plan: Jump To Record\" type=\"text\" ng-keypress=\"jumpTo($event,'sp')\" class=\"enterDataNumInput\" ng-model=\"spIndex\"></input>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "              <button type=\"button\" name=\"spFwd\" title=\"Next Safety Plan Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"spIndex === 0\" ng-click=\"goSpForward()\"><i class=\"glyphicon glyphicon-arrow-right\" \r" +
    "\n" +
    "                style=\"font-size:13px;width: 18px;\"></i>Next Safety Plan Info.\r" +
    "\n" +
    "              </button>\r" +
    "\n" +
    "            </div><br>\r" +
    "\n" +
    "            <textarea class=\"col-md-12 enterDataBox\" rows=\"4\" style=\"font-weight:normal;\" type=\"text\" ng-required=\"true\" ng-model=\"spText\" name=\"safetyPlanTxt\" ng-class=\"{enterDataDirty: enterWdgtForm.safetyPlanTxt.$dirty && enterWdgtForm.safetyPlanTxt.$valid}\" ng-change=\"enterDataChanged()\" id=\"spText\" maxlength=\"128\" title=\"Safety Plan Information\"></textarea>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"col-md-6\" \r" +
    "\n" +
    "          ng-attr-title=\"{{data.SafetyPlan_SPANImport[spSpanIndex].DateSafetyPlanCompletedOrUpdated | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "          <label style=\"font-weight:normal\">VistA Records:</label>\r" +
    "\n" +
    "          <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "            <button type=\"button\" name=\"spSpanBack\" title=\"Previous Safety Plan VistA Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"spSpanIndex >= data.SafetyPlan_SPANImport.length-1\" ng-click=\"goSpSpanBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>Previous Safety Plan VistA Info.\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "            <div class=\"pull-left\">\r" +
    "\n" +
    "              <input title=\"Safety Plan VistA: Jump To Record\" type=\"text\" ng-keypress=\"jumpTo($event,'spspan')\" class=\"enterDataNumInput\" ng-model=\"spSpanIndex\"></input>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <button type=\"button\" name=\"spSpanFwd\" title=\"Next Safety Plan VistA Info.\" class=\"btn btn-default pull-left\" ng-disabled=\"spSpanIndex === 0\" ng-click=\"goSpSpanForward()\"><i class=\"glyphicon glyphicon-arrow-right\" style=\"font-size:13px;width: 18px;\"></i>Next Safety Plan VistA Info.\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"col-md-12 enterDataBox\" style=\"background-color:#e6e6e6;\">\r" +
    "\n" +
    "            <label style=\"font-weight:normal\">Safety Plan Current: {{data.SafetyPlan_SPANImport[spSpanIndex].SafetyPlanCurrent}}</label><br/>    \r" +
    "\n" +
    "            <label style=\"font-weight:normal\">Date Completed/Updated: {{data.SafetyPlan_SPANImport[spSpanIndex].DateSafetyPlanCompletedOrUpdated | date: 'dd-MM-yyyy HH:mma'}}</label>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-md-12 bs-example comment-text\">\r" +
    "\n" +
    "    <label style=\"margin-left:32px;\">General Notes</label>\r" +
    "\n" +
    "     <div class=\"panel-body\">\r" +
    "\n" +
    "       <div class=\"col-md-12\" ng-attr-title=\"{{data.GeneralComments[commentIndex].EntryDate | date:'MM/dd/yyyy @ h:mma'}}\">\r" +
    "\n" +
    "         <div class=\"btn-group btn-group-xs pull-right\" role=\"group\" aria-label=\"Buttons\">\r" +
    "\n" +
    "          <button type=\"button\" name=\"commentBack\" title=\"Previous Comments\" class=\"btn btn-default pull-left\" ng-disabled=\"commentIndex >= data.GeneralComments.length-1\" ng-click=\"goCommentBack()\"><i class=\"glyphicon glyphicon-arrow-left\" style=\"font-size:13px;width: 18px;\"></i>Previous Comments\r" +
    "\n" +
    "          </button>\r" +
    "\n" +
    "          <div class=\"pull-left\">\r" +
    "\n" +
    "            <input title=\"Comments: Jump To Record\" type=\"text\" ng-keypress=\"jumpTo($event,'comment')\" class=\"enterDataNumInput\" ng-model=\"commentIndex\"></input>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <button type=\"button\" name=\"commentFwd\" title=\"Next Comments\" class=\"btn btn-default pull-left\" ng-disabled=\"commentIndex === 0\" ng-click=\"goCommentForward()\"><i class=\"glyphicon glyphicon-arrow-right\" style=\"font-size:13px;width: 18px;\"></i>Next Comments\r" +
    "\n" +
    "          </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <textarea class=\"col-md-12 enterDataBox\" rows=\"4\" style=\"font-weight:normal;\" type=\"text\" ng-required=\"true\" ng-model=\"commentText\" name=\"commentTxt\" ng-class=\"{enterDataDirty: enterWdgtForm.commentTxt.$dirty && enterWdgtForm.commentTxt.$valid}\" ng-change=\"enterDataChanged()\" id=\"commentText\" title=\"General Notes\"></textarea>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "  <div class=\"col-md-6\" style=\"float:right;\">\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"addNewData()\" style=\"float:right;margin:5px;\">Add Data</button>\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"clearEdits()\" style=\"float:right;margin:5px;\">Clear Edits</button>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
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
    "    <table id=\"tblPatient\" datatable=\"\" dt-options=\"dtOptions\" dt-columns=\"dtColumns\" dt-instance=\"dtInstance\" class=\"row-border hover\" style=\"width:100%\">\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div> \r" +
    "\n"
  );

  $templateCache.put("client/components/widget/widgets/patientTable/removePatientModal.html",
    "<div>\r" +
    "\n" +
    "    <div class=\"modal-header\">\r" +
    "\n" +
    "        <h2 class=\"modal-title\">Are you sure you want to remove {{name}} from the Dashboard?</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-body\">\r" +
    "\n" +
    "\t    <div class=\"row\">\r" +
    "\n" +
    "\t\t    <div class=\"col-md-12\">\r" +
    "\n" +
    "\t\t    \t<div>\r" +
    "\n" +
    "\t\t    \t\tAre you sure you want to remove Veteran XYZ from your Dashboard? \r" +
    "\n" +
    "\t\t\t\t\t<br/>\r" +
    "\n" +
    "\t\t\t\t\t<br/>\r" +
    "\n" +
    "\t\t    \t\tIf so, please leave a comment below explaining why the individual no longer needs outreach services. Selecting the ‘Save’ button below will add your comment to the Data Entry Widget and remove this Veteran from your Dashboard.\r" +
    "\n" +
    "\t\t\t\t\t<hr>\r" +
    "\n" +
    "\t\t    \t</div>\r" +
    "\n" +
    "\t\t    </div>\r" +
    "\n" +
    "\t    </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "        \t<div class=\"col-md-1\">\r" +
    "\n" +
    "        \t\t<input type=\"checkbox\" />\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        \t<div class=\"col-md-5\">\r" +
    "\n" +
    "        \t\t<label>Deceased</label>\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        \t<div class=\"col-md-1\">\r" +
    "\n" +
    "        \t\t<input type=\"checkbox\" />\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        \t<div class=\"col-md-5\">\r" +
    "\n" +
    "        \t\t<label>Refused Services</label>\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "        \t<div class=\"col-md-1\">\r" +
    "\n" +
    "        \t\t<input type=\"checkbox\" />\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        \t<div class=\"col-md-5\">\r" +
    "\n" +
    "        \t\t<label>Clinically not at risk</label>\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        \t<div class=\"col-md-1\">\r" +
    "\n" +
    "        \t\t<input type=\"checkbox\" />\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        \t<div class=\"col-md-5\">\r" +
    "\n" +
    "        \t\t<label>Cannot contact</label>\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "        \t<div class=\"col-md-1\">\r" +
    "\n" +
    "        \t\t<input type=\"checkbox\" />\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        \t<div class=\"col-md-5\">\r" +
    "\n" +
    "        \t\t<label>Care from community provider</label>\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        \t<div class=\"col-md-1\">\r" +
    "\n" +
    "        \t\t<input type=\"checkbox\" />\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        \t<div class=\"col-md-5\">\r" +
    "\n" +
    "        \t\t<label>Other(Please Explain)</label>\r" +
    "\n" +
    "        \t</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-md-12\">\r" +
    "\n" +
    "                <label>Comments:</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-md-11\">\r" +
    "\n" +
    "                <textarea rows=\"4\" style=\"width:100%;\"></textarea>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\r" +
    "\n" +
    "        <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>\r" +
    "\n" +
    "    </div>\r" +
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

  $templateCache.put("client/components/widget/widgets/predictionChart/predictionChart.html",
    "<div class=\"prediction-chart\" style=\"height:90%;width:100%;\">\r" +
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
    "            yAxisLabel=\"Number of Attempts\"\r" +
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
    "            tooltips=\"true\"\r" +
    "\n" +
    "            margin=\"{left:75, bottom:75}\">\r" +
    "\n" +
    "    </nvd3-line-chart>\r" +
    "\n" +
    "    <p style=\"margin:20px\">\r" +
    "\n" +
    "    The Attempt Prediction chart shows the historical number of suicide attempts at a facility based on SPAN data. Using a statistical algorithm, the chart also shows the predicted number of attempts for the next three months. Please see the User Manual for more details. \r" +
    "\n" +
    "    </p>\r" +
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
