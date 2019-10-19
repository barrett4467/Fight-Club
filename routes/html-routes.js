var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/characters", function(req, res) {
    res.render("characters");
  });
  app.get("/fight", function(req, res) {
    res.render("fight");
  });
  app.get("/leaderboard", function(req, res) {
    res.render("leaderboard");
  });
};
