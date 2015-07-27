'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
	/*Configure response header */
	res.header("content-type: application/json");
	
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
		var sta3N = req.param("sta3N");
		var query = '';
		var select = "SELECT * FROM [dbo].[vw_PatientRoster] WHERE RiskLevelID in (1,2) AND ISNULL(Active,-1) in (-1,1)"; 
		if (sta3N && validator.isInt(sta3N)) {
			request.input('sta3N', sql.Int, sta3N);
			query += select
				  + " and sta3N = @sta3N";
			query += " ORDER BY RiskLevel ASC";
		} 
		query += "; SELECT * FROM Ref_OutreachStatus";
	  
		/*Query database */
		request.query(query, function(err, recordset) {
			if (err) { 
				console.dir(err);
				res.send(401, 'Query Failed');
				return; 
			}
			
			/*Parse result into JSON object and format the date */
			var jsonRecordSet = JSON.parse(JSON.stringify(recordset[0]));
			var jsonOutreachStatus = JSON.parse(JSON.stringify(recordset[1]));
			
			/*Send the data */
			res.send({patients:jsonRecordSet, outreachStatus:jsonOutreachStatus });
		});
  });   
}

exports.update = function(req, res) {
	/*Configure response header */
    res.header("content-type: application/json");

	/*Configure and open database */
    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config; var data = [];
    var connection = new sql.Connection(config, function(err) {
        if (err) { 
			data = "Error: Database connection failed!"; 
			return; 
        }
        var request = new sql.Request(connection);
		
		/*Configure database query */
        var outreachStatus = req.param("outreachStatus");
        var vetReachID = req.param("vetReachID");
        var userID = req.param("UserID");
        var query = '';
        if (userID && validator.isInt(userID)) {
          request.input('userID', sql.Int, userID);
        }
		if (outreachStatus && validator.isInt(outreachStatus)) {
			request.input('outreachStatus', sql.Int, outreachStatus);
		}
        if (vetReachID && validator.isInt(vetReachID)) {
            request.input('vetReachID', sql.Int, vetReachID);
            var value = '';
            if (outreachStatus == null || outreachStatus.length == 0 || outreachStatus == 0)
                value = "NULL";
            else
                value = outreachStatus;
            request.input('value', sql.Int, value);
            query += "exec dbo.sp_SaveOutreachStatus @User=@userId, @ReachID=@vetReachID, @Status=@value";
        }
        else {
            res.send("ERROR: vetReach ID is required.");
        }
		
		/*Query database */
        request.query(query, function(err, recordset) {
			if (err) { 
			  console.dir(err);
			  res.send(401, 'Query Failed');
			  return; 
			}

			/*Send the data */
			data = "Save Completed Successfully!";
			res.send(data);
        });
    });
};