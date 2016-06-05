var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recipeSchema = new Schema ({

    name: String,
    text: String,
    creator:{
        
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);