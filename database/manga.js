const {DataTypes} = require('sequelize');
const database = require('./db.js');

const manga = database.define('manga',{
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    manga_name:{
        type: DataTypes.STRING(100),
        allowNull:false
    },
    manga_cover:{
        type: DataTypes.STRING(1700),
        allowNull: false
    },
    manga_release:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    manga_summary:{
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    manga_author:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    publishing_company:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    views:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    like:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dislike:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = manga;