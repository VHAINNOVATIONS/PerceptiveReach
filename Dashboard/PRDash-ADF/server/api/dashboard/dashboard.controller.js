'use strict';

var _ = require('lodash');

var sql = require('mssql');

var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
    //res.header("content-type: application/json");
    var data = [];

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

    var id = req.param("id");
    var query = '';
    var select = "SELECT * FROM prsystem.UserDashboard "; 
   
  
    var connection = new sql.Connection(config, function(err) {
        if (err) { 
            console.dir(err);
            res.send(401, 'DB Connection Error.');
            return;
        }

        var request = new sql.Request(connection);
        if (id) {
            request.input('id', sql.VarChar(50), id);
            query += select + "WHERE DashboardID = @id";
        } 
        request.query(query, function(err, recordset) {
            if (err) { 
                connection.close();
                console.dir(err);
                res.send(401, 'Query Failed.');
                return;
            }
            connection.close();
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
    var dashboard = req.param("dashboard");
    var query = '';
    var query2 = '';

    var connection = new sql.Connection(config, function(err) {
        if (err) { 
            console.dir(err);
            res.send(401, 'DB Connection Error.');
            return;
        }

        var request = new sql.Request(connection);

        if (dashboard) {

            var param1 = dashboard.data;
            var param2 = dashboard.id;
            var param3 = dashboard.id.split("-")[0];

            request.input('data', sql.VarChar(sql.MAX), param1);
            request.input('id',sql.VarChar(50),param2);
            request.input('username',sql.VarChar(50),param3);

            query += "UPDATE prsystem.UserDashboard SET DashboardData = @data WHERE  DashboardID = @id";
            query += " IF @@ROWCOUNT=0 ";
            query += "INSERT INTO prsystem.UserDashboard (DashboardID, DashboardData) VALUES (@id,@data) ";
            query2 += "UPDATE prsystem.Users SET UserDashboardID = @id WHERE  UserName = @username";
        }
        else {
            res.send("ERROR: dashboard is required.");
        }

        request.query(query, function(err, recordset) {
            if (err) { 
                console.dir(err);
                res.send(401, 'Query Failed.');
                return;
            }

            request.query(query2, function(err, recordset){
                if (err){
                    console.dir(err);
                    res.send(401, 'Query Failed.');
                    return;
                }
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
    
    

    var connection = new sql.Connection(config, function(err) {
        if (err) { 
            console.dir(err);
            res.send(401, 'DB Connection error.');
            return; 
        }

        var request = new sql.Request(connection); 
        if (vetReachID) {
        var value = '';
        if (outreachStatus == null || outreachStatus.length == 0 || outreachStatus == 0)
            value = "NULL";
        else
            value = outreachStatus;

        request.input('data', sql.VarChar(sql.MAX), value);
        request.input('id',sql.VarChar(50),vetReachID);
        query += "UPDATE prsystem.UserDashboard  SET DashboardData = @data WHERE  DashboardID=@id";
        }
        else {
            res.send("ERROR: Dashboard ID is required.");
        }
        request.query(query, function(err, recordset) {
            if (err) { 
                console.dir(err);
                res.send(401, 'Query Failed.');
                return; 
            }
            data = "Save Completed Successfully!";
            res.send(data);
        });
    });
};