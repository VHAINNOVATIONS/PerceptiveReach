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
var config = require('../../../config/environment');//req.app.get('config');
var sql = require('mssql');

// Get list of things
exports.index = function(req, res) {
    //var config = //req.app.get('config');
    console.log("Registering endpoint: /api/charts/score");
  var connection = new sql.Connection(config.mssql, function(err) {
        // ... error checks
        console.log("Checking database connection...");
      console.log(config.mssql);
        if (err) { 
        console.log("Database connection failed!"); 
        return handleError(res, err); 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
      console.log("Setup Query connection...");
        request.query('SELECT Score, count(*) as Total FROM AnalyticsOutput group by score', function(err, recordset) {
            console.log("executing query...");
            // ... error checks
            if (err) { 
            console.log("Query failed!"); 
            return handleError(res, err);
            }

            console.log(recordset.length);

            /*for (var i = 0; i < recordset.length; i++) 
            { 
                console.log("Row#: " + i + " Last Name: " + recordset[i].lastname + " Firt Name: " + recordset[i].firstname); 
            } */

            res.send(recordset);
            //res.json(200,recordset);
        });

    });
  /*res.json([
  {
  name : 'Development Tools',
  info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
  name : 'Server and Client integration',
  info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
  name : 'Smart Build System',
  info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
  name : 'Modular Structure',
  info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
  name : 'Optimized Build',
  info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
  name : 'Deployment Ready',
  info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  }
  ]);*/
};
function handleError(res, err) {
  return res.send(500, err);
}