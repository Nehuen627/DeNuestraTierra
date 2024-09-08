import mysql from "mysql2"
import config from "../config/envConfig.js"

const pool = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbDb
});

const promisePool = pool.promise();

pool.query('SELECT * FROM yourTable', (err, results, fields) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Database results:', results);
    }
  });
  
export default promisePool