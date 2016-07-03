var Recipe = require('./recipeSchema');
var Comment = require('../comment/commentSchema');

exports.postRecipe = function(req, res) {

    var recipe = new Recipe(req.body);

    //do not allow user to fake identity. The user who postet the recipe must be the same user that is logged in
    if (!req.user.equals(recipe.user)) {
        res.sendStatus(401);
    }

    recipe.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/recipes for GET
exports.getRecipes = function(req, res) {
    Recipe.find(function(err, recipes) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(recipes);
    }).populate('user').populate('ingredients');
};


// Create endpoint /api/recipes/:recipe_id for GET
exports.getRecipe = function(req, res) {
    // Use the Beer model to find a specific beer
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(recipe);
    }).populate('user').populate('ingredients');
};

// Create endpoint /api/recipes/:recipe_id for PUT
exports.putRecipe = function(req, res) {
    // Use the Beer model to find a specific beer
    Recipe.findByIdAndUpdate(
        req.params.recipe_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(recipe);
    });

};

// Create endpoint /api/recipes/:recipe_id for DELETE
exports.deleteRecipe = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Recipe.findById(req.params.recipe_id, function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        //authorize
        if (m.user && req.user.equals(m.user)) {
            m.remove();
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }

    });
};

exports.addNewComment = function(req, res){
    var newComment = new Comment({
        text: req.body.text
    });

    Recipe.findByIdAndUpdate(
        req.params.recipe_id,
        {$push: {comments: newComment}},
        {safe: true, new: true},
        function(err, recipe){
            if (err){
                res.status(500).send(err);
            }
            res.json(recipe);
        }
    )
};