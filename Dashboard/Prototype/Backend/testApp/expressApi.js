var sql = require('mssql');

var config = {
    user: 'sa',
    password: 'agile_123',
    server: '54.225.232.25', // You can use 'localhost\\instance' to connect to named instance
    database: 'Reach',

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

app.get('/FacilitiesStateCount', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    /*var state = req.param("id");
    var query = '';
    if (state) {
        console.log("Registering endpoint: /FacilitiesStateCount/:id is " + state);
        query = "SELECT Branch, count(*) as Total FROM AnalyticsOutput WHERE St = '" + state + "' group by branch";
        console.log("Query: " + query);
    } else {
        query = "SELECT St as State, count(*) as Total FROM AnalyticsOutput group by St";
    }*/
	query = "SELECT StateAbbr as State, count(*) as Total FROM Ref_VAMC group by StateAbbr";

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

app.get('/veterans', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var id = req.param("id");
    var query = '';
    if (id) {
        console.log("Registering endpoint: /veterans/:id is " + id);
        query = "SELECT *, vamc.vamc FROM VeteranRisk vet INNER JOIN Ref_VAMC vamc ON vet.VAMC = vamc.VAMCID WHERE vet.ReachID = " + id;
        console.log("Query: " + query);
    } else {
        res.send("ERROR: Veteran ID is required.");
        console.log("ERROR: Veteran ID is required."); 
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

            res.send(recordset);
        });

    });
    
});

app.get('/veteransByVAMC', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var id = req.param("id");
    var score = req.param("score");
    var query = '';
    query = "SELECT FirstName, MiddleName, LastName, SSN, Phone, DateIdentifiedRisk, "; 
    query += "ReachID, vamc.VAMC FROM VeteranRisk vet INNER JOIN Ref_VAMC vamc ON vet.VAMC = vamc.VAMCID WHERE ";
    if (id) {
        console.log("Registering endpoint: /veteransByVAMC/:id is " + id);
        query += "vamc.vamcID = " + id;
        if (score) {
            console.log("Registering endpoint: /veteransByVAMC/:score is " + score);
            query += "AND vet.Score >= " + score;
        }
    } else {
        res.send("ERROR: VAMC ID is required.");
        console.log("ERROR: VAMC ID is required."); 
    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !id) { 
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

            res.send(recordset);
        });

    });
    
});

app.get('/scoreSummaryByVISN', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var id = req.param("id");
    var query = '';
    if (id) {
        console.log("Registering endpoint: /scoreSummaryByVISN/:id is " + id);
        query = "SELECT sum(CASE when Score >= 95 then 1 else 0 END) as ExtremeRisk, ";
        query += "sum(CASE when Score < 95 and Score >= 80 then 1 else 0 END) as HighRisk, ";
        query += "sum(CASE when Score < 80 and Score >= 50 then 1 else 0 END) as MediumRisk, ";
        query += "sum(CASE when Score < 50 then 1 else 0 END) as LowRisk "
        query += "FROM VeteranRisk vet INNER JOIN Ref_VAMC vamc ON vet.VAMC = vamc.VAMCID ";
        query += "WHERE vamc.VISN =  " + id;
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

            res.send(recordset);
        });

    });
    
});

app.get('/scoreSummaryByVAMCID', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var id = req.param("id");
    var query = '';
    if (id) {
        console.log("Registering endpoint: /scoreSummaryByVAMCID/:id is " + id);
        query = "SELECT sum(CASE when Score >= 95 then 1 else 0 END) as ExtremeRisk, ";
        query += "sum(CASE when Score < 95 and Score >= 80 then 1 else 0 END) as HighRisk, ";
        query += "sum(CASE when Score < 80 and Score >= 50 then 1 else 0 END) as MediumRisk, ";
        query += "sum(CASE when Score < 50 then 1 else 0 END) as LowRisk "
        query += "FROM VeteranRisk ";
        query += "WHERE VAMC =  " + id;
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

            res.send(recordset);
        });

    });
    
});

app.get('/facilityByState', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var id = req.param("id");
    var query = '';
    if (id) {
        console.log("Registering endpoint: /facilityByState/:id is " + id);
        query = "SELECT VAMCID, vamc.VAMC, STA3N, visn.NetworkName, visn.RegionServed, COUNT(vet.ReachID) as Veteran_Count_at_facility ";
        query += "FROM Ref_VAMC vamc INNER JOIN Ref_VISN visn ON vamc.VISN = visn.VISN INNER JOIN VeteranRisk vet ON vamc.VAMCID = vet.VAMC ";
        query += "WHERE vamc.StateAbbr =  " + id;
		query += "GROUP by VAMCID, vamc.VAMC, STA3N, visn.NetworkName, visn.RegionServed";
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

            res.send(recordset);
        });

    });
    
});

app.get('/totalRiskbyVAMC', function(req, res){
    res.header("content-type: application/json");
    var data = [];
    var numRisks = [];
    var pctRisks = [];

    var id = req.param("id");
    if (!id) {
        id = 1;
    }
    var query = '';
    if (id) {
        console.log("Registering endpoint: /totalRiskbyVAMC/:id is " + id);
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
                numRisks.push([
                    "PTSD", 
                    recordset[i].PTSD                    
                ]);
                numRisks.push([
                    "Substance Abuse", 
                    recordset[i].SubstanceAbuseHistory                    
                ]);
                numRisks.push([
                    "Hospitilized", 
                    recordset[i].Hospitilized                    
                ]);
                numRisks.push([
                    "Previous Attempts", 
                    recordset[i].PreviousAttempts                    
                ]);
                numRisks.push([
                    "Diagnosed TBI", 
                    recordset[i].DiagnosedTBI                    
                ]);
            }
            data.push({
                "key": "RISKS",
                "values": numRisks
            });

            res.send(data);
        });

    });
    
});

app.get('/totalRiskByState', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var id = req.param("id");
    /*if (!id) {
        id = 1;
    }*/
    var query = '';
    if (id) {
        console.log("Registering endpoint: /totalRiskByState/:id is " + id);
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
        query += "AND vet.State = " + id;
        console.log("Query: " + query);
    } else {
        console.log("Registering endpoint: /totalRiskByState/");
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
        //query += "AND vet.State = " + id;
        console.log("Query: " + query);
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

console.log("Registering endpoint: /user/:id");
app.get('/user', function(req, res){
    res.header("content-type: application/json");
    res.send('user is ' + req.param("id"));
}); 

app.listen(3000);