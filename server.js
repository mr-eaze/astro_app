var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    // request          = require('request'),
    models           = require('./models'),
    User             = models.users,
    bcrypt		     = require('bcrypt'),
    session		     = require('express-session'),
    userRouter       = require('./routers/user_router.js');
    // kimono           = require('kimono-api').kimono;

var app = express();
require('dotenv').load();

// KIMONO ENDPOINTS
var horoscope_data_endpoint    = 'https://www.kimonolabs.com/api/8bkgvv0i?apikey=' + process.env.APIKEY;
var horoscope_forcast_endpoint = 'https://www.kimonolabs.com/api/d4nub8ow?apikey=' + process.env.APIKEY;

// Server Configuration
app.use( logger('dev') );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( express.static( path.join( application_root, 'public' )));
app.use( express.static( path.join( application_root, 'browser' )));

app.use('/users', userRouter);

// app.use(session({
// 	secret: 'nothingIsSecret',
// 	saveUnitialized: false,
// 	resave: false
// }));




// USER ROUTES




// Daily Horoscope Requests

// post request to sessions

// Get
	
	// Horoscope Data

	// app.get('/users/:sun_sign')

	// Daily Forcast

// Export app as module
module.exports = app;
