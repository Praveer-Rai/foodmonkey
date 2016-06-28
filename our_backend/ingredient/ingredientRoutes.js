module.exports = ingredientRoutes;


function ingredientRoutes(passport) {

    var ingredientController = require('./ingredientController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/ingredients')
        .post(ingredientController.postIngredient)
        .get(ingredientController.getIngredients);

    router.route('/ingredients/:ingredient_id')
        .get(ingredientController.getIngredient)
        .put(ingredientController.putIngredient)
        .delete(ingredientController.deleteIngredient);

    return router;
}