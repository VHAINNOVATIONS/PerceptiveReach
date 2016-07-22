'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var praudit = require('../../audit');

var round = function(r) {
    return Math.round((r + 0.000001) * 100) / 100;
};

exports.index = function(req, res) {
     //res.header("content-type: application/json");
    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;
    var connection = new sql.Connection(config, function(err) {
        if (err) {
            console.dir(err);
            res.send(401, 'DB Connection Error.');
            return; 
        }
        var request = new sql.Request(connection);
        var STA3N = req.param("STA3N");

        // Configure WHERE clause if needed
        var whereClause = '';
        if (STA3N !== null){
            whereClause = " WHERE VAMC = @STA3N";
        } else {
            res.send(401, []);
            return;
        }

        // Configure Database Query
         if (STA3N && validator.isInt(STA3N)) {
            request.input('STA3N', sql.Int, STA3N);
        }

        var query = 'SELECT * FROM staging.FacilityResults ' + whereClause;
        // Query the database
        request.query(query, function(err, recordset) {
            if (err) { 
                connection.close();
                console.dir(err);
                praudit.auditlog('SQL ERROR',err);
                res.send(401, 'Query Failed.');
                return; 
            }

            connection.close();
            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            if (jsonRecordSet && jsonRecordSet.length) {
                var result = jsonRecordSet.reduce(function(r, v, index) {
                    r[0].values.push({
                        x: index + 1,
                        y: round(v.Upper),
                        size: 0
                    });
                    r[1].values.push({
                        x: index + 1,
                        y: round(v.Lower),
                        size: 0
                    });
                    r[2].values.push({
                        x: index + 1,
                        y: round(v.Pred),
                        size: 0
                    });
                    if (v.IPWResponse > -1) {
                        r[3].values.push({
                            x: index + 1,
                            y: v.IPWResponse,
                            size: 64
                        });
                    }
                    if (v.SA_new > -1) {
                        r[3].values.push({
                            x: index + 1,
                            y: v.SA_new,
                            size: 64,
                            color: "#FF0000"
                        });
                    }
                    return r;
                }, [
                {
                    key: 'Upper Limit',
                    values: [],
                    color: "#000000"
                }, {
                    key: 'Lower Limit',
                    values: [],
                    color: "#000000"
                }, {
                    key: 'Best Fit',
                    values: [],
                    color: "#000000"
                }, {
                    key: 'Actual',
                    values: [],
                    color: "#0000FF"
                }]);
                console.log(result);
                res.send(result);
            } else {
                res.send([]);
            }
        });

    });
};

