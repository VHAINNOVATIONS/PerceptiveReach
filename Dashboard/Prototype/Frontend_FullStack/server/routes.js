/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/charts/score', require('./api/charts/score'));
  app.use('/api/charts/branch', require('./api/charts/branch'));
  app.use('/api/charts/attempts', require('./api/charts/attempts'));
  app.use('/api/charts/vetsByState', require('./api/charts/vetsByState'));    
    
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
