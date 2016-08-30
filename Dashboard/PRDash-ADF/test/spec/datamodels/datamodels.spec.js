/* Perceptive Reach Testing */

describe('PerceptiveReach DataModels', function () {

  // load the service's module
  beforeEach(module('ui.dashboard'));
  beforeEach(module('ui.models'));
  var scope;

  	describe('PerceptiveReach MedicationDataModel', function () {

	  // instantiate service
	  var MedicationDataModel, m, widget, scope, ctrl, $httpBackend;

      beforeEach(inject(function (_MedicationDataModel_, $rootScope) {
	    MedicationDataModel = _MedicationDataModel_;
    	m = new MedicationDataModel();
    	widget = {
  	  	  dataAttrName: 'data',
      	  dataModelOptions: { reachID: 16 }
    	};
    	scope = $rootScope.$new();

    	// Not sure if we can test a mock http from within a factory
    	/* if so add the following to the inject , _$httpBackend_, $rootScope, $controller
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/api/medicationData').
		  respond([{"ReachID": 1,"Active": 1,"RxID": 1,"Name": "Prescription 1","Dosage": "100mg"}]);

		scope = $rootScope.$new();
		ctrl = $controller('DashboardWidgetCtrl', {$scope: scope});
		console.log('TEST: MedicationDataModel Scope: '+scope);
		*/
  	  }));


	  describe('setup method', function() {
	    it('should set dataModelOptions and widgetScope from args', function() {
	      m.setup(widget, scope);
	      expect(m.dataModelOptions).toEqual(widget.dataModelOptions);
	      expect(m.widgetScope).toEqual(scope);
	    });

	  });

	  describe('getData method', function() {
	    it('check the existence of getData method', function() {
	      expect(typeof m.getData).toEqual('function');
	    });

	  });

	  describe('init method', function() {
	    it('check the existence of init method', function() {
	      expect(typeof m.init).toEqual('function');
	    });
	  });

	  describe('destroy method', function() {
	    it('check the existence of init method', function() {
	      expect(typeof m.destroy).toEqual('function');
	    });
	  });
	});

	describe('PerceptiveReach PatientFlagDataModel', function () {

	  // instantiate service
	  var PatientFlagDataModel, m, widget, scope, ctrl, $httpBackend;

      beforeEach(inject(function (_PatientFlagDataModel_, $rootScope) {
	    PatientFlagDataModel = _PatientFlagDataModel_;
    	m = new PatientFlagDataModel();
    	widget = {
  	  	  dataAttrName: 'data',
      	  dataModelOptions: { opt: true }
    	};
    	scope = $rootScope.$new();/*{
    	  fake: 'scope'
    	};*/

    	// Not sure if we can test a mock http from within a factory
    	/* if so add the following to the inject , _$httpBackend_, $rootScope, $controller
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/api/medicationData').
		  respond([{"ReachID": 1,"Active": 1,"RxID": 1,"Name": "Prescription 1","Dosage": "100mg"}]);

		scope = $rootScope.$new();
		ctrl = $controller('DashboardWidgetCtrl', {$scope: scope});
		console.log('TEST: MedicationDataModel Scope: '+scope);
		*/
  	  }));


	  describe('setup method', function() {
	    it('should set dataModelOptions and widgetScope from args', function() {
	      m.setup(widget, scope);
	      expect(m.dataModelOptions).toEqual(widget.dataModelOptions);
	      expect(m.widgetScope).toEqual(scope);
	    });

	  });

	  describe('getData method', function() {
	    it('check the existence of getData method', function() {
	      expect(typeof m.getData).toEqual('function');
	    });

	  });

	  describe('init method', function() {
	    it('check the existence of init method', function() {
	      expect(typeof m.init).toEqual('function');
	    });
	  });

	  describe('destroy method', function() {
	    it('check the existence of init method', function() {
	      expect(typeof m.destroy).toEqual('function');
	    });
	  });
	});

	describe('PerceptiveReach AppointmentDataModel', function () {

	  // instantiate service
	  var AppointmentDataModel, m, widget, scope, ctrl, $httpBackend;

      beforeEach(inject(function (_AppointmentDataModel_, $rootScope) {
	    AppointmentDataModel = _AppointmentDataModel_;
    	m = new AppointmentDataModel();
    	widget = {
  	  	  dataAttrName: 'data',
      	  dataModelOptions: { opt: true }
    	};
    	scope = $rootScope.$new();
    	
  	  }));




	  describe('getData method', function() {
	    it('check the existence of getData method', function() {
	      expect(typeof m.getData).toEqual('function');
	    });

	  });

	  describe('init method', function() {
	    it('check the existence of init method', function() {
	      expect(typeof m.init).toEqual('function');
	    });
	  });

	  describe('destroy method', function() {
	    it('check the existence of init method', function() {
	      expect(typeof m.destroy).toEqual('function');
	    });
	  });
	});
});