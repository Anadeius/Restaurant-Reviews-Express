const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api_server = express();
const port = process.env.PORT || 3000;

const mongo = {
	user: process.env.mongoUser,
	pass: process.env.mongoPass
};

api_server.use(cors());

api_server.use(bodyParser.json());

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
mongoose.connect(`mongodb+srv://${mongo.user}:${mongo.pass}@rreviews-o1kbm.mongodb.net/restaurant-reviews?retryWrites=true`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('MongoDB connected to Restaurant Reviews DB');
});
autoIncrement.initialize(db);

const restaurants = require('./controllers/restaurants');
api_server.use('/restaurants', restaurants);

const reviews = require('./controllers/reviews');
api_server.use('/reviews', reviews);

api_server.listen(port, () => {
	console.log(`Restaurant Database API Server listening on port ${port}`);
});