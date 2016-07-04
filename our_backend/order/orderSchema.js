var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    marketId: {
        type: String,
        default: 'market123'
    },
    paymentMethod: {
        type: String,
        default: 'Paypal'
    },
    shipAddress: String,
    orderStatus: {
        type: String,
        default: 'open'
    },
    extraInfo: String,
    cost: Number,
    amount: Number
});

module.exports = mongoose.model('Order', Order);