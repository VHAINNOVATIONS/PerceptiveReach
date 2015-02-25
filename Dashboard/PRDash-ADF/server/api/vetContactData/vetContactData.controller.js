/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  res.header("content-type: application/json");

  var data ='{"firstName" : "Jane", "lastName" : "Smith", "ssn" : "6273", "phone" : "5559876543", "altPhone" : "5558765432", "address" : "234 Pleasant St. Apt.456", "city" : "New York", "state" : "New York", "zipCode" : "11011"}';

  res.send(JSON.parse(data));
};