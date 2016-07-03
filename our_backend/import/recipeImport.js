/**
 * Created by flori on 05.06.2016.
 */

var Config = require('../config/config.js');
var mongoose = require('mongoose'),
    recipeSchema = require('../recipe/recipeSchema'),
    userSchema = require('../user/userSchema'),
    ingredientSchema = require('../ingredient/ingredientSchema'),
    commentSchema = require('../comment/commentSchema');;

var db = mongoose.connection;
mongoose.connect([Config.db.host, '/', Config.db.name].join(''),{
    //eventually it's a good idea to make this secure
    user: Config.db.user,
    pass: Config.db.pass
});


// Compile a 'recipe' model using the recipeSchema as the structure.
var Recipe = mongoose.model('Recipe', recipeSchema);
var User = mongoose.model('User', userSchema);
var Ingredient = mongoose.model('Ingredient', ingredientSchema);
var Comment = mongoose.model('Comment', commentSchema);


var recipe = new Recipe({
    title: "New Title",
    user: u_1 = new User({
        firstName: "ingo",
        lastName: "deuter",
        username: "testUser_1",
        email: "recipeUserfoodmonkecom",
        password: "asdakjshdkl"
    }),
    prepTime: 30,
    difficulty: "easy",
    ingredients: [
        i_1 = new Ingredient({
            price: 2.50,
            name: "Milk",
            quantity: ""
        })
    ],
    description: "Just cook it!",
    steps:[
        "Open oven", "Put it in the oven", "Close oven"
    ],
    rating: 4,
    comment: [
        c_1 = new Comment({
            text: "Tastes like shit",
            creator: u_2 = new User({
                firstName: "hans",
                lastName: "wurstwasser",
                username: "testUser_2",
                email: "commentUserfoodmonkeycom",
                password: "asdasd"
            })
        })
    ],
    mainImageId: "http://someSource",
    thumbnailImageId: "http://someOtherSource"
})

u_1.save(function(err, thor) {
    if (err) return console.error(err);
    console.dir(thor);
});

u_2.save(function(err, thor2) {
    if (err) return console.error(err);
    console.dir(thor2);
});

i_1.save(function(err, thor) {
    if (err) return console.error(err);
    console.dir(thor);
});

c_1.save(function(err, thor) {
    if (err) return console.error(err);
    console.dir(thor);
});

recipe.save(function(err, thor) {
    if (err) return console.error(err);
    console.dir(thor);
});
