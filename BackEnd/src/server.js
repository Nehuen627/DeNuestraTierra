import app from './app.js';
import config from './config/envConfig.js'
import init from './db/db.js';

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
