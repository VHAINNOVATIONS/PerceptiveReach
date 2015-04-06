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
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');


// Get list of things
exports.index = function(req, res) {
  res.header("content-type: application/json");
  var data = '[{"ReachID": 1, "ICD": "S00.001", "Diagnosis": "Type II Diabetes", "DiagnosisDate": "2015-02-03T00:00:00.000Z"},{"ReachID": 1, "ICD": "S00.002", "Diagnosis": "Thyroiditis", "DiagnosisDate": "2014-12-03T00:00:00.000Z"},{"ReachID": 1, "ICD": "S00.003", "Diagnosis": "Thymus Gland", "DiagnosisDate": "2014-10-03T00:00:00.000Z"},{"ReachID": 1, "ICD": "S00.004", "Diagnosis": "Broken Ankle", "DiagnosisDate": "2014-09-03T00:00:00.000Z"},{"ReachID": 1, "ICD": "S00.005", "Diagnosis": "Broken Ankle", "DiagnosisDate": "2014-09-03T00:00:00.000Z"}]';
	
	var jsonRecordSet = JSON.parse(data);
	for (var record in jsonRecordSet) {
	    jsonRecordSet[record].DiagnosisDate = dataFormatter.formatData(jsonRecordSet[record].DiagnosisDate,"date");
	}
	res.send(jsonRecordSet);
};