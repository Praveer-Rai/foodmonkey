/**
 * Created by Florian Noack on 05.06.2016.
 */
var Ingredient = require('./ingredientSchema');

exports.postIngredient = function(req, res) {

    var ingredient = new Ingredient(req.body);

    /*
    if (!req.user.equals(ingredient.user)) {
        res.sendStatus(401);
    }
    */
    ingredient.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/ingredients for GET
module.exports.getIngredients = function(req, res) {
    Ingredient.find(function(err, ingredients) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(ingredients);
    }).populate('user');
};


// Create endpoint /api/ingredients/:ingredient_id for GET
exports.getIngredient = function(req, res) {
    // Use the Beer model to find a specific beer
    Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(ingredient);
    });
};

// Create endpoint /api/ingredients/:ingredient_id for PUT
exports.putIngredient = function(req, res) {
    // Use the Beer model to find a specific beer
    Ingredient.findByIdAndUpdate(
        req.params.ingredient_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, ingredient) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(ingredient);
        });

};

// Create endpoint /api/ingredients/:ingredient_id for DELETE
exports.deleteIngredient = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Ingredient.findById(req.params.ingredient_id, function(err, m) {
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
