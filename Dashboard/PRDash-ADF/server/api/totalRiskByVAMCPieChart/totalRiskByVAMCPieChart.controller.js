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

var sql = require('mssql');

// Get list of things
exports.index = function(req, res) {
   res.header("content-type: application/json");

    var dbc = require('../../config/db_connection/production.js');
    var config = dbc.config;

    var data = [];
    var pctRisks = [];

    var id = req.param("id");
    /*if (!id) {
        id = 1;
    }*/
    var query = '';
    if (id) {
        console.log("Registering endpoint: /totalRiskbyVAMCPieChart/:id is " + id);
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
        query += "AND vamc.VISN = " + id;
        console.log("Query: " + query);
    } else {
        console.log("ERROR: VISN ID is required."); 
        res.end("ERROR: VISN ID is required.");

    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !query) { 
        data = "Error: Database connection failed!";
        console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
            console.log("Query failed!"); 
            return; 
            }

            console.log(recordset.length);
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
            console.log("data: "+ data)

            res.send(data);
        });

    });
    
};