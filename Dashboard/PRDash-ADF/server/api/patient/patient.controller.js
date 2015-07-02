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

var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');
// Get list of things
exports.index = function(req, res) {
    res.header("content-type: application/json");
    var data = [];

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

    var id = req.param("id");
    var score = req.param("score");
    var query = '';
    var select = "SELECT * FROM [dbo].[vw_PatientRoster] WHERE RiskLevelID in (1,2)"; 
    if (id) {
        
        query += select
                + " and sta3N = " + id;
        query += " ORDER BY RiskLevel ASC";
    } 
   
    query += "; SELECT * FROM Ref_OutreachStatus";
    var connection = new sql.Connection(config, function(err) {
        if (err) { 
        data = "Error: Database connection failed!";
        return; 
        }

        var request = new sql.Request(connection); // or: var request = connection.request();
        request.multiple = true;
        request.query(query, function(err, recordset) {
            if (err) { 
            return; 
            }
            var jsonRecordSet = JSON.parse(JSON.stringify(recordset[0]));
            var jsonOutreachStatus = JSON.parse(JSON.stringify(recordset[1]));
            res.send({patients:jsonRecordSet, outreachStatus:jsonOutreachStatus });
        });

    });
    
}

exports.update = function(req, res) {
    res.header("content-type: application/json");
    var data = [];

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;
    var outreachStatus = req.param("outreachStatus");
    var vetReachID = req.param("vetReachID");
    var userId = req.param("UserID");
    var query = '';
    
    if (vetReachID) {
        //console.log("Registering endpoint: /veteranRoster/:outreachStatus is " + outreachStatus);
        var value = '';
        if (outreachStatus == null || outreachStatus.length == 0 || outreachStatus == 0)
            value = "NULL";
        else
            value = outreachStatus;
        //query += "UPDATE Patient SET OutreachStatus = " + value + " WHERE  ReachID=" + vetReachID;
        query += "exec dbo.sp_SaveOutreachStatus @User=" + userId + ", @ReachID=" + vetReachID +", @Status='"+ value+"'";
    }
    else {
        res.send("ERROR: vetReach ID is required.");
        //console.log("ERROR: vetReach ID is required."); 
    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) { 
        data = "Error: Database connection failed!";
        //console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
            //console.log("Query failed! -- " + query); 
            return; 
            }

            //console.log("Save Completed! ");
            data = "Save Completed Successfully!";
            res.send(data);
        });

    });
    
};