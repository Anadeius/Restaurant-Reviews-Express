const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

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

module.exports = mongoose.model('Restaurant', restaurantSchema);

