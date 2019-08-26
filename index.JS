const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const membersRouter = require('./routes/api/memberRouter');
const logger = require('./middleware/logger');
const members = require('./datas/members')

// Init Middleware
app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Homepage
app.get('/', (req, res, next) => {
    res.render('index', 
                {   
                    title: 'Member app', 
                    members: members
                })
})

// Members api routes
app.use('/api/members/', membersRouter);


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server is running on port: " + PORT));