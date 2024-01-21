const {Sequelize, DataTypes} = require('sequelize');
const database = require('./db.js');

const mangaGender = database.define('mangaGender',{
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    manga_id:{
        type: DataTypes.BIGINT,
        allowNull:false
    },
    gender_id:{
        type: DataTypes.BIGINT,
        allowNull:false
    },

});

module.exports = mangaGender;