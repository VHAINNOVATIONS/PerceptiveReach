var sql = require('mssql');

var config = {
    user: 'XXXXXX',
    password: 'XXXXXX',
    server: '000.000.000.000', // You can use 'localhost\\instance' to connect to named instance
    database: 'Name',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}

var express = require('express');
var app = express();
 
console.log("Registering endpoint: /");
app.get('/', function(req, res){
    res.send('hello ROOT world');
});
 
console.log("Registering endpoint: /score");
app.get('/score', function(req, res){

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) { 
        console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
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

            res.send(recordset);
        });

    });
    
    
    //res.send(recordset);
});

app.get('/branch', function(req, res){

    var connection = new sql.Connection(config, function(err) {
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

app.get('/attempts', function(req, res){

    var connection = new sql.Connection(config, function(err) {
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
 
app.listen(3000);