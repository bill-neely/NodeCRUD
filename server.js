const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const common = require('./common')
const quote = require('./quote')
//var db = common.openDB();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

MongoClient.connect('mongodb://bill:652IcDFOy@ds119788.mlab.com:19788/nodecrud', (err, database) => {
	if (err) return console.log(err);
	db = database;
	app.listen(3000, function() {
		console.log('listening on 3000');
	})
})

app.get('/nice', (req, res) => {
	res.send(common.getData());
})

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
		if (err) return console.log(err);
		res.render('index.ejs', {quotes: result});
	})
})

app.get('/api/quote/:id', (req, res) => {
	var id = req.params['id'];
	var parms = {'_id': new ObjectID(id)};
	db.collection('quotes').find(parms).toArray((err, result) => {
		if (err) res.render(err);
		res.json(result);
	})
})

app.get('/api/quote/', (req, res) => {
	var parms = {};
	console.log(db);
	var result = quote.getQuote(db, parms);
	console.log(result)
	res.json(result);
	//db.collection('quotes').find(parms).toArray((err, result) => {
	//	if (err) res.render(err);
	//	res.json(result);
	//})
})


app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err);
		console.log('saved to database');
		console.log(db);
		res.redirect('/');
	})
})

app.put('/quotes', (req, res) => {
	db.collection('quotes')
		.findOneAndUpdate({name: 'Yoda'}, {
			$set: { 
				name: req.body.name,
				quote: req.body.quote
			}
		}, {
			sort: {_id: -1},
			upsert: true
		}, (err, result) => {
			if (err) return res.send(err)
			res.send(result)
		})
})

app.delete('/quotes', (req, res) => {
	db.collection('quotes')
		.findOneAndDelete({name: 'Darth Vadar'}, {
			$set: {
				name: req.body.name
			}
		}, (err, result) => {
			if (err) return res.send(500, err)
			res.send('A Darth Vadar quote was deleted')
		})
})