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
            res.send(401, 'DB Connection Error.');
            return; 
        }
        var request = new sql.Request(connection);
        var ID = req.param("ID");

        // Configure WHERE clause if needed
        var whereClause = '';
        var trueID = '';
        if(ID != null && ID.indexOf("-v") != -1){
            trueID = ID.split("-v")[0];
            whereClause = " WHERE VISN = @trueID";
        }
       

        // Configure Database Query
        var query = '';
        if (trueID && validator.isInt(trueID)) {
            request.input('trueID', sql.Int, trueID);            
        }

        query =  "SELECT [TotalPatients] AS Total"
        query += " ,[AtRisk]"
        query += " ,[VISN]"
        query += " ,[STA3N]"
        query += " ,[VAMC_Name]"
        query += " ,[StateAbbr]"
        query += " FROM [dbo].[vw_FacilityRoster]"
        query += whereClause;
        query += " ORDER BY STA3N ASC";

    
        // Query the database
        request.query(query, function(err, recordset) {
            if (err) { 
                console.dir(err);
                res.send(401, 'Query Failed.');
                return; 
            }


            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));


            query = 'SELECT VAMC, Upper, Lower, SA_new FROM staging.FacilityResults WHERE Month_no > 14';
            request.query(query, function(err, prrecordset) {
                if (err) {
                    console.dir(err);
                    res.send(401, 'Query Failed.');
                    return;
                }
               var predictionAlert = prrecordset.reduce(function(r, p) {
                    var e = r[p.VAMC];
                    if (! e) {
                        r[p.VAMC] = e = {
                            higher: 0,
                            lower: 0
                        };
                    }
                    if (p.SA_new >= 0) {
                        if (p.SA_new < p.Lower) {
                            ++e.lower;
                        }
                        if (p.SA_new > p.Upper) {
                            ++e.higher;
                        }
                    }
                    return r;
                }, {});

                jsonRecordSet.forEach(function(r) {
                    var vamc = r.STA3N;
                    if (vamc && predictionAlert[vamc]) {
                        var pa = predictionAlert[vamc];
                        if (pa.higher + pa.lower === 0) {
                            r.Prediction = "Within limits"
                        } else if (pa.higher && pa.lower) {
                            r.Prediction = "Too high and low"
                        } else if (pa.higher) {
                            r.Prediction = "Too high"
                        } else if (pa.lower) {
                            r.Prediction = "Too low"
                        }
                    } else {
                        r.Prediction = "No data"
                    }
                });

                res.send(jsonRecordSet);
            });
        });

    });
}
