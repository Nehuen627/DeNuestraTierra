const MySQLStore = require('express-mysql-session')(require('express-session'));

let sessionStore;

import('./db.js').then((moduleDB) => {
    sessionStore = new MySQLStore({}, moduleDB.pool);
}).catch((err) => {
    console.error('Error importing db.js:', err);
});

module.exports = sessionStore;
