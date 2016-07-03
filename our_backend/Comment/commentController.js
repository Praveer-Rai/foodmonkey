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


exports.getComment = function(req, res) {
    console.log('in the comment backend');

    Comment.findById(
        req.params.comment_id,
        function(err, comment) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(comment);
    });
};

exports.putComment = function(req, res) {
    Comment.findOneAndUpdate(
        {_id: req.query.comment_id},
        {$set: {txt: req.body.txt}},
        {
            //pass the new object to cb function
            new: true,
            upsert: true
            //run validations
            //runValidators: true
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
    });
};
