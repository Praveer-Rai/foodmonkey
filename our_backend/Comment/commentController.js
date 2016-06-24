/**
 * Created by Florian Noack on 05.06.2016.
 */
var Comment = require('./commentSchema');

exports.postComment = function(req, res) {

    var comment = new Comment(req.body);

    //do not allow user to fake identity. The user who postet the movie must be the same user that is logged in
    if (!req.user.equals(comment.user)) {
        res.sendStatus(401);
    }

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
    Comment.find(req.params.recipe_id, function(err, comments) {
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
    Comment.findById(req.params.comment_id, function(err, comment) {
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
        req.params.comment_id,
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
    Comment.findById(req.params.comment_id, function(err, m) {
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
