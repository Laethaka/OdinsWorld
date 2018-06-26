var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // Landing Page
  app.get("/", function(req, res) {
    if (req.user) {//SENDING TO FAMILY DASHBOARD
      res.render('pages/dashboard')
    }
    res.render('pages/landing');
  });
  // Login Page
  app.get("/login", function(req, res) {
    if (req.user) {
      res.render('pages/dashboard')
    }
    else{
      console.log(res);
      res.render('pages/login');
      // res.json("invalid sign in");
    }
  });
  // Register Page
  app.get("/register", function(req, res) {
    if (req.user) {
      res.render('pages/dashboard', {
        famName: famName
      })
    }
    res.render('pages/register');
  });
 
  // Family Dashboard Page 
  app.get('/dashboard/:nickname', function(req, res) {
    res.render('pages/dashboard', {
      famName: req.params.nickname,
    });
  });

  // app.get('/login', function(req, res) {
  //   res.render('../views/pages/login');
  // });

  //PUBLIC PAGE
  app.get('/dashboard-public', function(req, res) {
    res.render('pages/dashboard-public');
  });

};
