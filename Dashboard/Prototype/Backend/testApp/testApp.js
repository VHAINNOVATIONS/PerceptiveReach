// Load the http module to create an http server.
var http = require('http');
var sql = require('mssql');

var config = {
    user: 'XXXXXX',
    password: 'XXXXXX',
    server: '000.000.000.000', // You can use 'localhost\\instance' to connect to named instance
    database: 'name',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}

/*var connection = new sql.Connection(config, function(err) {
    // ... error checks
    if (err) { 
    console.log("Database connection failed!"); 
    return; 
    }
    
    // Query
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query('select top 10 lastname, firstname from AnalyticsOutput', function(err, recordset) {
        // ... error checks
        if (err) { 
        console.log("Query failed!"); 
        return; 
        }
        
        console.log(recordset.length);
        
        for (var i = 0; i < recordset.length; i++) 
        { 
            console.log("Row#: " + i + " Last Name: " + recordset[i].lastname + " Firt Name: " + recordset[i].firstname); 
        } 

        // console.dir(recordset);
    });

});*/

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/HTML"});
  
  //response.end("Hello World\n");

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) { 
            response.end("Database connection failed!");
            //console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query('select top 10 lastname, firstname, branch, score from AnalyticsOutput', function(err, recordset) {
            // ... error checks
            if (err) {
                response.end("Query failed!"); 
                //console.log("Query failed!"); 
            return; 
            }

            console.log(recordset.length);
            var output = "";
            for (var i = 0; i < recordset.length; i++) 
            {
                output += "<b>Row#:</b> " + i + " <b>Last Name:</b> " + recordset[i].lastname + " <b>Firt Name:</b> " + recordset[i].firstname + " <b>Branch:</b> " + recordset[i].branch + " <b>Score:</b> " + recordset[i].score + "<br>";
                console.log("Row#: " + i + " Last Name: " + recordset[i].lastname + " Firt Name: " + recordset[i].firstname); 
            } 

            response.end(output);
            // console.dir(recordset);

        });

    });    
    
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");