$ mkdir YearOne_api

$ cd YearOne_api

// using current package.json

$ npm install 

// using fresh install of dependencies

$ npm install express sequelize mysql2 body-parser morgan cors nodemon ejs path --save

Edit package.json:

"main": "server.js"

scripts:

"start": "nodemon index.js"


Tools used:

iTerm2 with zsh

VS Code

Github with Github Desktop

Postman (API dev environment)


MySQL setup:

//installation

shell> sudo apt install mysql-server

//Start the service

shell> sudo systemctl start mysql-server

//Then to enter your mysql instance

shell> sudo mysql

//create a user

mysql > CREATE USER ‘newuser’@’localhost’ IDENTIFIED BY ‘password’;

//give to the newuser all PRIVILEGES

mysql > GRANT ALL PRIVILEGES ON * . * TO ‘newuser’@’localhost’;

//then flush

mysql > FLUSH PRIVILEGES;
//create the Database

mysql > CREATE DATABASE ‘dbName’;

//quit

mysql > quit
