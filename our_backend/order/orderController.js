/**
 * Created by Florian Noack on 05.06.2016.
 */
var Order = require('./orderSchema');

exports.postOrder = function (req, res) {

    var order = new Order(req.body);

    order.save(function (err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/Order for GET
exports.getOrders = function (req, res) {
    Order.find(function (err, orders) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(orders);
    }).populate('user').populate('ingredients');
};

// Create endpoint /api/OpenOrder for GET
exports.getOpenOrdersForUser = function (req, res) {
    Order.find({orderStatus: 'open', user: req.params.userId}, function (err, orders) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(orders);
    }).populate('user').populate('ingredients');
};

// Create endpoint /api/OpenOrder for GET
exports.getAllOrdersForUser = function (req, res) {
    Order.find({user: req.params.userId}, function (err, orders) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(orders);
    }).populate('user').populate('ingredients');
};


// Create endpoint /api/order/:order_id for GET
exports.getOrder = function (req, res) {
    // Use the Beer model to find a specific beer
    Order.findById(req.params.order_id, function (err, order) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        ;

        res.json(order);
    }).populate('user').populate('ingredients');
};

// Create endpoint /api/orders/:order_id for PUT
exports.putOrder = function (req, res) {
    // Use the Order model to find a specific order
    Order.findByIdAndUpdate(
        req.params.order_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, order) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(order);
        });

};

// Create endpoint /api/updateOrderStatus/ for MARKING order as DELETED
exports.updateOrderStatus = function (req, res) {
    Order.findOneAndUpdate({_id: req.body.orderId}, {$set: {orderStatus: req.body.status}}, {new: true}, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating order status!");
        }
        res.status(200);
        res.json(doc);
    });
};

// Create endpoint /api/orders/:order_id for DELETE
exports.deleteOrder = function (req, res) {
    Order.findById(req.params.order_id, function (err, m) {
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
