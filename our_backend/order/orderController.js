/**
 * Created by Florian Noack on 05.06.2016.
 */
var Order = require('./orderSchema');

exports.postOrder = function(req, res) {

    var order = new Order(req.body);

    //do not allow user to fake identity. The user who postet the movie must be the same user that is logged in
    if (!req.user.equals(order.user)) {
        res.sendStatus(401);
    }

    order.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/Order for GET
exports.getOrder = function(req, res) {
    Order.find(function(err, orders) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(orders);
    });
};


// Create endpoint /api/order/:order_id for GET
exports.getOrder = function(req, res) {
    // Use the Beer model to find a specific beer
    Order.findById(req.params.order_id, function(err, movie) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(order);
    });
};

// Create endpoint /api/movies/:movie_id for PUT
exports.putOrder = function(req, res) {
    // Use the Beer model to find a specific beer
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

// Create endpoint /api/movies/:movie_id for DELETE
exports.deleteOrder = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Order.findById(req.params.order_id, function(err, m) {
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
