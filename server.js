const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const gameRoutes = require('./routes/gameRoutes');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/gameroute", gameRoutes);

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
