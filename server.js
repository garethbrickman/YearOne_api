/* Dependencies */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");

/* Define app & cors*/

const app = express();
let corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));

/* Define db and sequelize it */

const db = require("./app/models");
/* db.sequelize.sync(); */
// use the below to drop tables and re-sync in development
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

/* Define middleware */

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// HTTP request logger
app.use(morgan('short'));
// Express will serve all files from public folder
app.use(express.static("public"));

// root route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Film Buff app" });
  });

// direct all other requests via routes file
require("./app/routes/films.routes")(app);
  
// set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});