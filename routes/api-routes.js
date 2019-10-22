var db = require("../models");

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
  app.post("/api/fight/:id", function(req,res){
    console.log(`The req.body contains ${req.params.id}`)
    db.Characters.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data){
      console.log(`The data contains ${data}`);
      res.end();
    });
  });
  app.get("/api/fight/:id", function(req, res){
    db.Characters.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data){
      res.json(data);
    });
  });
};