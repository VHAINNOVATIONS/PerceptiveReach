'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/perceptivereach-dev'
  },
  
  // MSSQL connection options
  mssql: {
    user: 'sa',
    password: 'agile_123',
    server: '54.225.232.25', // You can use 'localhost\\instance' to connect to named instance
    database: 'Reach',
    stream: true, // You can enable streaming globally
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
  },
  seedDB: true
};
