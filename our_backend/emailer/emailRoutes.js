module.exports = emailRoutes;


function emailRoutes(passport) {

    var emailController = require('./emailController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/sendemail')
        .post(emailController.sendemail);

    return router;
}