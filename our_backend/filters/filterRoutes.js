module.exports = filterRoutes;


function filterRoutes(passport) {

    var filterController = require('./filterController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/filters')
        .get(filterController.getFilters);

    return router;
}