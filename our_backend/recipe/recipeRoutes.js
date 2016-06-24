module.exports = recipeRoutes;


function recipeRoutes(passport) {

    var recipeController = require('./recipeController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/recipes')
        .post(recipeController.postRecipe)
        .get(recipeController.getRecipes);

    router.route('/recipes/:recipe_id')
        .get(recipeController.getRecipe)
        .put(recipeController.putRecipe)
        .post(recipeController.addNewComment)
        .delete(recipeController.deleteRecipe);

    return router;
}