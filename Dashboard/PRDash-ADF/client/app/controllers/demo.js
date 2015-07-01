'use strict';

angular.module('app')
  .factory('widgetDefinitions', function(RandomDataModel,RandomTopNDataModel, RandomTimeSeriesDataModel,
                                    RandomMinutesDataModel, RandomNVD3TimeSeriesDataModel, 
                                    RandomMetricsTimeSeriesDataModel, TotalRisksDataModel,
                                    ContactBaseDataModel, EmergencyContactDataModel, PatientDataModel,
                                    PatientFlagDataModel, MedicationDataModel, ClinicalDecisionSupportDataModel,
                                    AppointmentDataModel, DiagnosesDataModel, SuicideIndicatorsDataModel,NationalAgeGroupsDataModel, NationalGenderDistributionDataModel,NationalMilitaryBranchDataModel, NationalOutReachStatusDataModel,NationalTopMidRiskDataModel, NationalVAMCDataModel /*, NationalCombatEraDataModel, NationalCurrentSafetyDataModel,NationalHighRiskFlagDataModel, NationalPTSDMDDSUDDataModel,NationalVAClinicTwelveMonthsModel,*/ 
									) {
    return [
      {
        name: 'time',
        directive: 'wt-time',
        style: {
          width: '33%'
        }
      },
      /*{
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
      },*/
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
          //riskLevel: 1,
          guidelineType: 'SRB'
        },
        style: {
          width: '45%'
        }
      },
      {
        name: 'RosterTable',
        directive: 'wt-patient-roster-table',
        settingsModalOptions: {
        templateUrl: 'client/components/widget/widgets/patientTable/patientTableWidgetSettingsTemplate.html',
        controller: 'patientTableWidgetSettingsCtrl'
        },
        /*onSettingsClose: function(resultFromModal, widgetModel, dashboardScope) {
          // do something to update widgetModel, like the default implementation:
          jQuery.extend(true, widget, result);
        },
        onSettingsDismiss: function(reasonForDismissal, dashboardScope) {
          // probably do nothing here, since the user pressed cancel
        },*/
        dataAttrName: 'data',
        dataModelType: PatientDataModel,
        title: 'Patient Roster by VAMC',
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
          width: '25%',
          height: '350px'
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
          height: '350px'
        }
      },
      {
        name: 'appointment',
        directive: 'wt-appointment',
        dataAttrName: 'data',
        title: 'Appointment',
        dataModelType: AppointmentDataModel,
        size: {
          //width: '25%',
          height: '350px'
        }
      },
      {
        name: 'diagnoses',
        directive: 'wt-diagnoses',
        dataAttrName: 'data',
        title: 'Diagnoses',
        dataModelType: DiagnosesDataModel,
        size: {
          //width: '25%',
          height: '350px'
        }
      },
	  {
        name: 'suicideIndicators',
        directive: 'wt-suicide-indicators',
        dataAttrName: 'data',
        title: 'Suicide Indicators',
        dataModelType: SuicideIndicatorsDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'NationalAgeGroups',
        directive: 'wt-national-age-groups',
        dataAttrName: 'data',
        title: 'National Age Groups Data',
        dataModelType: NationalAgeGroupsDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'NationalGenderDistribution',
        directive: 'wt-national-gender-distribution',
        dataAttrName: 'data',
        title: 'National Gender Distribution Data',
        dataModelType: NationalGenderDistributionDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'NationalMilitaryBranch',
        directive: 'wt-national-military-branch',
        dataAttrName: 'data',
        title: 'National Military Branch Data',
        dataModelType: NationalMilitaryBranchDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'NationalOutReachStatus',
        directive: 'wt-national-out-reach-status',
        dataAttrName: 'data',
        title: 'National Outreach Status Data',
        dataModelType: NationalOutReachStatusDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'NationalTopMidRisk',
        directive: 'wt-national-top-mid-risk',
        dataAttrName: 'data',
        title: 'National Top Mid Risk Data',
        dataModelType: NationalTopMidRiskDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'NationalVamc',
        directive: 'wt-national-vamc',
        dataAttrName: 'data',
        title: 'National VAMC Data',
        dataModelType: NationalVAMCDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },/*
	  {
        name: 'nationalCombatEra',
        directive: 'wt-national-combat-era',
        dataAttrName: 'data',
        title: 'National Combat Era Data',
        dataModelType: NationalCombatEraDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'nationalCurrentSafetyPlan',
        directive: 'wt-national-current-safety-plan',
        dataAttrName: 'data',
        title: 'National Current Safety Plan Data',
        dataModelType: NationalCurrentSafetyDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'nationalHighRiskFlag',
        directive: 'wt-national-high-risk-flag',
        dataAttrName: 'data',
        title: 'National High Risk Flag Data',
        dataModelType: NationalHighRiskFlagDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'nationalPtsdMddSud',
        directive: 'wt-national-ptsd-mdd-sud',
        dataAttrName: 'data',
        title: 'National PTSD MDD SUD Data',
        dataModelType: NationalPTSDMDDSUDDataModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },
	  {
        name: 'nationalVAClinicTwelveMonths',
        directive: 'wt-national-va-clinic-twelve-months',
        dataAttrName: 'data',
        title: 'National Visit Data for VA Clinic in Past Twelve Months',
        dataModelType: NationalVAClinicTwelveMonthsModel,
        size: {
          width: '35%',
          height: '350px'
        }
      },*/
	  {
        name: 'contact',
        directive: 'wt-contact',
        dataAttrName: 'data',
        dataModelType: ContactBaseDataModel,
        title: 'Patient Contact',
        size: {
          width: '25%',
          height: '250px'
        }
      },
      {
        name: 'emergency',
        directive: 'wt-emergency-contact',
        dataAttrName: 'data',
        dataModelType: EmergencyContactDataModel,
        title: 'Emergency Contact Information',
        dataModelOptions: {
          reachID: 16
        },
        size: {
          width: '25%',
          height: '250px'
        }
      },
      /*{
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
      },*/
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
      { name: 'RosterTable' }, 
      { name: 'contact' },
      { name: 'emergency' },
      {name: 'diagnoses'},
      {name: 'appointment'},
      { name: 'ClinicalDecisionSupport' },
      {name: 'medication'},
      {name: 'patientFlags'}
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


    // percentage (gauge widget, progressbar widget)
    $scope.percentage = 5;
    $interval(function () {
      $scope.percentage = ($scope.percentage + 10) % 100;
    }, 1000);

  });

