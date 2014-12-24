'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('perceptiveReachApp'));

  var MainCtrl,
      scope,
      facilitiesCount,
      riskByState,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    facilitiesCount = $httpBackend.expectGET('/api/facilitiesStateCount')
      .respond([{"State":"AK","Total":1},{"State":"AL","Total":4},{"State":"AR","Total":3},{"State":"AZ","Total":3},{"State":"CA","Total":8},{"State":"ce","Total":1},{"State":"CO","Total":2},{"State":"CT","Total":1},{"State":"DC","Total":1},{"State":"DE","Total":1},{"State":"FL","Total":7},{"State":"GA","Total":3},{"State":"HI","Total":1},{"State":"IA","Total":3},{"State":"ID","Total":1},{"State":"IL","Total":6},{"State":"IN","Total":3},{"State":"KS","Total":2},{"State":"KY","Total":2},{"State":"LA","Total":3},{"State":"LL","Total":2},{"State":"MA","Total":3},{"State":"MD","Total":1},{"State":"ME","Total":1},{"State":"MI","Total":5},{"State":"MN","Total":2},{"State":"MO","Total":5},{"State":"MS","Total":2},{"State":"MT","Total":1},{"State":"NC","Total":4},{"State":"ND","Total":1},{"State":"NE","Total":2},{"State":"NH","Total":1},{"State":"NJ","Total":1},{"State":"NM","Total":1},{"State":"NV","Total":2},{"State":"NY","Total":12},{"State":"OH","Total":5},{"State":"OK","Total":2},{"State":"OR","Total":3},{"State":"PA","Total":8},{"State":"PI","Total":1},{"State":"PR","Total":1},{"State":"RI","Total":1},{"State":"SC","Total":2},{"State":"SD","Total":2},{"State":"TN","Total":4},{"State":"TX","Total":8},{"State":"UT","Total":1},{"State":"VA","Total":3},{"State":"VT","Total":1},{"State":"WA","Total":4},{"State":"WI","Total":3},{"State":"WN","Total":1},{"State":"WV","Total":4},{"State":"WY","Total":2}]);
    riskByState = $httpBackend.expectGET('/api/totalRiskByState')
      .respond([{"TotalHighRisk_National":20000,"PTSD":4946,"PTSD_PCT":24.73,"SubstanceAbuseHistory":7957,"SubstanceAbuseHistory_PCT":39.785,"Hospitilized":2035,"Hospitilized_PCT":10.175,"PreviousAttempts":1035,"PreviousAttempts_PCT":5.175,"DiagnosedTBI":4000,"DiagnosedTBI_PCT":20}]);
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));
  
  it('Verify Map is loaded', function () {
    /*$httpBackend.expectGET('http://localhost:3000/FacilitiesStateCount')
      .respond([{"State":"AK","Total":1},{"State":"AL","Total":4},{"State":"AR","Total":3},{"State":"AZ","Total":3},{"State":"CA","Total":8},{"State":"ce","Total":1},{"State":"CO","Total":2},{"State":"CT","Total":1},{"State":"DC","Total":1},{"State":"DE","Total":1},{"State":"FL","Total":7},{"State":"GA","Total":3},{"State":"HI","Total":1},{"State":"IA","Total":3},{"State":"ID","Total":1},{"State":"IL","Total":6},{"State":"IN","Total":3},{"State":"KS","Total":2},{"State":"KY","Total":2},{"State":"LA","Total":3},{"State":"LL","Total":2},{"State":"MA","Total":3},{"State":"MD","Total":1},{"State":"ME","Total":1},{"State":"MI","Total":5},{"State":"MN","Total":2},{"State":"MO","Total":5},{"State":"MS","Total":2},{"State":"MT","Total":1},{"State":"NC","Total":4},{"State":"ND","Total":1},{"State":"NE","Total":2},{"State":"NH","Total":1},{"State":"NJ","Total":1},{"State":"NM","Total":1},{"State":"NV","Total":2},{"State":"NY","Total":12},{"State":"OH","Total":5},{"State":"OK","Total":2},{"State":"OR","Total":3},{"State":"PA","Total":8},{"State":"PI","Total":1},{"State":"PR","Total":1},{"State":"RI","Total":1},{"State":"SC","Total":2},{"State":"SD","Total":2},{"State":"TN","Total":4},{"State":"TX","Total":8},{"State":"UT","Total":1},{"State":"VA","Total":3},{"State":"VT","Total":1},{"State":"WA","Total":4},{"State":"WI","Total":3},{"State":"WN","Total":1},{"State":"WV","Total":4},{"State":"WY","Total":2}]);
    */
    $httpBackend.flush();
    scope.setupMap(facilitiesCount);

    expect($('#map').html() == '').toBe(false);
    //expect(scope.setupMap(facilitiesCount)).toBe(true);
    //expect(scope.awesomeThings.length).toBe(4);
  });

  it('Verify data table loaded', function () {
     /*riskByState =  $httpBackend.expectGET('http://localhost:3000/totalRiskByState')
      .respond([{"TotalHighRisk_National":20000,"PTSD":4946,"PTSD_PCT":24.73,"SubstanceAbuseHistory":7957,"SubstanceAbuseHistory_PCT":39.785,"Hospitilized":2035,"Hospitilized_PCT":10.175,"PreviousAttempts":1035,"PreviousAttempts_PCT":5.175,"DiagnosedTBI":4000,"DiagnosedTBI_PCT":20}]);
*/
    $httpBackend.flush();
    scope.setupRiskDataTable(riskByState);
    expect($('#exampleNational').html() == '').toBe(false);
    //expect(scope.awesomeThings.length).toBe(4);
  });

 it('Verify attached a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });

});
