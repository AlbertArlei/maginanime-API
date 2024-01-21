const {Sequelize, DataTypes} = require('sequelize');
const database = require('./db.js');

const gender = database.define('gender',{
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    gender:{
        type: DataTypes.STRING(20),
        allowNull:false
    }
});

module.exports = gender;