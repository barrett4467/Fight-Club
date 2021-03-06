var db = require("../models");
var isLoggedIn = require("../config/middleware/isLoggedIn");
var authController = require("../controllers/authController.js");
var passport = require("passport");

module.exports = function(app) {
  // Render all characters on to the page
  app.get("/api/characters", function(req, res) {
    db.Characters.findAll({}).then(function(data) {
      res.json(data);
    });
  });
  app.get("/api/opponents", function(req, res) {
    db.Opponents.findAll({}).then(function(data) {
      res.json(data);
    });
  });
  // render the selected character to the fight html page
  app.get("/api/characters/:id", function(req, res) {
    db.Characters.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
  app.get("/api/opponents/:id", function(req, res) {
    db.Opponents.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
  app.post("/api/fight/:id", function(req, res) {
    console.log(`The req.body contains ${req.params.id}`);
    db.Characters.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      console.log(`The data contains ${data}`);
      res.json(data);
    });
  });
  app.get("/api/fight/:id", function(req, res) {
    db.Characters.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
  app.post("/api/leaderboards/", function(req, res) {
    console.log(req.user);
    console.log("This: " + req.body.score);
    db.LeaderBoard.create( {
      ranking: 1,
      name: req.user.email,
      score: req.body.score,
      UserId: req.user.id
    }).then(function(data) {
      res.json(data);
    });

  });
  app.get("/api/leaderboards/", function(req, res) {
    db.LeaderBoard.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  //Auth info
  app.get("/logout", authController.logout);
  app.get("/login", authController.login);
  app.get("/signup", authController.signup);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup"
    })
  );
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );
};
