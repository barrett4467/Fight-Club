module.exports = {
  signup: function(req, res) {
    // if user is logged in, redirect to /
    if (req.user) {
      return res.redirect("/");
    }
    res.render("signup");
  },
  login: function(req, res) {
    // if user is logged in, redirect to /dashboard
    if (req.user) {
      console.log("im working");
      return res.redirect("/");
    }

    res.render("login");
  },
  logout: function(req, res) {
    req.logout();
    res.redirect("/");
  }
};
