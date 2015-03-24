'use strict';

angular.module('app')
  .factory('widgetDefinitions', function(RandomDataModel,RandomTopNDataModel, RandomTimeSeriesDataModel,
                                    RandomMinutesDataModel, RandomNVD3TimeSeriesDataModel, 
                                    RandomMetricsTimeSeriesDataModel, TotalRisksDataModel,
                                    ContactBaseDataModel, ContactEmergencyDataModel, VeteranRosterDataModel,
                                    PatientFlagDataModel, MedicationDataModel, ClinicalDecisionSupportDataModel,
                                    AppointmentDataModel) {
    return [
      {
        name: 'time',
        directive: 'wt-time',
        style: {
          width: '33%'
        }
      },
      {
        name: 'random',
        directive: 'wt-random',
        style: {
          width: '33%'
        }
      },
      {
        name: 'datamodel',
        directive: 'wt-scope-watch',
        dataModelType: RandomDataModel,
        attrs: {
          value: 'randomValue'
        },
        style: {
          width: '34%'
        }
      },
      {
        name: 'piechart',
        directive: 'wt-pie-chart',
        dataAttrName: 'data',
        dataModelType: TotalRisksDataModel,
        title: 'Total Risks by VAMC',
        dataModelOptions: {
          vamc: 1
        },
        style: {
          width: '25%'
        }
      },
      {
        name: 'ClinicalDecisionSupport',
        directive: 'wt-clinical-decision-support',
        dataAttrName: 'data',
        dataModelType: ClinicalDecisionSupportDataModel,
        title: 'Clinical Decision Support',
        dataModelOptions: {
          riskLevel: 1,
          guidelineType: 'SRB'
        },
        style: {
          width: '45%'
        }
      },
      {
        name: 'RosterTable',
        directive: 'wt-veteran-roster-table',
        settingsModalOptions: {
        templateUrl: 'client/components/widget/widgets/veteranRosterTable/veteranRosterTableWidgetSettingsTemplate.html',
        controller: 'VeteranRosterTableWidgetSettingsCtrl'
        },
        /*onSettingsClose: function(resultFromModal, widgetModel, dashboardScope) {
          // do something to update widgetModel, like the default implementation:
          jQuery.extend(true, widget, result);
        },
        onSettingsDismiss: function(reasonForDismissal, dashboardScope) {
          // probably do nothing here, since the user pressed cancel
        },*/
        dataAttrName: 'data',
        dataModelType: VeteranRosterDataModel,
        title: 'Veteran Roster by VAMC',
        dataModelOptions: {
          vamc: 1
        },
        style: {
          width: '55%'
        }
      },
      {
        name: 'patientFlags',
        directive: 'wt-patient-flags',
        dataAttrName: 'data',
        title: 'Patient Flags',
        dataModelType: PatientFlagDataModel,
        size: {
          width: '30%',
          height: '250px'
        }
      },
      {
        name: 'medication',
        directive: 'wt-medication',
        dataAttrName: 'data',
        title: 'Medication',
        dataModelType: MedicationDataModel,
        size: {
          width: '20%',
          height: '250px'
        }
      },
      {
        name: 'appointment',
        directive: 'wt-appointment',
        dataAttrName: 'data',
        title: 'Appointment',
        dataModelType: AppointmentDataModel,
        size: {
          width: '25%',
          height: '250px'
        }
      },
      {
        name: 'appointmentUI',
        directive: 'wt-appointment-u-i',
        dataAttrName: 'data',
        title: 'AppointmentUI',
        dataModelType: AppointmentDataModel,
        size: {
          width: '25%',
          height: '250px'
        }
      },
      {
        name: 'contact',
        directive: 'wt-contact',
        dataAttrName: 'data',
        dataModelType: ContactBaseDataModel,
        title: 'Veteran Contact',
        size: {
          width: '25%',
          height: '250px'
        }
      },
      {
        name: 'emergency',
        directive: 'wt-emergency-contact',
        dataAttrName: 'data',
        dataModelType: ContactEmergencyDataModel,
        title: 'Emergency Contact Information',
        dataModelOptions: {
          reachID: 16
        },
        size: {
          width: '25%',
          height: '250px'
        }
      },
      {
        name: 'Metrics Chart',
        directive: 'wt-metrics-chart',
        dataAttrName: 'data',
        dataModelType: RandomMetricsTimeSeriesDataModel,
        style: {
          width: '50%'
        }
      },
      {
        name: 'NVD3 Line Chart',
        directive: 'wt-nvd3-line-chart',
        dataAttrName: 'data',
        dataModelType: RandomNVD3TimeSeriesDataModel,
        dataModelArgs: {
          rate: 40
        },
        attrs: {
          'show-time-range': true
        },
        style: {
          width: '50%'
        }
      },
      {
        name: 'Line Chart',
        directive: 'wt-line-chart',
        dataAttrName: 'chart',
        dataModelType: RandomTimeSeriesDataModel,
        style: {
          width: '50%'
        }
      },
      {
        name: 'Bar Chart',
        directive: 'wt-bar-chart',
        dataAttrName: 'data',
        dataModelType: RandomMinutesDataModel,
        dataModelArgs: {
          limit: 1000
        },
        style: {
          width: '50%'
        }
      },
      {
        name: 'topN',
        directive: 'wt-top-n',
        dataAttrName: 'data',
        dataModelType: RandomTopNDataModel
      },
      {
        name: 'gauge',
        directive: 'wt-gauge',
        attrs: {
          value: 'percentage'
        },
        style: {
          width: '250px'
        }
      }, 
      {
        name: 'fluid',
        directive: 'wt-fluid',
        size: {
          width: '50%',
          height: '250px'
        }
      }
    ];
  })
  .value('defaultWidgets', [
      {name: 'medication'},
      {name: 'appointment'},
      {name: 'appointmentUI'},
      {name: 'patientFlags'},
      { name: 'contact' },
      { name: 'emergency' }, 
      { name: 'ClinicalDecisionSupport' }, 
      { name: 'RosterTable' }
      /*,
      { name: 'Metrics Chart' },
      { name: 'NVD3 Line Chart' },
      { name: 'Line Chart' },
      { name: 'Bar Chart' },
      { name: 'topN' },
      { name: 'gauge' },
      { name: 'fluid' } 
    { name: 'random' },
    { name: 'time' },
    { name: 'datamodel' },
    {
      name: 'random',
      style: {
        width: '50%'
      }
    },
    {
      name: 'time',
      style: {
        width: '50%'
      }
    }*/
  ])
  .controller('DemoCtrl', function ($scope, $interval, $window, widgetDefinitions, defaultWidgets) {
    
    $scope.dashboardOptions = {
      widgetButtons: true,
      widgetDefinitions: widgetDefinitions,
      defaultWidgets: defaultWidgets,
      storage: $window.localStorage,
      storageId: 'demo_simple'
    };

    // random scope value
    $scope.randomValue = Math.random();
    $interval(function () {
      $scope.randomValue = Math.random();
    }, 500);

    // percentage (gauge widget, progressbar widget)
    $scope.percentage = 5;
    $interval(function () {
      $scope.percentage = ($scope.percentage + 10) % 100;
    }, 1000);

    // line chart widget
    $interval(function () {
      $scope.topN = _.map(_.range(0, 10), function (index) {
        return {
          name: 'item' + index,
          value: Math.floor(Math.random() * 100)
        };
      });
    }, 500);

  });

