'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');

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
		
		/*Configure database query */
		var visnId = req.param("visnid");
		var select = '';
		if (visnId && validator.isInt(visnId)) {
			request.input('visnId', sql.Int, visnId);
			select += "SELECT vi.VISN,vi.NetworkName,vi.RegionServed,vm.VAMC_Name, COUNT(p.ReachID) AS Total FROM dbo.Patient p ";
			select += "JOIN PatientStation ps ";
			select += "ON p.ReachID = ps.ReachID ";
			select += "JOIN Ref_VAMC vm ";
			select += "ON ps.sta3N = vm.STA3N ";
			select += "JOIN Ref_VISN vi ";
			select += "ON vm.VISN = vi.VISN ";
			select += "WHERE vi.VISN = @visnId ";
			select += "GROUP BY	vi.VISN,vi.NetworkName,vi.RegionServed,vm.VAMC_Name";
		}

		/*Query database */
		if(select)
		{
			request.query(select, function(err, recordset) {
			if (err) { 
				console.dir(err);
				res.send(401, 'Query Failed');
				return; 
			}
			
			/*Parse result into JSON object and format the date */
			var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
			
			/*Send the data */
			res.send(jsonRecordSet);
		});
		}
		else
		{
			res.send(401, 'Query Failed');
			return; 
		}
		
  });   
}
