const express = require('express');
const cors = require('cors');

const api_server = express();
const port = 1337;

api_server.use(cors());

const restaurants = require('./server/restaurants');
api_server.use('/restaurants', restaurants);

const reviews = require('./server/reviews');
api_server.use('/reviews', reviews);

api_server.listen(port, () => {
	console.log(`Restaurant Database API Server listening on port ${port}`);
});