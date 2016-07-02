// Load required packages
var mongoose = require('mongoose');

// Define our recipe schema
var Recipe   = new mongoose.Schema({
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    prepTime: {type: Number, min: 1},
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy'
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    description: String,
    steps: [String],
    createdOn: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    mainImageId: String,
    thumbnailImageId: String,
    recipeType: String
});

// Export the Mongoose model
module.exports = mongoose.model('Recipe', Recipe);