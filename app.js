// console.log('start node_events');
// C:\Program Files\MongoDB\Server\4.0\bin>mongod.exe --dbpath /Users/hamam/mongo-data
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const db = require('./config/database');
const app = express();
const port =  9000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(express.static('node_modules'));

app.use(session({
    secret: 'hamam',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}));
app.use(flash());

// bring passport
app.use(passport.initialize());
app.use(passport.session());

// store user object

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

const events = require('./routes/event-routes');
app.use('/events', events);

const users = require('./routes/user-routes');
app.use('/users', users);


app.get('/', (req, res) => {
    res.send('Hello Hamam');
});



app.listen(port, () => {
     console.log(`Connect Server on port: ${port}`);
});