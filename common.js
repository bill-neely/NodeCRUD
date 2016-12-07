const MongoClient = require('mongodb').MongoClient
co = require('co'),
assert = require('assert');

module.exports = {
	getData: function () {
		return theData();
	},

	openDB: function () {
		return openTheDB();
	}
};

function theData() {
	return "Hello from theData in common.js"
}

function myOpenDB() {
	MongoClient.connect('mongodb://bill:652IcDFOy@ds119788.mlab.com:19788/nodecrud', (err, database) => {
		if (err) return console.log(err);
		db = database;
		return db;
	})
}

function openTheDB () {
	co(function*() {
  // Connection URL
  var url = 'mongodb://localhost:27017/myproject';
  // Use connect method to connect to the Server
  var db = yield MongoClient.connect(url);
  // Close the connection
  db.close();
}).catch(function(err) {
	console.log(err.stack);
})
}