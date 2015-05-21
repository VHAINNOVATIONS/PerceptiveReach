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
    //var score = req.param("score");
    var query = '';
    var select = "SELECT * FROM prsystem.UserDashboard "; 
    //query += "ReachID, vamc.VAMC FROM VeteranRisk vet INNER JOIN Ref_VAMC vamc ON vet.VAMC = vamc.VAMCID WHERE ";
    if (id) {
        //console.log("Registering endpoint: /veteranRoster/:id is " + id);
        //query += "vamc.vamcID = " + id;
        query += select + "WHERE DashboardID = " + id;
    } 
    
    /*else {
        query += select + " FROM Patient "
                + "WHERE RiskLevel in (1,2) "
                + "ORDER BY RiskLevel ASC";
        //res.send("ERROR: VAMC ID is required.");
        ////console.log("ERROR: VAMC ID is required."); 
    }*/

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) { 
        data = "Error: Database connection failed!";
        //console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        //console.log("Patient Query:" + query);
        request.query(query, function(err, recordset) {
            //console.log(recordset);
            // ... error checks
            if (err) { 
                console.log("Query failed! -- " + query); 
            return; 
            }

            //console.log(recordset.length);
            /*var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            //console.log(jsonRecordSet);
            for (var patient in jsonRecordSet) {
                jsonRecordSet[patient].SSN = dataFormatter.formatData(jsonRecordSet[patient].SSN,"ssn");
                jsonRecordSet[patient].HomePhone = dataFormatter.formatData(jsonRecordSet[patient].HomePhone,"phone");
                jsonRecordSet[patient].DateIdentifiedAsAtRisk = dataFormatter.formatData(jsonRecordSet[patient].DateIdentifiedAsAtRisk,"date");
                ////console.log(jsonRecordSet[patient].SSN + " " + jsonRecordSet[patient].Phone + " " + jsonRecordSet[patient].DateIdentifiedAsHighRisk);
            }*/
            //var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            //console.log(jsonRecordSet);
            console.log(recordset);
            res.send(recordset);
        });

    });
    
}

exports.create = function(req, res) {
    res.header("content-type: application/json");
    var data = [];

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;
    //var outreachStatus = req.param("outreachStatus");
    var dashboard = req.param("dashboard");
    var query = '';
    var query2 = '';
    
    if (dashboard) {
        //console.log("Registering endpoint: /veteranRoster/:outreachStatus is " + outreachStatus);
        query += "UPDATE prsystem.UserDashboard SET DashboardData = '" + dashboard.data + "' WHERE  DashboardID = '" + dashboard.id + "'";
        query += " IF @@ROWCOUNT=0 ";
        query += "INSERT INTO prsystem.UserDashboard (DashboardID, DashboardData) VALUES ('" + dashboard.id + "', '" + dashboard.data + "') ";
        query2 += "UPDATE prsystem.Users SET UserDashboardID = '" + dashboard.id + "' WHERE  UserName = '" + dashboard.id.split("-")[0] + "'";
    }
    else {
        res.send("ERROR: dashboard is required.");
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
                console.log("Query failed! -- " + query); 
                console.log("Error -- " + err); 
                return; 
            }

            request.query(query2, function(err, recordset){
                if (err){
                    console.log("Query failed! - " + query2);
                    console.log("Error - " + err);
                    return;
                }
                //console.log("Save Completed! ");
                data = "Save Completed Successfully!";
                res.send(data);
            });            
        });

    });
    
};

exports.update = function(req, res) {
    res.header("content-type: application/json");
    var data = [];

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;
    var outreachStatus = req.param("outreachStatus");
    var vetReachID = req.param("vetReachID");
    var query = '';
    
    if (vetReachID) {
        //console.log("Registering endpoint: /veteranRoster/:outreachStatus is " + outreachStatus);
        var value = '';
        if (outreachStatus == null || outreachStatus.length == 0 || outreachStatus == 0)
            value = "NULL";
        else
            value = outreachStatus;
        query += "UPDATE prsystem.UserDashboard  SET DashboardData = " + value + " WHERE  DashboardID=" + vetReachID;
    }
    else {
        res.send("ERROR: Dashboard ID is required.");
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