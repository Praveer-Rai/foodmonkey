module.exports = commentRoutes;

function commentRoutes(passport) {

    var commentController = require('./commentController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/comment')
        .post(commentController.postComment)
        .get(commentController.getComments);

    router.route('/comment/:comment_id')
        .get(commentController.getComment)
        .put(commentController.putComment)
        .delete(commentController.deleteComment);
    return router;
}