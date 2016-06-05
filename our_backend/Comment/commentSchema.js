var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema ({
    
    text: String,
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', commentSchema);