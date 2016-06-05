var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ingredientSchema = new Schema ({

    price: Number,
    name: String,
    quantity: String
});

module.exports = mongoose.model('Ingredient', ingredientSchema);