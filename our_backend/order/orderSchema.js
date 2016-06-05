var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema ({

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

module.exports = mongoose.model('Order', orderSchema);