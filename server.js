const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const auth = require('./routes/auth');
const gameRoutes = require('./routes/gameRoutes');

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use('/api/auth', auth);
app.use("/gameroute", gameRoutes);

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
