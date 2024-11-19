import mysql from "mysql2";
import config from "../config/envConfig.js";

const pool = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbDb,
    waitForConnections: true,
    queueLimit: 0         
});

const init = pool.promise();

init.query('SELECT 1')
    .then(() => {
        console.log('Successfully connected to MySQL');
    })
    .catch((err) => {
        console.error('Error connecting to MySQL:', err);
    });


export { pool, init };
