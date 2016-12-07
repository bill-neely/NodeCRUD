//const MongoClient = require('mongodb').MongoClient
require('mongodb');

module.exports = {
	getQuote: function (db, parm) {
		return queryQuotes(parm)
	}
}

function queryQuotes(db, parm) {
	console.log('Start queryQuotes');
	return getMongo(parm);
	//console.log("getting Mongo")
	//db = getMongo();
	//console.log('Mongo = ' + db);
	//db.collection('quotes').find(parm).toArray((err, result) => {
	//	return result;
	//})
}

function getMongo(db, parm) {
	console.log("In GetMongo");
	console.log(db);
	//MongoClient.connect('mongodb://bill:652IcDFOy@ds119788.mlab.com:19788/nodecrud', (err, database) => {
	//	console.log("in MongoClient.connect");
	//	if (err) return console.log(err);
	//	db = database
	//	db.collection('quotes').find(parm).toArray((err, result) => {
	//		return result;
	//	})
	//})
}