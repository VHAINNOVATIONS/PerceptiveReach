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
  console.log("----MedicationDataAPI");
  var data = '[{"ReachID": 1, "Active": 1, "RxID": 1, "Name": "Zoloft", "Dosage": "100mg"}, {"ReachID": 1, "Active": 0, "RxID": 2, "Name": "Xanax","Dosage": "200mg"}, {"ReachID": 1, "Active": 1, "RxID": 3, "Name": "Prednisone","Dosage": "300mg"}, {"ReachID": 1, "Active": 1, "RxID": 4, "Name": "Ambien","Dosage": "400mg"}, {"ReachID": 1, "Active": 0, "RxID": 5, "Name": "Tramadol","Dosage": "500mg"}, {"ReachID": 1, "Active": 0, "RxID": 6, "Name": "Nucynta","Dosage": "500mg"}]';

  res.send(JSON.parse(data));
};