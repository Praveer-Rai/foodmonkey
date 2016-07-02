module.exports = commentRoutes;

function commentRoutes(passport) {

    var commentController = require('./commentController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/comments')
        .post(commentController.postComment);

    router.route('/comments/:recipeId')
        .get(commentController.getComments);

    router.route('/comments/:comment_id')
        .get(commentController.getComment)
        .put(commentController.putComment)
        .delete(commentController.deleteComment);
    return router;
}