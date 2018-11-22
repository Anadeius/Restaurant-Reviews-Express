const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const dbData = require('../dbData.json');

const restaurantsDB = mongoose.createConnection('mongodb://localhost:27017/restaurants');
const reviewsDB = mongoose.createConnection('mongodb://localhost:27017/reviews');

restaurantsDB.on('error', console.error.bind(console, 'connection error:'));
reviewsDB.on('error', console.error.bind(console, 'connection error:'));
restaurantsDB.once('open', () => {
	console.log('MongoDB connected to Restaurants DB');
});
reviewsDB.once('open', () => {
	console.log('MongoDB connected to Reviews DB');
});
autoIncrement.initialize(restaurantsDB);
autoIncrement.initialize(reviewsDB);

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

const reviewSchema = mongoose.Schema({
	id: Number,
    restaurant_id: Number,
    name: String,
    createdAt: Date,
    updatedAt: Date,
	rating: Number,
	comments: String
});

restaurantSchema.plugin(autoIncrement.plugin, { model: 'Restaurant', field: 'id' });
reviewSchema.plugin(autoIncrement.plugin, { model: 'Review', field: 'id' });

const Restaurant = restaurantsDB.model('Restaurant', restaurantSchema);
const Review = reviewsDB.model('Review', reviewSchema);

let restaurantData = dbData.restaurants;
let reviewsData = dbData.reviews;

console.log(restaurantData);

restaurantData.forEach((restaurantObj) => {
	restaurantObj.createdAt = new Date(restaurantObj.createdAt).toLocaleString();
	restaurantObj.updatedAt = new Date(restaurantObj.updatedAt).toLocaleString();

	let dbRestaurant = new Restaurant(restaurantObj);
	dbRestaurant.save((err) => {
		if (err) console.error(`Error populating DB. Error Code: ${err}`);
		console.log(`Restaurant DB populated with data`);
	});
});

reviewsData.forEach((reviewObj) => {
	reviewObj.createdAt = new Date(reviewObj.createdAt).toLocaleString();
	reviewObj.updatedAt = new Date(reviewObj.updatedAt).toLocaleString();

	let dbReview = new Review(reviewObj);
	dbReview.save((err) => {
		if (err) console.error(`Error populating DB. Error Code: ${err}`);
		console.log(`Review DB populated with data`);
	});
});