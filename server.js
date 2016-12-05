const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient


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

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
		if (err) return console.log(err);
		res.render('index.ejs', {quotes: result});
	})
})


app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err);
		console.log('saved to database');
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