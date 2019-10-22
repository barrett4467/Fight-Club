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
  app.get("/fight/:id", function(req, res) {
    db.Characters.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data){
      var hbsObject = {
        character: data
      }
      console.log("The HBSOBJECT IS :" + data.image)
      res.render("fight",hbsObject);
    });
  });
  app.get("/leaderboard", function(req, res) {
    res.render("leaderboard");
  });
};