'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');

exports.index = function(req, res) {
	/*Configure response header */
   //res.header("content-type: application/json");

   /*Configure and open database */
    var dbc = require('../../config/db_connection/production.js');
    var config = dbc.config;  var data = [];   var pctRisks = [];
	var connection = new sql.Connection(config, function(err) {
		if (err) { 
			data = "Error: Database connection failed!";
			return;
		}
		var request = new sql.Request(connection);

		/*Configure database query */
		var reachID = req.param("reachID");
		var query = '';
		if (reachID && validator.isInt(reachID)) {
			request.input('reachID', sql.Int, reachID);
			query = "SELECT count(*) as TotalHighRisk_National, sum(cast(CriminalRecord as int)) as PTSD, ";
			query += "cast(cast(sum(cast(CriminalRecord as int)) as float)/cast(count(*) as float) * 100 as decimal(7,4)) as PTSD_PCT, ";
			query += "sum(cast(HistSubstanceAbuse as int)) as SubstanceAbuseHistory, ";
			query += "cast(cast(sum(cast(HistSubstanceAbuse as int)) as float)/cast(count(*) as float) * 100 as decimal(7,4)) as SubstanceAbuseHistory_PCT, ";
			query += "sum(cast(PreviousPsychiatricHospitalization as int)) as Hospitilized, ";
			query += "cast(cast(sum(cast(PreviousPsychiatricHospitalization as int)) as float)/cast(count(*) as float) * 100 as decimal(7,4)) as Hospitilized_PCT, ";
			query += "sum(cast(PreviousSuicideAttempts as int)) as PreviousAttempts, ";
			query += "cast(cast(sum(cast(PreviousSuicideAttempts as int)) as float)/cast(count(*) as float) * 100 as decimal(7,4)) as PreviousAttempts_PCT, ";
			query += "sum(cast(DiagnosedTBI as int)) as DiagnosedTBI, ";
			query += "cast(cast(sum(cast(DiagnosedTBI as int)) as float)/cast(count(*) as float) * 100 as decimal(7,4)) as DiagnosedTBI_PCT ";
			query += "FROM VeteranRisk vet INNER JOIN Ref_VAMC vamc ON vet.VAMC = vamc.VAMCID ";
			query += "WHERE vet.Score >= 0";
			query += "AND vamc.VISN = @reachID";
		} else { 
			res.end("ERROR: VISN ID is required.");
		}

		/*Query the database */
		request.query(query, function(err, recordset) {
			if (err) { 
				connection.close();
				console.dir(err);
				res.send(401, "Query Failed");
				return;  
			}

			/*Format the data */
			for (var i = 0; i < recordset.length; i++) {
				data.push({
					key: "PTSD", 
					y: recordset[i].PTSD                    
				});
				data.push({
					key: "Substance Abuse", 
					y: recordset[i].SubstanceAbuseHistory                    
				});
				data.push({
					key: "Hospitilized", 
					y: recordset[i].Hospitilized                    
				});
				data.push({
					key: "Previous Attempts", 
					y: recordset[i].PreviousAttempts                    
				});
				data.push({
					key: "Diagnosed TBI", 
					y: recordset[i].DiagnosedTBI                    
				});
			}
			connection.close();
			/*Send the data */
			res.send(data);
		});
    });
};