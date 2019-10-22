var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
require("dotenv").config();
var db = require("./models");
var passport = require("passport");
var session = require("express-session");

require("./config/passport/passport.js")(passport, db.User);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
