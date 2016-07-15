'use strict';

var _ = require('lodash');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
  //res.header("content-type: application/json");

  var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

    var id = req.param("id");
    var query = '';
    if (id) {
        query = "SELECT * FROM  "
        query += "WHERE a.ReachID =  " + id;
    } else {
        res.send("ERROR: ReachID  is required.");
    }

    var connection = new sql.Connection(config, function(err) {
        if (err) { 
            console.dir(err);
            res.send(401, 'DB Connection Error.');
            return; 
        }

        var request = new sql.Request(connection);
        request.query(query, function(err, recordset) {
            if (err) { 
                connection.close();
                console.dir(err);
                res.send(401, 'Query Failed.');
                return; 
            }

            connection.close();
            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            res.send(jsonRecordSet);
        });

    });
  
};