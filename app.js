//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://SDP_project:soodthedude@abhigrith.0o5du.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true}, {useUnifiedTopology: true})
.then(() => {
    console.log("Connected");
});

const articleSchema = {
    name: String,
    username: String,
    owner_name: String,
    owner_contact: Number,
    address: String
}

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

.get(function (req, res) {
    Article.find(function (err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }

    });
})

    .post(function (req, res) {


        const newArticle = new Article({
            name: req.body.name,
            username: req.body.username,
            owner_name: req.body.owner_name,
            owner_contact: req.body.owner_contact,
            address: req.body.address
        });

        newArticle.save(function (err) {
            if (!err) {
                res.send("Sucessfully added a new article.");
            } else {
                res.send(err);
            }
        });
    })

    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("sucessfully deleted all articles");
            } else {
                res.send(err);
            }
        });
    });
//TRIALLLLLLLLLL


const userSchema = {
    email: String,
    password: String

}

const User = new mongoose.model("User", userSchema);

app.post("/signup", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function (err) {
        if (!err) {
            res.send("ADDED");
        } else {
            res.send(err);
        }
    });
});

app.post("/login", function (req, res) {
    const email = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, founduser){
        if(err){
            console.log(err);
        } else {
            if (foundUser){
                if(foundUser.password === password){
                    res.send("changed 0 to 1");
                }
            }
        }

    })


})


app.listen(3000, function () {
    console.log("Server started on port 3000");
});