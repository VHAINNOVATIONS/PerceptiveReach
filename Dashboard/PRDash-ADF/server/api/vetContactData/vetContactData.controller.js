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

  var data ='[{"firstName" : "Vet*", "lastName" : "Veteran_*", "ssn" : "000231458", "phone" : "8005553121", "altPhone" : "5558765432", "address" : "234 Pleasant St. Apt.456", "city" : "New York", "state" : "New York", "zipCode" : "11011"}]';
  var jsonRecordSet = JSON.parse(data);
	for (var record in jsonRecordSet) {
	    jsonRecordSet[record].phone = dataFormatter.formatData(jsonRecordSet[record].phone);
	    jsonRecordSet[record].altPhone = dataFormatter.formatData(jsonRecordSet[record].altPhone);
	    jsonRecordSet[record].ssn = dataFormatter.formatData(jsonRecordSet[record].ssn);
	}
	res.send(jsonRecordSet);
  //res.send(JSON.parse(data));
};