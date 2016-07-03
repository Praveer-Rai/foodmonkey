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

// Create endpoint /api/comments for GET
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


// Create endpoint /api/comments/:comment_id for GET
exports.getComment = function(req, res) {
    Comment.findById(
        {_id: req.params.comment_id},
        function(err, comment) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(comment);
    });
};

// Create endpoint /api/comments/:comment_id for PUT
exports.putComment = function(req, res) {
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

// Create endpoint /api/comments/:comment_id for DELETE
exports.deleteComment = function(req, res) {
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
