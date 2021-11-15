//import the Sequelize constructor from the library
const Sequelize = require ('sequelize');
require('dotenv').config();

//create connection to our database , pass in your MySQL information for username and password as parameters

let sequelize;

if (process.env.jawsdb-silhouetted-87412) {
  sequelize = new Sequelize(process.env.jawsdb-silhouetted-87412);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;