// Load required packages
var mongoose = require('mongoose');

// Define our recipe schema
var Recipe   = new mongoose.Schema({
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Recipe', Recipe);