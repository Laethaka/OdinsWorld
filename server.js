const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const session = require("express-session");
const auth = require('./routes/auth');

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

var passport = require("./config/passport");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use('/api/auth', auth);

// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
