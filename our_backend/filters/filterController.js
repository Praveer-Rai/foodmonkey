var Recipe = require('../recipe/recipeSchema');

// Create endpoint /api/filters for GET
exports.getFilters = function(req, res) {

    var recipes = Recipe.find(function(err, filters) {
        if (err) {
            res.status(500).send(err);
            console.log(err);
            return;
        }
    })

    recipes.distinct("recipeType",function(err, filters) {
        if (err) {
            res.status(500).send(err);
            console.log(err);
            return;
        }
        res.json(filters);
    });
};