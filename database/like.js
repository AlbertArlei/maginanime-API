const { Sequelize, DataTypes } = require('sequelize');
const database = require('./db.js');

const like = database.define('likes', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    manga_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    like: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = like;