/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var sql = require('mssql');

// Connect to database
sql.connect(config.mssql, function(err) {console.log('Test mssql connection');});

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
//app.set('config', config);

// Webservices
console.log("Registering endpoint: /score");
app.get('/score', function(req, res){

    var connection = new sql.Connection(config.mssql, function(err) {
        // ... error checks
        if (err) { 
        console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request(); 
        console.log("generate SQL reqeust connection"); 
        request.query('SELECT Score, count(*) as Total FROM AnalyticsOutput group by score', function(err, recordset) {
            // ... error checks
            if (err) { 
            console.log("Query failed!"); 
            return; 
            }

            console.log(recordset.length);

            /*for (var i = 0; i < recordset.length; i++) 
            { 
                console.log("Row#: " + i + " Last Name: " + recordset[i].lastname + " Firt Name: " + recordset[i].firstname); 
            } */

            res.json(recordset);
        });

    });
    
    
    //res.send(recordset);
});

console.log("Registering endpoint: /branch");
app.get('/branch', function(req, res){

    var connection = new sql.Connection(config.mssql, function(err) {
        // ... error checks
        if (err) { 
        console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query('SELECT Branch, count(*) as Total FROM AnalyticsOutput group by branch', function(err, recordset) {
            // ... error checks
            if (err) { 
            console.log("Query failed!"); 
            return; 
            }

            console.log(recordset.length);

            /*for (var i = 0; i < recordset.length; i++) 
            { 
                console.log("Row#: " + i + " Last Name: " + recordset[i].lastname + " Firt Name: " + recordset[i].firstname); 
            } */

            res.send(recordset);
        });

    });
    
    
    //res.send(recordset);
});

console.log("Registering endpoint: /attempts");
app.get('/attempts', function(req, res){

    var connection = new sql.Connection(config.mssql, function(err) {
        // ... error checks
        if (err) { 
        console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query('select Score, sum(noattempts) as Attempts, count(*) as TOTAL FROM AnalyticsOutput where PTSD = 1 group by score', function(err, recordset) {
            // ... error checks
            if (err) { 
            console.log("Query failed!"); 
            return; 
            }

            console.log(recordset.length);

            /*for (var i = 0; i < recordset.length; i++) 
            { 
                console.log("Row#: " + i + " Last Name: " + recordset[i].lastname + " Firt Name: " + recordset[i].firstname); 
            } */

            res.send(recordset);
        });

    });
    
    
    //res.send(recordset);
});

console.log("Registering endpoint: /veteransByState");
app.get('/veteransByState', function(req, res){

    var state = req.param("id");
    var query = '';
    if (state) {
        console.log("Registering endpoint: /veteransByState/:id is " + state);
        query = "SELECT Branch, count(*) as Total FROM AnalyticsOutput WHERE St = '" + state + "' group by branch";
        console.log("Query: " + query);
    } else {
        query = "SELECT St as State, count(*) as Total FROM AnalyticsOutput group by St";
    }

    var connection = new sql.Connection(config.mssql, function(err) {
        // ... error checks
        if (err) { 
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

            /*for (var i = 0; i < recordset.length; i++) 
            { 
                console.log("Row#: " + i + " Last Name: " + recordset[i].lastname + " Firt Name: " + recordset[i].firstname); 
            } */

            res.send(recordset);
        });

    });
    
    //res.send(recordset);
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
//app.listen(config.port);
//console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));

// Expose app
exports = module.exports = app;