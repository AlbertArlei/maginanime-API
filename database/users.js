const {Sequelize, DataTypes} = require('sequelize');
const database = require('./db.js');

const users = database.define('users',{
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(20),
        allowNull:false
    },
    username:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    premium:{
        type: DataTypes.STRING(10),
        allowNull: false
    }
});

module.exports = users;