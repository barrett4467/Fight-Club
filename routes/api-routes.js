var db = require("../models");

module.exports = function(app) {
  // Render all characters on to the page
  app.get("/api/characters", function(req, res) {
    db.Characters.findAll({}).then(function(data) {
      res.json(data);
    });
  });
  // render the selected character to the fight html page
  app.get("/api/characters/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
};
