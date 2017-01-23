var express = require('express');
var app= express();
var mongojs = require('mongojs');
var db = mongojs('booking',['booking']);
var bodyParser= require('body-parser');

var config = require('./Booking.json');
app.use(express.static(__dirname+ "/public"));
//app.use(bodyParser.json());
app.use(bodyParser.json());

app.get('/BookingData', function (req, res) {
  res.json(config);
});
app.listen(3600);