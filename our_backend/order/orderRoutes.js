module.exports = orderRoutes;


function orderRoutes(passport) {

    var orderController = require('./orderController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/orders')
        .post(orderController.postOrder)
        .get(orderController.getOrders);

    router.route('/order/:order_id')
        .get(orderController.getOrder)
        .put(orderController.putOrder)
        .delete(orderController.deleteOrder);
    return router;
}