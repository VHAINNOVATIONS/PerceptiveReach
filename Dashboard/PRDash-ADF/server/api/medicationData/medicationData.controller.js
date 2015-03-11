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

// When the Real API get's implemented remove all lines between //removeBegin & //removeEnd

//removeBegin
var fs = require('fs');
var path = require('path');
var filePath = path.normalize('server/api/medicationData/');
var fileName = "medication.json";
//removeEnd

// Get list of things
exports.index = function(req, res) {
  res.header("content-type: application/json");
  //console.log("----MedicationDataAPI");

//removeBegin
  var data = fs.readFileSync(filePath + fileName, 'utf8');
  res.send(JSON.parse(data));
//removeEnd

//Begin Real SQL Server API Code


//End Real SQL Server API Code
};