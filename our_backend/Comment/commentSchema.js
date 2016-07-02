var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema ({
    
    txt: String,
    creator:{
        type: mongoose.Schema.Types.Object,
        ref: 'User'
    },
    forRecipe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    createdOn:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);