'use strict';

describe('Controller: WidgetCtrl', function () {

  // load the controller's module
  beforeEach(module('perceptiveReachApp'));

  var WidgtCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    WidgetCtrl = $controller('WidgetCtrl', {
      $scope: scope
    });
  }));
  
  /*it('Verify Map is loaded', function () {
    
    $httpBackend.flush();
    scope.setupMap(facilitiesCount);

    expect($('#map').html() == '').toBe(false);
    //expect(scope.setupMap(facilitiesCount)).toBe(true);
    //expect(scope.awesomeThings.length).toBe(4);
  });*/

  //it('Verify data table loaded', function () {
     /*riskByState =  $httpBackend.expectGET('http://localhost:3000/totalRiskByState')
      .respond([{"TotalHighRisk_National":20000,"PTSD":4946,"PTSD_PCT":24.73,"SubstanceAbuseHistory":7957,"SubstanceAbuseHistory_PCT":39.785,"Hospitilized":2035,"Hospitilized_PCT":10.175,"PreviousAttempts":1035,"PreviousAttempts_PCT":5.175,"DiagnosedTBI":4000,"DiagnosedTBI_PCT":20}]);
*/
    //$httpBackend.flush();
   // scope.setupRiskDataTable(riskByState);
    //($('#exampleNational').html() == '').toBe(false);
    //expect(scope.awesomeThings.length).toBe(4);
  //});

 /*it('Verify attached a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });*/

});
