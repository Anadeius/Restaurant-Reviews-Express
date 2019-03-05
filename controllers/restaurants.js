const express = require('express');
const router = express.Router();

const Restaurant = require('../models/restaurant');

/* Get all restaurants
 * API Endpoint: GET /restaurants/
 */
router.get('/', (req, res, next) => {
	Restaurant.find({}).then((dbRestaurants) => {
		res.send(dbRestaurants);
	});
});

/* Get favorite restaurants
 * GET /restaurants/favorite=:is_favorite is_favorite={true|false}
 */
router.get('/favorite=:is_favorite', (req, res) => {
	let favoriteBool = req.params.is_favorite;
	Restaurant.find({ is_favorite: favoriteBool }).then((favoriteRestaurants) => {
		res.send(favoriteRestaurants);
	});
 });

/* Get a restaurant by id
 * API Endpoint: GET /restaurants/:restaurant_id
 */
router.get('/:id', (req, res) => {
	let restaurant_id = req.params.id;
	Restaurant.find({ id: restaurant_id }).then((restaurant) => {
		res.send(restaurant);
	});
});

/* Put - Favorite/Unfavorite a Restaurant
 * API PUT /restaurants/:restaurant_id/favorite={true | false}
 */
router.put('/:id/favorite=:is_favorite', (req, res) => {
	let restaurant_id = Number(req.params.id);
	let favoriteBool = req.params.is_favorite;
	Restaurant.findOneAndUpdate({ id: restaurant_id }, { is_favorite: favoriteBool }, { new: true }).then((restaurant) => {
		res.send(restaurant);
	}).catch((err) => {
		console.error(`Could not find restaurant ${restaurant_id}. Error: ${err}` );
		res.send('Restaurant Not Found');
	});
});

module.exports = router;