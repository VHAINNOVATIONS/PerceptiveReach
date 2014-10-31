var sql = require('mssql');

var config = {
    user: 'XXXXXX',
    password: 'XXXXXX',
    server: 'XXX.XXX.XXX.XXX', // You can use 'localhost\\instance' to connect to named instance
    database: 'Database',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}

var express = require('express');
var app = express();

app.use(function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "*");
return next();
});

app.use(express.static(__dirname +'/html'));

console.log("Registering endpoint: /");
app.get('/', function(req, res){
    res.send('hello ROOT world');
});
 
console.log("Registering endpoint: /score");
app.get('/score', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) {
            data = "Error: Database connection failed!";
            console.log("Database connection failed!"); 
            return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query('SELECT Score, count(*) as Total FROM AnalyticsOutput group by score', function(err, recordset) {
            // ... error checks
            if (err) { 
            data = "Error: Database connection failed!";
            console.log("Query failed!"); 
            return; 
            }

            console.log(recordset.length);
            for (var i = 0; i < recordset.length; i++) {
                data.push({
                    key: recordset[i].Score, 
                    y: recordset[i].Total
                });
            }   

            res.send(data);
        });

    });
});

app.get('/branch', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) {
        data = "Error: Database connection failed!";
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

            for (var i = 0; i < recordset.length; i++) {
                data.push({
                    key: recordset[i].Branch, 
                    y: recordset[i].Total
                });
            }   

            res.send(data);
        });

    });
    
    
    //res.send(recordset);
});

app.get('/attempts', function(req, res){
    res.header("content-type: application/json");
    var data = [];
    var attempts = [];
    var actual = [];

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) { 
        data = "Error: Database connection failed!";
        console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query('select Score, sum(noattempts) as Attempts, count(*) as Actual FROM AnalyticsOutput where PTSD = 1 group by score', function(err, recordset) {
            // ... error checks
            if (err) { 
            console.log("Query failed!"); 
            return; 
            }

            console.log(recordset.length);

            for (var i = 0; i < recordset.length; i++) {
                attempts.push([
                    recordset[i].Score, 
                    recordset[i].Attempts                    
                ]);
            }
            data.push({
                "key": "ATTEMPTS",
                "values": attempts
            });   


            for (var i = 0; i < recordset.length; i++) {
                actual.push([
                    recordset[i].Score, 
                    recordset[i].Actual                    
                ]);
            }
            data.push({
                "key": "ACTUAL",
                "values": actual
            });   



            res.send(data);
        });

    });
    
    
    //res.send(recordset);
});

app.get('/veteransByState', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var state = req.param("id");
    var query = '';
    if (state) {
        console.log("Registering endpoint: /veteransByState/:id is " + state);
        query = "SELECT Branch, count(*) as Total FROM AnalyticsOutput WHERE St = '" + state + "' group by branch";
        console.log("Query: " + query);
    } else {
        query = "SELECT St as State, count(*) as Total FROM AnalyticsOutput group by St";
    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) { 
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

            /*for (var i = 0; i < recordset.length; i++) 
            { 
                console.log("Row#: " + i + " Last Name: " + recordset[i].lastname + " Firt Name: " + recordset[i].firstname); 
            } */

            res.send(recordset);
        });

    });
    
    //res.send(recordset);
});

console.log("Registering endpoint: /jsonendpoint");
app.get('/jsonendpoint', function(req, res){
    res.header("content-type: application/json");
    res.json({
        "mykey" : "myvalue",
        "testy" : "something",
        "exnum" : 123
    });
});

console.log("Registering endpoint: /user/:id");
app.get('/user', function(req, res){
    res.header("content-type: application/json");
    res.send('user is ' + req.param("id"));
}); 

app.listen(3000);