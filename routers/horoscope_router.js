var express = require('express'),
		models	= require('../models')
    request = require("request");

require('dotenv').load();

var horoscopeRouter = express.Router();

// API ENDPOINTS -> Kimono
var horoscope_data_endpoint    = 'https://www.kimonolabs.com/api/8bkgvv0i?apikey=krBN73R0P3yKV0Wkm1dsUJgSexqM0JD1';
var horoscope_forcast_endpoint = 'https://www.kimonolabs.com/api/d4nub8ow?apikey=krBN73R0P3yKV0Wkm1dsUJgSexqM0JD1';

// --------------------------------------------------------------------------------------------------------
// API ENDPOINTS w/ .env APIKEY --------> NOT CURRENTLY WORKING 
// ............................
// var horoscope_data_endpoint    = 'https://www.kimonolabs.com/api/8bkgvv0i?apikey=' + process.env.APIKEY;
// var horoscope_forcast_endpoint = 'https://www.kimonolabs.com/api/d4nub8ow?apikey=' + process.env.APIKEY;
// --------------------------------------------------------------------------------------------------------

// REQUEST Horoscope Data Endpoint
horoscopeRouter.get('/data/:sun_sign', function(req, res) {
	
	var options = {
		url: horoscope_data_endpoint,
		json: true
	};

	request(options, function(err, response, body) {
		var horoscopeData = body.results.horoscope_data.filter(function(obj) {
			return obj.sun_sign.text === req.params.sun_sign;
		})
	  res.send(horoscopeData[0]);
	});
});

// REQUEST Horoscope Forcast Endpoint
horoscopeRouter.get('/forcast/:sun_sign', function(req, res) {
	
	var options = {
		url: horoscope_forcast_endpoint,
		json: true
	};

	request(options, function(err, response, body) {
		var horoscopeForcast = body.results.horoscope_forcast.filter(function(obj) {
			return obj.sun_sign === req.params.sun_sign;
		})
	  res.send(horoscopeForcast[0]);
	});
});

// Export horoscopeRouter as module
module.exports = horoscopeRouter;