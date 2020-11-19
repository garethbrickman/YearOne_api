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

/* Define middleware */

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// HTTP request logger
app.use(morgan('short'));

// root route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Film Buff app" });
  });
  
  // set port
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });