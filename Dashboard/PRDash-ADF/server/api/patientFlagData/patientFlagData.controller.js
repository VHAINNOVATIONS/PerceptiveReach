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

  var data = '[{"ReachID": 1, "Catatory": 1, "Active": 1, "FlagID": 1, "FlagDesc": "Suicide High Risk"}, {"ReachID": 1, "Catatory": 1, "Active": 0, "FlagID": 2, "FlagDesc": "Behavioral"}, {"ReachID": 1, "Catatory": 2, "Active": 1, "FlagID": 44, "FlagDesc": "Flag 44"}, {"ReachID": 1, "Catatory": 2, "Active": 0, "FlagID": 33, "FlagDesc": "Flag 33"}, {"ReachID": 1, "Catatory": 2, "Active": 1, "FlagID": 22, "FlagDesc": "Flag 22"}]';

  res.send(JSON.parse(data));
};