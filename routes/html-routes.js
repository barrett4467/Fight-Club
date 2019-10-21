var path = require("path");
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/characters", function(req, res) {
    db.Characters.findAll({}).then(function(data) {
      var hbsObject = {
        characters: data
      };
      res.render("characters",hbsObject);
    });
  });
  app.get("/fight", function(req, res) {
    res.render("fight");
  });
  app.get("/leaderboard", function(req, res) {
    res.render("leaderboard");
  });
};
