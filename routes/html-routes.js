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
    db.Characters.findOne({
      where: {
        id: 1
      }
    }).then(function(data) {
      character = {
       character: data.dataValues
      }
      console.log(character);
      res.render("fight", character);
    });
  });
  app.get("/leaderboard", function(req, res) {
    res.render("leaderboard");
  });
};
