# Platform-Event-Through-Node
This is a node app that pushes Platform Events into Salesforce

### Installation

### Getting Started
Run the following in the terminal
```
	npm install 
	node index.js
```
You can send platform events in using curl
curl -H "Content-Type: application/json" -X POST -d '{"Serial_Number__c":"abcdefghijklmn","Temperature__c":37}' http://localhost:3000/FridgeEvent

### Deploy to Heroku
Once you have tested on local, you can deploy to heroku by doing
```
	heroku login
	heroku git:remote -a <your_heroku_app>
	git add .
	git commit -am "inital commit to heroku"
	git push heroku master
```
