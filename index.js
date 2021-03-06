var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	jsforce = require('jsforce'),
	bodyParser = require('body-parser');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

//connect to salesforce
var sfConn = new jsforce.Connection({});
sfConn.login("<username>", "<password>", function(err, userInfo){
	if (err) { return console.error(err); }
	console.log('logged into salesforce');
});

app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/public'));


app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/index.html');
});

//post to fridge event with the json provided in request
app.post('/FridgeEvent', function(req, res, next){
	console.log('raw req body:');
	console.log(req.body);
	console.log('json stringify body:');
	console.log(JSON.stringify(req.body));
	//create salesforce record
	sfConn.sobject("Fridge_Event__e").create({Serial_Number__c : req.body.Serial_Number__c, Temperature__c : req.body.Temperature__c}, function(err, result){
		if(err) 
			return console.error(err);
		console.log("Created record id : " + result.id);
	});

	res.status(200).end();
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
/*
http.listen(3000, function() {
	console.log('listening on port 3000');
});
*/
