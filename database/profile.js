const { Sequelize, DataTypes } = require('sequelize');
const database = require('./db.js');

const profile = database.define('profile', {
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    profile_picture:{
        type: DataTypes.STRING(1700),
        allowNull: false
    },
    banner_image:{
        type: DataTypes.STRING(1700),
        allowNull: true
    },
    background_color:{
        type: DataTypes.STRING(20),
        allowNull: true
    },
    text_color:{
        type: DataTypes.STRING(20),
        allowNull: true
    }
});

module.exports = profile;