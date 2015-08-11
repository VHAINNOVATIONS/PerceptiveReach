'use strict';

angular.module('app')
  .factory('widgetDefinitions', function(RandomDataModel,RandomTopNDataModel, RandomTimeSeriesDataModel,
                                    RandomMinutesDataModel, RandomNVD3TimeSeriesDataModel, 
                                    RandomMetricsTimeSeriesDataModel, TotalRisksDataModel,
                                    ContactBaseDataModel, EmergencyContactDataModel, PatientDataModel,
                                    PatientFlagDataModel, MedicationDataModel, ClinicalDecisionSupportDataModel,
                                    AppointmentDataModel, DiagnosesDataModel, SuicideStatisticsDataModel,NationalAgeGroupsDataModel, NationalGenderDistributionDataModel,NationalMilitaryBranchDataModel, NationalOutReachStatusDataModel,NationalTopMidRiskDataModel, NationalVAMCDataModel, FacilityDataModel /*, NationalCombatEraDataModel, NationalCurrentSafetyDataModel,NationalHighRiskFlagDataModel, NationalPTSDMDDSUDDataModel,NationalVAClinicTwelveMonthsModel,*/ 
									) {
    return [
      {
        name: 'time',
        directive: 'wt-time',
        dataModelOptions: {
          defaultWidget: false,
          layout: 'all'
        },
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
          vamc: 1,
          defaultWidget: false,
          layout: 'facility'
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
          defaultWidget: true,
          layout: 'individual',
          guidelineType: 'SRB'
        },
        style: {
          width: '45%'
        }
      },
      {
        name: 'RosterTable',
        directive: 'wt-patient-roster-table',
        dataAttrName: 'data',
        dataModelType: PatientDataModel,
        title: 'Patient Roster by VAMC',
        dataModelOptions: {
          defaultWidget: true,
          layout: 'individual',
          vamc: 1
        },
        style: {
          width: '55%'
        }
      },
      {
        name: 'FacilityTable',
        directive: 'wt-Facility-Roster',
        dataAttrName: 'data',
        dataModelType: FacilityDataModel,
        title: 'Facility Roster by VAMC',
        dataModelOptions: {
          defaultWidget: true,
          layout: 'facility',
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
        dataModelOptions: {
          defaultWidget: true,
          layout: 'individual'
        },
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
        dataModelOptions: {
          defaultWidget: true,
          layout: 'individual'
        },
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
        dataModelOptions: {
          defaultWidget: true,
          layout: 'individual'
        },
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
        dataModelOptions: {
          defaultWidget: true,
          layout: 'individual'
        },
        size: {
          //width: '25%',
          height: '350px'
        }
      },
	  {
        name: 'ExternalSuicideStatistics',
        directive: 'wt-external-suicide-statistics',
        dataAttrName: 'data',
        title: 'External Data HealthIndicators.gov Suicide Statistics',
        dataModelType: SuicideStatisticsDataModel,
        dataModelOptions: {
          defaultWidget: true,
          layout: 'national'
        },
        size: {
          width: '45%',
          height: '485px'
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
        },
        dataModelOptions: {
          defaultWidget: true,
          layout: 'national'
        }
        //}
      },

	  {
        name: 'NationalGenderDistribution',
        directive: 'wt-national-gender-distribution',
        dataAttrName: 'data',
        title: 'National Gender Distribution Data',
        dataModelType: NationalGenderDistributionDataModel,
        dataModelOptions: {
          defaultWidget: true,
          layout: 'national'
        },
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
        dataModelOptions: {
          defaultWidget: true,
          layout: 'national'
        },
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
        dataModelOptions: {
          defaultWidget: true,
          layout: 'national'
        },
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
        dataModelOptions: {
          defaultWidget: true,
          layout: 'national'
        },
        size: {
          width: '35%',
          height: '200px'
        }
      },
	  {
        name: 'NationalVamc',
        directive: 'wt-national-vamc',
        dataAttrName: 'data',
        title: 'National VAMC Data',
        dataModelType: NationalVAMCDataModel,
        dataModelOptions: {
          defaultWidget: true,
          layout: 'national'
        },
        size: {
          width: '35%',
          height: '350px'
        }
      },
      /*
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
        dataModelOptions: {
          defaultWidget: true,
          layout: 'individual'
        },
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
          defaultWidget: true,
          layout: 'individual',
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
        dataModelOptions: {
          defaultWidget: false,
          layout: 'all'
        },
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
        dataModelOptions: {
          defaultWidget: false,
          layout: 'all'
        },
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
  .factory('DefaultWidgetService', function(){

  return {
    getDefaultWidgetsObj: function(widgetDefinitions)
    {
        var defaultWidgetsObj = {};
        var nationalViewDefault = [];
        var stateVISNViewDefault = [];
        var facilityViewDefault = [];
        var individualViewDefault = [];
        
        var widget = null;
        for(var widgetIdx in widgetDefinitions){
          widget = widgetDefinitions[widgetIdx];
          if(widget.dataModelOptions.defaultWidget)
            if(widget.dataModelOptions.layout == "national"){
              nationalViewDefault.push({name: widget.name});
            }
            else if(widget.dataModelOptions.layout == "stateVISN"){
              stateVISNViewDefault.push({name: widget.name});
            }
            else if(widget.dataModelOptions.layout == "facility"){
              facilityViewDefault.push({name: widget.name});
            }
            else if(widget.dataModelOptions.layout == "individual"){
              individualViewDefault.push({name: widget.name});
            }            
        }
        defaultWidgetsObj.national = nationalViewDefault;
        defaultWidgetsObj.stateVISN = stateVISNViewDefault;
        defaultWidgetsObj.facility = facilityViewDefault;
        defaultWidgetsObj.individual = individualViewDefault;         

        return defaultWidgetsObj;
    },

    getAllWidgetsObj: function(widgetDefinitions)
    {
        var widgetsObj = {};
        var nationalView = [];
        var stateVISNView = [];
        var facilityView = [];
        var individualView = [];
        var allViews = widgetDefinitions;
        
        var widget = null;
        for(var widgetIdx in widgetDefinitions){
          widget = widgetDefinitions[widgetIdx];
          if(widget.dataModelOptions.layout == "national"){
            nationalView.push(widget);
          }
          else if(widget.dataModelOptions.layout == "stateVISN"){
            stateVISNView.push(widget);
          }
          else if(widget.dataModelOptions.layout == "facility"){
            facilityView.push(widget);
          }
          else if(widget.dataModelOptions.layout == "individual"){
            individualView.push(widget);
          }
          else if(widget.dataModelOptions.layout == "all"){
            nationalView.push(widget);
            stateVISNView.push(widget);
            facilityView.push(widget);
            individualView.push(widget);
          }            
        }
        widgetsObj.national = nationalView;
        widgetsObj.stateVISN = stateVISNView;
        widgetsObj.facility = facilityView;
        widgetsObj.individual = individualView; 
        widgetsObj.allViews = allViews;        

        return widgetsObj;
    },

    getAllDefaultWidgets: function(widgetDefinitions)
    {
        var defaultWidgets = [];        
        var widget = null;
        for(var widgetIdx in widgetDefinitions){
          widget = widget = widgetDefinitions[widgetIdx];
          if(widget.dataModelOptions.defaultWidget){
             defaultWidgets.push({name: widget.name}); 
          }
        }
        return defaultWidgets;
    }
  }})
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

