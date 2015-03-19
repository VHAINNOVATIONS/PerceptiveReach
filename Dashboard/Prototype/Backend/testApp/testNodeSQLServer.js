var sql = require('mssql');

var config = {
  // Reach database connection params
 
    user: 'xx',
    password: 'xxxxxx',
    server: 'xxxxxxxxx', // You can use 'localhost\\instance' to connect to named instance
    driver: 'msnodesql',
    database: 'xxxxxx',
    //connectionString: "Driver={SQL Server Native Client 11.0};Server=#{server};Database=#{database};Uid=#{user};Pwd=#{password};Trusted_Connection={true}",
    connectionString: "Driver={SQL Server Native Client 11.0};Server=#{server};Database=#{database};Trusted_Connection=yes",
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

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
 
console.log("Registering endpoint: /vetEmergencyData");
app.get('/vetEmergencyData', function(req, res){
    res.header("content-type: application/json");
    var id = req.param("id");
    var query = '';
    if (id) {
        console.log("Registering endpoint: /vetEmergencyData/:id is " + id);
        query = "SELECT * FROM EmergencyContact ";
        query += "WHERE ReachID =  " + id;
        console.log("Query: " + query);
    } else {
        console.log("ERROR: State Abbreviation is required."); 
        res.send("ERROR: State Abbreviation is required.");
    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !query) { 
        data = "Error: Database connection failed!";
        console.log("Database connection failed! " + err); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
            console.log("Query failed! " + err); 
            return; 
            }

            console.log(recordset.length);

            res.send(recordset);
        });

    });
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

app.listen(3000);