'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
	
	/*Configure and open database */
	var dbc = require('../../config/db_connection/development.js');
	var config = dbc.config;  var data = [];
	var connection = new sql.Connection(config, function(err) {
		if (err) { 
		  console.dir(err);
		  return; 
		}
		var request = new sql.Request(connection); 
		request.multiple = true;
		
		/*Configure database query */
		var query = '';
		var select = "SELECT * FROM [dbo].[Ref_CDSConditions]"; 
		query += select
		query += "; SELECT * FROM [dbo].[Ref_CDSQuestions]";
		query += "; SELECT * FROM [dbo].[Ref_CDSTreatments]";
	  
		/*Query database */
		request.query(query, function(err, recordset) {
			if (err) { 
				console.dir(err);
				res.send(401, 'Query Failed');
				return; 
			}
			
			/*Parse result into JSON object and format the date */
			var jsonConditions = JSON.parse(JSON.stringify(recordset[0]));
			var jsonQuestions = JSON.parse(JSON.stringify(recordset[1]));
			var jsonTreatments = JSON.parse(JSON.stringify(recordset[2]));
			
			/*Send the data */
			res.send({conditions:jsonConditions, questions:jsonQuestions,treatments:jsonTreatments });
		});
  }); 
}