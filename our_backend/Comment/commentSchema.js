var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema ({
    
    txt: String,
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    forRecipe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
});

module.exports = mongoose.model('Comment', commentSchema);