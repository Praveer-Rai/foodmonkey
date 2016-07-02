var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    ingredients: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    marketId: String,
    paymentMethod: String,
    shipAddress: String,
    extraInfo: String
});

module.exports = mongoose.model('Order', Order);