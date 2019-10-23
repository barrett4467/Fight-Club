var path = require("path");
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.user) {
      var data = {
        email: req.user.email
      };
    } else {
      var data = {};
    }
    res.render("index", data);
  });
  app.get("/characters", function(req, res) {
    db.Characters.findAll({}).then(function(data) {
      var hbsObject = {
        characters: data
      };
      res.render("characters", hbsObject);
    });
  });
  app.get("/fight/:id", function(req, res) {
    db.Opponents.findOne({
      where: {
        id: Math.floor(Math.random() * 4) + 1
      }
    }).then(function(data1) {
      db.Characters.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
        res.render("fight", {
          opponent: data1,
          character: data
        });
      });
    });
  });
  app.get("/leaderboards", function(req, res) {
    db.LeaderBoard.findAll({}).then(function(data) {
      var hbsObject = {
        leaders: data
      };
      console.log(hbsObject);
      res.render("leaderboard");
    });
  });
};
