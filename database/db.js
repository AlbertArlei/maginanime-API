const {Sequelize} = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(dotenv.parsed.postgres_db_name, dotenv.parsed.postgres_db_username, dotenv.parsed.postgres_db_password,{
    dialect: dotenv.parsed.postgres_db_dialect,
    host: dotenv.parsed.postgres_db_host,
});

module.exports = sequelize;