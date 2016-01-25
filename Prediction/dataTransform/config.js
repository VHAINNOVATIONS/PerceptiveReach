'use strict';

module.exports = {
  // Reach database connection params
 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,

    options: {
        encrypt: process.env.DB_ENCRYPT 
    }
};
