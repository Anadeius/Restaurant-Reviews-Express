const express = require('express');
const router = express.Router();

/* GET - all reviews
 * API Endpoint: http://localhost:port/reviews/
 */
router.get('/', (req, res) => {

});

/* GET - all reviews for a restaurant
 * API Endpoint: http://localhost:port/reviews/?restaurant_id=<restaurant_id>
 * restaurant_id: integer
 */
router.get('/?restaurant_id=:id', (req, res) => {

 });

/* GET - a review by id
 * API Endpoint: http://localhost:port/reviews/<review_id>
 * review_id: integer
 */
router.get('/:id', (req, res) => {

});

/* POST - Create a new restaurant review
 * API Endpoint: http://localhost:port/reviews/
 *
 * Review Object = {
 *  "restaurant_id": integer
 *  "name": String
 * 	"rating": integer
 *  "comments": String
 * }
 */
router.post('/', (req, res) => {

});

/* PUT - Update a restaurant review
 * API Endpoint: http://localhost:port/reviews/<review_id>
 * review_id: integer
 * 
 * Review Object = {
 *  "name": String
 * 	"rating": integer
 *  "comments": String
 * }
 */
router.put('/:id', (req, res) => {

});

/* DELETE - a restaurant review
 * API Endpoint: http://localhost:port/reviews/<review_id>
 * review_id: integer
 */
router.delete('/:id', (req, res) => {

});

module.exports = router;