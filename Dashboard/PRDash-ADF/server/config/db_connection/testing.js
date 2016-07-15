'use strict';

// Development specific configuration
// ==================================
exports.config = {
  // Reach database connection params
 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,

    options: {
        encrypt: process.env.DB_ENCRYPT,
        appName:'PerceptiveReach',
        connectTimeout:15000,
        requestTimeout:15000
    },
    pool: {
        max: 2000,
        min: 500,
        idleTimeoutMillis: 3000
    }
};


