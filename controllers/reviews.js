const express = require('express');
const router = express.Router();

const Review = require('../models/review');

/* GET - all reviews
 * API Endpoint: GET /reviews/
 */
router.get('/', (req, res) => {
	Review.find({}).then((dbReviews) => {
		res.send(dbReviews);
	});
});

/* GET - all reviews for a restaurant
 * GET /reviews/restaurant=:restaurant_id
 */
router.get('/restaurant=:id', (req, res) => {
	let restaurant_id = req.params.id;
	Review.find({ 'restaurant_id': restaurant_id }).then((restaurantReviews) => {
		res.send(restaurantReviews);
	});
 });

/* GET - a review by id
 * GET /reviews/:review_id
 */
router.get('/:id', (req, res) => {
	let review_id = req.params.id;
	Review.find({ id: review_id }).then((review) => {
		res.send(review);
	});
});

/* POST - Create a new restaurant review
 * /reviews/
 *
 * Review Object = {
 *  "restaurant_id": integer
 *  "name": String
 * 	"rating": integer
 *  "comments": String
 * }
 */
router.post('/', (req, res) => {
	const newReview = new Review({
		restaurant_id: req.body.restaurant_id,
		name: req.body.name,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		rating: req.body.rating,
		comments: req.body.comments,
	});

	newReview.save().then((savedReview) => {
		res.send(savedReview);
	});
});

/* PUT - Update a restaurant review
 * PUT /reviews/:review_id	
 * review_id: integer
 * 
 * Review Object = {
 *  "name": String
 * 	"rating": integer
 *  "comments": String
 * }
 */
router.put('/:id', (req, res) => {
	let review_id = req.params.id;
	Review.findOneAndUpdate({ id: review_id },{
		"name": req.body.name,
		"rating": req.body.rating,
		"comments": req.body.comments,
		"updatedAt": new Date().toISOString()
	}, { new: true }).then((review) => {
			res.send(review);
	}).catch((err) => {
		console.error(`Error updating Restaurant Review ${review_id}. Error Message: ${err}`);
		res.send('Review Not Found');
	});
});

/* DELETE - a restaurant review
 * DELETE /reviews/:review_id
 * review_id: integer
 */
router.delete('/:id', (req, res) => {
	let review_id = req.params.id;
	Review.remove({ id: review_id }).then((err) => {
		if (err) console.error(`Error removing Restaurant Review ${review_id}. Error Message: ${err}`);
		console.log('Review Removed Successfully');
		res.send('Review Successfully Deleted');
	})
});

module.exports = router;