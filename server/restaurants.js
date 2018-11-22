const express = require('express');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const router = express.Router();

mongoose.connect('mongodb://localhost:27017/restaurants');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('MongoDB connected for Restaurants');
});
autoIncrement.initialize(db);

const restaurantSchema = mongoose.Schema({
	name: String,
	neighborhood: String,
	photograph: Number,
	address: String,
	latlng: Object,
	cuisine_type: String,
	operating_hours: Object,
	createdAt: Date,
	updatedAt: Date,
	id: Number,
	is_favorite: Boolean
});

restaurantSchema.plugin(autoIncrement.plugin, { model: 'Restaurant', field: 'id' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

/* Get all restaurants
 * API Endpoint: http://localhost:port/restaurants/
 */
router.get('/', (req, res, next) => {
	Restaurant.find({}).then((dbRestaurants) => {
		res.send(dbRestaurants);
	});
});

/* Get favorite restaurants
 * API Endpoint: http://localhost:port/restaurants/favorite={true || false}
 */
router.get('/favorite=:is_favorite', (req, res) => {
	let favoriteBool = req.params.is_favorite;
	Restaurant.find({ is_favorite: favoriteBool }).then((favoriteRestaurants) => {
		res.send(favoriteRestaurants);
	});
 });
/* Get a restaurant by id
 * API Endpoint: http://localhost:port/restaurants/<restaurant_id>
 * restaurant_id: integer
 */
router.get('/:id', (req, res) => {
	let restaurant_id = req.params.id;
	Restaurant.find({ id: restaurant_id }).then((restaurant) => {
		res.send(restaurant);
	});
});

/* Put - Favorite/Unfavorite a Restaurant
 * API Endpoint: http://localhost:port/restaurants/<restaurant_id>/?is_favorite={true || false}
 * restaurant_id: integer
 */
router.put('/:id/favorite=:is_favorite', (req, res) => {
	let restaurant_id = req.params.id;
	let favoriteBool = req.params.is_favorite;
	Restaurant.find({ id: restaurant_id }).then((restaurant) => {
		restaurant.is_favorite = favoriteBool;
		restaurant.save((err) => {
			if (err) console.error(`Error updating Restaurant Favorite. Error: ${err}`);
			console.log('Favorite Restaurant Updated Successfully');
			res.send(restaurant);
		});
	});
});

module.exports = router;