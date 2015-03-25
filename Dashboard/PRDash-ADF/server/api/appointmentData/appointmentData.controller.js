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


// When the Real API get's implemented remove all lines between //removeBegin & //removeEnd

//removeBegin
/*var fs = require('fs');
var path = require('path');
var filePath = path.normalize('server/api/appointmentData/');
var fileName = "appointmentData.json";
//removeEnd

// Get list of things
exports.index = function(req, res) {
  res.header("content-type: application/json");
    //console.log("----AppointmentDataAPI");

//removeBegin
  var data = fs.readFileSync(filePath + fileName, 'utf8');
  var jsonRecordSet = JSON.parse(data);
	for (var record in jsonRecordSet) {
	    jsonRecordSet[record].Apptdate = dataFormatter.formatData(jsonRecordSet[record].Apptdate);
	}
	res.send(jsonRecordSet);*/

exports.index = function(req, res) {
  res.header("content-type: application/json");
  var data = '[{"ReachID": 1,"ApptType": "REGULAR","Apptdate": "2014-02-03T00:00:00.000Z","CancelationType": ""},{"ReachID": 1,"ApptType": "SERVICE CONNECTED","Apptdate": "2015-01-03T00:00:00.000Z","CancelationType": "Patient Cancelled"},{"ReachID": 1,"ApptType": "PRIMA FACIA","Apptdate": "2014-12-11T00:00:00.000Z","CancelationType": ""},{"ReachID": 1,"ApptType": "REGULAR","Apptdate": "2015-03-03T00:00:00.000Z","CancelationType": "Clinic Cancelled"},{"ReachID": 1,"ApptType": "RESEARCH","Apptdate": "2014-11-05T00:00:00.000Z","CancelationType": ""},{"ReachID": 1,"ApptType": "SHARING AGREEMENT","Apptdate": "2014-04-21T00:00:00.000Z","CancelationType": "Patient Cancelled and Auto Re-Book"}]';

  var jsonRecordSet = JSON.parse(data);
	for (var record in jsonRecordSet) {
	    jsonRecordSet[record].Apptdate = dataFormatter.formatData(jsonRecordSet[record].Apptdate,"date");
	}
	res.send(jsonRecordSet);




//removeEnd

//Begin Real SQL Server API Code


//End Real SQL Server API Code

};