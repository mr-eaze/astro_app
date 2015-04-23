var express = require('express');

var horoscopeRouter = express.Router();

// API ENDPOINTS (KIMONO)
var horoscope_data_endpoint    = 'https://www.kimonolabs.com/api/8bkgvv0i?apikey=' + process.env.APIKEY;
var horoscope_forcast_endpoint = 'https://www.kimonolabs.com/api/d4nub8ow?apikey=' + process.env.APIKEY;