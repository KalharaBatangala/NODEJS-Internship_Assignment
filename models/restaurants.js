const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;