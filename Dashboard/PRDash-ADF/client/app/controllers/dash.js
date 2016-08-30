'use strict';

angular.module('app')
  .factory('widgetDefinitions', function(RandomDataModel,RandomTopNDataModel, RandomTimeSeriesDataModel,
                                    RandomMinutesDataModel, RandomNVD3TimeSeriesDataModel,
                                    RandomMetricsTimeSeriesDataModel, TotalRisksDataModel,
                                    ContactBaseDataModel, EmergencyContactDataModel, PatientDataModel,
                                    MedicationDataModel, ClinicalDecisionSupportDataModel,
                                    AppointmentDataModel, EnterDataDataModel, DiagnosesDataModel, SuicideStatisticsDataModel,
                                    AgeGroupsMetricsDataModel,GenderDistributionMetricsDataModel, PredictionChartDataModel,
                                    MilitaryBranchMetricsDataModel, OutreachStatusMetricsDataModel,
                                    TopMidRiskMetricsDataModel, VAMCMetricsDataModel, FacilityDataModel,VISNDataModel,
                                    CommunityResourceDataModel,CDSQuestionnaireDataModel
					) {
    return [
      {
        name: 'time',
        directive: 'wt-time',
        dataModelOptions: {
          defaultWidget: false,
          layout: 'all',
          roleAccess: ''
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
        name: 'ClinicalDecisionSupport',
        directive: 'wt-clinical-decision-support',
        dataAttrName: 'data',
        dataModelType: ClinicalDecisionSupportDataModel,
        title: 'What is Perceptive Reach',
        dataModelOptions: {
          //riskLevel: 1,
          defaultWidget: true,
          layout: 'individual',
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          guidelineType: 'SRB'
        },
        sizeX:12,
        sizeY:10
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
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          vamc: 1
        },
        style: {
          width: '55%'
        },
        canClose:false,
        sizeX:18,
        sizeY:10
      },
        {
        name: 'enterdata',
        directive: 'wt-enter-data',
        dataAttrName: 'data',
        dataModelType: EnterDataDataModel,
        title: 'Data Entry',
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          layout: 'individual'
        },
        sizeX:14,
        sizeY:10,
        minSizeX: 14,
        minSizeY: 6
      },

      {
        name: 'contact',
        directive: 'wt-contact',
        dataAttrName: 'data',
        dataModelType: ContactBaseDataModel,
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
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
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          layout: 'individual',
          reachID: 16
        },
        size: {
          width: '25%',
          height: '250px'
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
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          layout: 'individual'
        },
        sizeY:9
      },
      {
        name: 'appointment',
        directive: 'wt-appointment',
        dataAttrName: 'data',
        title: 'Appointment',
        dataModelType: AppointmentDataModel,
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
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
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          layout: 'individual'
        },
        sizeY:9
      },
      {
        name: 'VISNTable',
        directive: 'wt-Vism-Roster',
        dataAttrName: 'data',
        dataModelType: VISNDataModel,
        title: 'VISN Roster',
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM',
          layout: 'surveillance',
          vamc: 1
        },
        sizeX:15,
        sizeY:9,
        canClose:false
      },
      {
        name: 'FacilityTable',
        directive: 'wt-Facility-Roster',
        dataAttrName: 'data',
        dataModelType: FacilityDataModel,
        title: 'Facility Roster',
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM,CCS',
          layout: 'surveillance,facility',
          vamc: 1
        },
        sizeX:15,
        sizeY:9,
        canClose:false
      },

	   {
        name: 'AgeGroups',
        directive: 'wt-national-age-groups',
        dataAttrName: 'data',
        title: 'Age Groups Data',
        dataModelType: AgeGroupsMetricsDataModel,
        sizeY:10,
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          layout: 'surveillance,facility'
        }
        //}
      },
	   {
        name: 'GenderDistribution',
        directive: 'wt-national-gender-distribution',
        dataAttrName: 'data',
        title: 'Gender Distribution Data',
        dataModelType: GenderDistributionMetricsDataModel,
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          layout: 'surveillance,facility'
        },
        sizeY:9
      }, {
        name: 'PredictionChart',
        directive: 'prediction-chart',
        dataAttrName: 'data',
        dataModelType: PredictionChartDataModel,
        title: 'Attempt Prediction Chart',
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM',
          layout: 'surveillance'
        },
        dataModelArgs: {
          rate: 40
        },
        attrs: {
          'show-time-range': true
        },
        style: {
          width: '100%',
          height: '100%'
        },
        sizeX:15,
        sizeY:12
      },
	   {
        name: 'MilitaryBranch',
        directive: 'wt-national-military-branch',
        dataAttrName: 'data',
        title: 'Military Branch Data',
        dataModelType: MilitaryBranchMetricsDataModel,
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          layout: 'surveillance,facility'
        }
      },
	   {
        name: 'OutReachStatus',
        directive: 'wt-national-out-reach-status',
        dataAttrName: 'data',
        title: 'Outreach Status Data',
        dataModelType: OutreachStatusMetricsDataModel,
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM,CCT,CCS',
          layout: 'surveillance,facility'
        },
        sizeY:10
      },
      {
        name: 'CDSQuestionnaire',
        directive: 'wt-cds-questionnaire',
        dataAttrName: 'data',
        title: 'CDS Questionnaire',
        dataModelType: CDSQuestionnaireDataModel,
        dataModelOptions: {
          defaultWidget: true,
          roleAccess: 'SUP,REP,ADM',
          layout: 'individual'
        },
        size: {
          width: '45%',
          height: '485px'
        },
        sizeX:10
      },
      //---------------------------------------------------------------------------------------------
      /*{
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
      },*/

	   /*{
        name: 'NationalVamc',
        directive: 'wt-national-vamc',
        dataAttrName: 'data',
        title: 'National VAMC Data',
        dataModelType: VAMCMetricsDataModel,
        dataModelOptions: {
          defaultWidget: true,
          layout: 'national'
        },
        size: {
          width: '35%',
          height: '350px'
        }
      },*/

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
          roleAccess: '',
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
          roleAccess: '',
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
      {name: 'medication'}
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
    getDefaultWidgetsObj: function(widgetDefinitions, userRole)
    {
        var defaultWidgetsObj = {};
        var surveillanceViewDefault = [];
        var facilityViewDefault = [];
        var individualViewDefault = [];

        var widget = null;
        for(var widgetIdx in widgetDefinitions){
          widget = widgetDefinitions[widgetIdx];
          if(widget.dataModelOptions.defaultWidget)
            if(widget.dataModelOptions.layout.indexOf("surveillance") != -1 && widget.dataModelOptions.roleAccess.indexOf(userRole) != -1){
              surveillanceViewDefault.push({name: widget.name});
            }
            if(widget.dataModelOptions.layout.indexOf("facility") != -1 && widget.dataModelOptions.roleAccess.indexOf(userRole) != -1){
              facilityViewDefault.push({name: widget.name});
            }
            if(widget.dataModelOptions.layout.indexOf("individual") != -1 && widget.dataModelOptions.roleAccess.indexOf(userRole) != -1){
              individualViewDefault.push({name: widget.name});
            }
        }
        defaultWidgetsObj.surveillance = surveillanceViewDefault;
        defaultWidgetsObj.facility = facilityViewDefault;
        defaultWidgetsObj.individual = individualViewDefault;

        return defaultWidgetsObj;
    },

    getAllWidgetsObj: function(widgetDefinitions, userRole)
    {
        var widgetsObj = {};
        var surveillanceView = [];
        var facilityView = [];
        var individualView = [];
        var allViews = widgetDefinitions;

        var widget = null;
        for(var widgetIdx in widgetDefinitions){
          widget = widgetDefinitions[widgetIdx];
          if(widget.dataModelOptions.layout.indexOf("surveillance") != -1 && widget.dataModelOptions.roleAccess.indexOf(userRole) != -1){
            surveillanceView.push(widget);
          }
          if(widget.dataModelOptions.layout.indexOf("facility") != -1 && widget.dataModelOptions.roleAccess.indexOf(userRole) != -1){
            facilityView.push(widget);
          }
          if(widget.dataModelOptions.layout.indexOf("individual") != -1 && widget.dataModelOptions.roleAccess.indexOf(userRole) != -1){
            individualView.push(widget);
          }
          else if(widget.dataModelOptions.layout == "all" && widget.dataModelOptions.roleAccess.indexOf(userRole) != -1){
            surveillanceView.push(widget);
            facilityView.push(widget);
            individualView.push(widget);
          }
        }
        widgetsObj.surveillance = surveillanceView;
        widgetsObj.facility = facilityView;
        widgetsObj.individual = individualView;
        widgetsObj.allViews = allViews;

        return widgetsObj;
    },

    getAllDefaultWidgets: function(widgetDefinitions, userRole)
    {
        var defaultWidgets = [];
        var widget = null;
        for(var widgetIdx in widgetDefinitions){
          widget = widgetDefinitions[widgetIdx];
          if(widget.dataModelOptions.defaultWidget && widget.dataModelOptions.roleAccess.indexOf(userRole) != -1){
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
