const express = require('express');
const path = require('path');
const app = express();
const moment = require('moment');
const members = require('./datas/members');


const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

// Init Middleware
app.use(logger);

// Gets All Members
app.get('/api/members', (req, res, next) => res.json(members));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server is running on port: " + PORT))