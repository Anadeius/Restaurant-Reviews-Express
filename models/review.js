const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const reviewSchema = mongoose.Schema({
	id: Number,
    restaurant_id: Number,
    name: String,
    createdAt: Date,
    updatedAt: Date,
	rating: Number,
	comments: String
});

reviewSchema.plugin(autoIncrement.plugin, { model: 'Review', field: 'id' });

module.exports = mongoose.model('Review', reviewSchema);