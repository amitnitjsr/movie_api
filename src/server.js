require('dotenv').config();
const app = require('./app').default;

const port = process.env.PORT || 3002;
const host = process.env.HOST || '127.0.0.1';
app.listen(port, host, 1023, () => console.log(`API is running on port ${port}...`));