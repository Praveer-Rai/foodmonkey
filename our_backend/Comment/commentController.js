/**
 * Created by Florian Noack on 05.06.2016.
 */
var Comment = require('./commentSchema');

exports.postComment = function(req, res) {

    var comment = new Comment(req.body);

    comment.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/Comment for GET
exports.getComments = function(req, res) {
    Comment.find(
        {forRecipe: req.query.recipeId},
        function(err, comments) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(comments);
    });
};


// Create endpoint /api/movies/:movie_id for GET
exports.getComment = function(req, res) {
    // Use the Beer model to find a specific beer
    Comment.findById(
        {_id: req.query.comment_id},
        function(err, comment) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(comment);
    });
};

// Create endpoint /api/movies/:movie_id for PUT
exports.putComment = function(req, res) {
    // Use the Beer model to find a specific beer
    Comment.findByIdAndUpdate(
        req.query.comment_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, comment) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(comment);
        });

};

// Create endpoint /api/movies/:movie_id for DELETE
exports.deleteComment = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Comment.findById(req.query.comment_id, function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        } else {
            m.remove();
            res.sendStatus(200);
        }
        
        //authorize
        /*
        if (m.user && req.user.equals(m.user)) {
            m.remove();
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
        */
    });
};
