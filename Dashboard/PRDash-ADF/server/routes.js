/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

function logger(req,res,next){
  console.log(new Date(), req.method, req.url);
  next();
}

module.exports = function(app) {

  //log everything for now
  app.use(logger);

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/scoreSummaryByVISN', require('./api/scoreSummaryByVISN'));
  app.use('/api/facilitiesStateCount', require('./api/facilitiesStateCount'));
  app.use('/api/veteranDetails', require('./api/veteranDetails'));
  app.use('/api/veteransByVAMC', require('./api/veteransByVAMC'));
  app.use('/api/patient', require('./api/patient'));
  app.use('/api/scoreSummaryByVAMC', require('./api/scoreSummaryByVAMC'));
  app.use('/api/facilitiesByState', require('./api/facilitiesByState'));
  app.use('/api/totalRiskByVAMC', require('./api/totalRiskByVAMC'));
  app.use('/api/totalRiskByVAMCPieChart', require('./api/totalRiskByVAMCPieChart'));
  app.use('/api/totalRiskByState', require('./api/totalRiskByState'));
  app.use('/api/userLogin', require('./api/userLogin'));
  app.use('/api/getRiskFactors', require('./api/getRiskFactors'));
  app.use('/api/getRiskFactorGuidelines', require('./api/getRiskFactorGuidelines'));
  app.use('/api/getListOfVAMC', require('./api/getListOfVAMC'));
  app.use('/api/getListOfOutreachStatus', require('./api/getListOfOutreachStatus'));
  app.use('/api/clinicalDecisionSupport', require('./api/clinicalDecisionSupport'));
  app.use('/api/suicideData', require('./api/suicideData'));

  app.use('/api/patientContact', require('./api/patientContact'));
  app.use('/api/emergencyContact', require('./api/emergencyContact'));
  app.use('/api/patientFlagData', require('./api/patientFlagData'));
  app.use('/api/medicationData', require('./api/medicationData'));
  app.use('/api/diagnosesData', require('./api/diagnosesData'));
  app.use('/api/appointmentData', require('./api/appointmentData'));

  app.use('/api/dashboard', require('./api/dashboard'));

  app.use('/auth', require('./auth'));
  app.use('/api/user', require('./api/user'));
  app.use('/encryption', require('./encryption'));
  
  // All undefined asset or api routes should return a 404
  //app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  // .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + 'index.html');
    });
};
