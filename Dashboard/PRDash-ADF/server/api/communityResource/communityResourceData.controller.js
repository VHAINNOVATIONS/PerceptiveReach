'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');
var praudit = require('../../audit');

exports.index = function(req, res) {
	/*Configure response header */
	//res.header("content-type: application/json");

	/*Configure and open database */
	// var dbc = require('../../config/db_connection/development.js');
	// var config = dbc.config;
  //   var connection = new sql.Connection(config, function(err) {
	// 	if (err) {
	// 		return;
	// 	}
	// 	var request = new sql.Request(connection);
  //
	// 	/*Request parameters from database */
	// 	var reachID = req.param("reachID");
  //
	// 	/*Configure database query */
	// 	var query = '';
	// 	if (reachID && validator.isInt(reachID)) {
	// 		request.input('reachID', sql.Int, reachID);
	// 		query = "SELECT * FROM Appointments a LEFT OUTER JOIN Ref_VistACancelNoShowCode r ON a.CancelNoShowCode = r.CancelNoShowCodeID "
	// 		query += "WHERE a.ReachID = @reachID";
	// 	} else {
	// 		res.send("ERROR: ReachID  is required.");
	// 	}
  //
	// 	/*Query database */
	// 	request.query(query, function(err, recordset) {
	// 		if (err) {
	// 			connection.close();
	// 			console.dir(err);
	// 			praudit.auditlog('SQL ERROR',err);
	// 			res.send(401, "Query Failed");
	// 			return;
	// 		}
	// 		connection.close();
	// 		/*Parse result into JSON object and format the date */
	// 		// var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
	// 		// for (var record in jsonRecordSet) {
	// 		// 	jsonRecordSet[record].ApptDate = dataFormatter.formatData(jsonRecordSet[record].ApptDate,"date");
	// 		// }
  //
	// 		/*Send the data */
	// 		res.send("Hello from Community Resource");
	// 	});
  //   });
//res.send('[{"ReachID":1000,"ApptDate":"6/27/2014","CancelNoShowCode":"C","PrimarySecondaryStopCodeName":"Zachs Appt","ApptID":500,"CancelNoShowCodeID":"C","CancelNoShowCodeDesc":"Testing"}]');
  //res.send('[{"ReachID": 1000,"Name": "Testing Name","Address": "123 testing lane","Phone": "555-555-5555","Website": "wwwwebsitename"}]');
  //res.send('[{"ReachID": 1000,"Name": "Testing Name","Address": "123 testing lane","Phone": "555-555-5555","Website": "wwwwebsitename"}, {"ReachID": 1000,"Name": "Testing Name","Address": "123 testing lane","Phone": "555-555-5555","Website": "wwwwebsitename"}]');

  //res.send('[{"ReachID": 1000,"Name": "The American Legion - Post #117","Address": "413 South Main Street Butler, PA 16001","Phone": "724-283-9014","Website": "http://www.butlerlegion.com/"}, {"ReachID": 1000,"Name": "Testing Name","Address": "123 testing lane","Phone": "555-555-5555","Website": "wwwwebsitename"}, {"ReachID": 1000,"Name": "Testing Name","Address": "123 testing lane","Phone": "555-555-5555","Website": "wwwwebsitename"}]');
  res.send('[{"ReachID": 1000,"Name": "The American Legion - Post #117","Address": "413 South Main Street Butler, PA 16001","Phone": "724-283-9014","Website": "http://www.butlerlegion.com/"}, {"ReachID": 1000,"Name": "AMVETS Post #778","Address": "150 Legion Memorial Lane Butler, PA 16001","Phone": "724-287-3022","Website": "N/A"}, {"ReachID": 1000,"Name": "VFW Post 249 - Butler County","Address": "429 West Jefferson Street Butler, PA 16001","Phone": "724-287-4992","Website": "N/A"}]');




};
