var express = require('express');
var app= express();
var mongojs = require('mongojs');
var db = mongojs('booking',['booking']);
var bodyParser= require('body-parser');

var config = require('./Booking.json');
app.use(express.static(__dirname+ "/public"));
//app.use(bodyParser.json());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendfile('bookingAPI.html');
});
//app.get('/booking',function(req,res){
  //  console.log('recieved a get');

    
    
    
    // // Accessing data from mongo db
    
    //db.booking.find(function(err,docs){
      //  console.log(docs);
        //res.json(docs);
    //});
//});

app.post('/booking',function(req,res){
console.log("#############");
   
	console.log("In server"+" "+req.body+" req"+req);

	var reqBody=req.body;
	var val="";
	for(key in req.body) {
    if(reqBody.hasOwnProperty(key)) {
        var value = reqBody[key];
		console.log(value.id);
        //do something with value;
		 val ={dataId:value.id, carsAvailable:value.availableCars,latitude:value.latitude,longitute:value.longitute,date:value.dateTime,bookingCount:value.noOfBooking};
		//console.log(val);
		}
	}
	console.log(val);
  
   db.booking.insert(val, function(err,doc){
        if(!err){
		console.log("Inserted into Db");
		res.json(doc.carsAvailable);
		
		}           
		else
			console.log(err);
   });
    
    
});
app.get('/BookingData', function (req, res) {
console.log("JSON"+config);
  res.json(config);
});


app.delete('/booking/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.booking.remove({_id:mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
        
    
    });
});

app.get('/booking/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.booking.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
        console.log(doc);
        res.json(doc);
    });
});

app.put('/booking/:id',function(req,res){
    var id= req.params.id;
    console.log("Name in server"+req.body.name);
    db.booking.findAndModify({query:{_id:mongojs.ObjectId(id)},
                                 update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
                                 new: true},function(err,doc){
                                    res.json(doc);
    });
});
    
app.listen(3300);
console.log('Server running in port 3300');