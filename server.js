/* Dependencies */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

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

// Express will serve scripts from this path
app.use(express.static(path.join(__dirname, 'public')))
// Set the view engine to ejs and serve views from this path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

/* client-side api request endpoints */

// submit find query by film title
app.get('/client/find/:filmTitle', function(req, res) {
   // TODO: hide API key in env var, pagination of results
   const apiKey = "169cd3b2&s";
   $.ajax({
     type: "GET",
     url: "http://www.omdbapi.com/",
     data: "apikey=" + apiKey + "&type=movie" + "&s=" + filmTitle,
     })
     .done(function (data) {
         console.log( "Sample of data:", data );
         const resultTitles = data.Search.map(x => x.Title); // Extract just the film titles from the response
         res.json({resultTitles});
  });
});

// direct all other internal api requests via routes file
require("./app/routes/films.routes")(app);
  
// set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});