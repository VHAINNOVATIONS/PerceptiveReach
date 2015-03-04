/* Perceptive Reach Testing */

describe('PerceptiveReach DataModels', function () {

  // load the service's module
  beforeEach(module('ui.models'));

  // Test service availability
  it('check the existence of MedicationDataModel', inject(function(MedicationDataModel) {
      expect(MedicationDataModel).toBeDefined();
  }));

  it('check the existence of PatientFlagDataModel', inject(function(PatientFlagDataModel) {
      expect(PatientFlagDataModel).toBeDefined();
  }));

  describe('PerceptiveReach MedicationDataModel', function () {

	  // instantiate service
	  var MedicationDataModel, m, widget, scope;

	  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
	      $httpBackend = _$httpBackend_;
	      $httpBackend.expectGET('/api/medicationData').
	          respond([{"ReachID": 1,"Active": 1,"RxID": 1,"Name": "Prescription 1","Dosage": "100mg"}]);

	      scope = $rootScope.$new();
      }));

	  beforeEach(inject(function (_MedicationDataModel_) {
	    MedicationDataModel = _MedicationDataModel_;
	    m = new MedicationDataModel();
	    widget = {
	      dataModelOptions: { reachID: 16 }
	    };
	    scope = {
	      fake: 'scope'
	    };
	  }));

	  describe('setup method', function() {

	    it('should set dataModelOptions and widgetScope from args', function() {
	      m.setup(widget, scope);
	      expect(m.dataModelOptions).toEqual(widget.dataModelOptions);
	      expect(m.widgetScope).toEqual(scope);
	    });

	  });

	  describe('init method', function() {
	    it('should be an empty (noop) implementation', function() {
	      expect(typeof m.init).toEqual('function');
	      expect(m.init).not.toThrow();
	    });
	  });

	  describe('destroy method', function() {
	    it('should be an empty (noop) implementation', function() {
	      expect(typeof m.destroy).toEqual('function');
	      expect(m.destroy).not.toThrow();
	    });
	  });

  });

});