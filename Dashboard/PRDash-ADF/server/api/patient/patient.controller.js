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
		var select = "SELECT * FROM [dbo].[vw_PatientRoster]"; 
		if (sta3N && validator.isInt(sta3N)) {
			request.input('sta3N', sql.Int, sta3N);
			query += select
				  + " WHERE sta3N = @sta3N";
			query += " ORDER BY RiskLevel ASC";
		} 
		query += "; SELECT * FROM Ref_OutreachStatus";
	  
		/*Query database */
		request.query(query, function(err, recordset) {
			if (err) { 
				connection.close();
				console.dir(err);
				praudit.auditlog('SQL ERROR',err);
				res.send(401, 'Query Failed');
				return; 
			}
			
			connection.close();
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
        outreachStatus = outreachStatus? outreachStatus:0;
        var vetReachID = req.param("vetReachID");
        var facilityID = req.param("facilityID");
        var userID = req.param("UserID");
        var query = '';
        if (userID && validator.isInt(userID)) {
          request.input('userID', sql.Int, userID);
        }
        if (facilityID && validator.isInt(facilityID)) {
          request.input('facilityID', sql.Int, facilityID);
        }
		if (outreachStatus && validator.isInt(outreachStatus)) {
			request.input('outreachStatus', sql.Int, outreachStatus);
		}
        if (vetReachID && validator.isInt(vetReachID)) {
            request.input('vetReachID', sql.Int, vetReachID);
            var value = '';
            if (outreachStatus == null || outreachStatus.length == 0 || outreachStatus == 0)
                value = undefined;
            else
                value = outreachStatus;
            request.input('value', sql.Int, value);
            query += "exec dbo.sp_SaveOutreachStatus @User=@userId, @ReachID=@vetReachID, @Status=@value, @sta3n_input=@facilityID";
        }
        else {
            res.send("ERROR: vetReach ID is required.");
        }
		
		/*Query database */
        request.query(query, function(err, recordset) {
			if (err) { 
			  connection.close();
			  console.dir(err);
			  praudit.auditlog('SQL ERROR',err);
			  res.send(401, 'Query Failed');
			  return; 
			}
			var action = 'Outreach Status Updated for ReachID: ' + vetReachID;
			var message = 'Updated by User ' + req.headers.prsessionkey.split('::')[0];
			praudit.auditlog(action,message,'info');
			connection.close();
			/*Send the data */
			data = "Save Completed Successfully!";
			res.send(data);
        });
    });
};