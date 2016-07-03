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

// Compile a 'User' model using the userSchema as the structure.
var User = mongoose.model('User', userSchema);

var user = new User({
    firstName: "First",
    lastName: "Last",
    username: "user",
    password: "pass",
    email: "user@example.com"
});

user.save(function(err, thorasd) {
    if (err) return console.error(err);
    console.dir(thorasd);
});
