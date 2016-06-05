/**
 * Created by flori on 05.06.2016.
 */

var Config = require('../config/config.js');
var mongoose = require('mongoose'),
    userSchema = require('../user/userSchema');

mongoose.connect([Config.db.host, '/', Config.db.name].join(''),{
    //eventually it's a good idea to make this secure
    user: Config.db.user,
    pass: Config.db.pass
});

// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
var User = mongoose.model('User', userSchema);

var user = new User({
    firstName: "asd",
    lastName: "Mustermann",
    password: "autoPass",
    email: "AutoUser"
});

user.save(function(err, thorasd) {
    if (err) return console.error(err);
    console.dir(thorasd);
});
