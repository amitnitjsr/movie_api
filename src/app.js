const express = require('express');
const router = require('./controllers/RouterController').default;
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan"); 
const compression = require("compression"); 
const helmet = require("helmet");
const responseTime = require('response-time');
const app = express();

app.use(compression()); 
app.use(responseTime());
app.use(morgan('combined'));
app.use(helmet()); 

app.use(cors({  
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);

export default app;