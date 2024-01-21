const {Sequelize, DataTypes, INTEGER} = require('sequelize');
const database = require('./db');

const view = database.define('view',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    manga_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = view;

