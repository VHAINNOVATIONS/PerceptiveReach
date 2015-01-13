'use strict';

describe('Controller: WidgetCtrl', function () {

  // load the controller's module
  beforeEach(module('perceptiveReachApp'));

  var WidgetCtrl,
      scope,
      totalRiskbyVAMC,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    totalRiskbyVAMC = $httpBackend.expectGET('/api/totalRiskbyVAMC?id=1')
      .respond([{"key":"RISKS","values":[["PTSD",245],["Substance Abuse",439],["Hospitilized",125],["Previous Attempts",49],["Diagnosed TBI",259]]}]);
    scope = $rootScope.$new();
    WidgetCtrl = $controller('WidgetCtrl', {
      $scope: scope
    });
  }));
  
  it('Verify Bar Chart Widget is loaded', function () {
    
    $httpBackend.flush();
    //scope.setupMap(totalRiskbyVAMC);

    expect($('#nv-discreteBarWithAxes').html() == '').toBe(false);
    //expect(scope.totalRiskbyVAMC.length).toBe(2);
    //expect(scope.totalRiskbyVAMC.values.length).toBe(5);
  });

  it('Verify Pie Chart Widget is loaded', function () {
     /*riskByState =  $httpBackend.expectGET('http://localhost:3000/totalRiskByState')
      .respond([{"TotalHighRisk_National":20000,"PTSD":4946,"PTSD_PCT":24.73,"SubstanceAbuseHistory":7957,"SubstanceAbuseHistory_PCT":39.785,"Hospitilized":2035,"Hospitilized_PCT":10.175,"PreviousAttempts":1035,"PreviousAttempts_PCT":5.175,"DiagnosedTBI":4000,"DiagnosedTBI_PCT":20}]);
*/
    $httpBackend.flush();
    expect($('#nv-pieChart').html() == '').toBe(false);
  });

 /*it('Verify attached a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });*/

});