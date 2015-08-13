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
		var select =  "SELECT vsn.VISN, vsn.NetworkName, vsn.RegionServed,  Count (vsn.VISN) as Total";
			select += " FROM Patient p";
			select += " INNER JOIN PatientStation s ON s.ReachID = p.ReachID";
			select += " INNER JOIN Ref_VAMC v ON s.sta3N = v.STA3N";
			select += " INNER JOIN Ref_VISN vsn ON vsn.VISN = v.VISN";
			select += " GROUP BY vsn.VISN, vsn.NetworkName, vsn.RegionServed";
			select += " Order By vsn.VISN ASC";

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
