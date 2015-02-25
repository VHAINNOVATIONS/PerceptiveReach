'use strict';

// Development specific configuration
// ==================================
exports.config = {
  // Reach database connection params
 
    user: 'sa',
    password: 'agile_123',
    server: '54.225.232.25', // You can use 'localhost\\instance' to connect to named instance
    database: 'Reach_Test',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};


