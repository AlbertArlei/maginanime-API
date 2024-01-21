const { Sequelize, Op } = require('sequelize');
const userTable = require('../../../database/users');
const bcrypt = require('bcrypt');
const token = require('./jwtModel');

class User {
    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.name = jsonObject.name;
        this.username = jsonObject.username;
        this.password = jsonObject.password;
        this.premium = jsonObject.premium;
    }

    async createUser() {
        const response = {};
        const find = await userTable.findOne({
            where: {
                username: this.username
            }
        });
        if (find !== null) {
            response.status = 400;
            response.result = `username in use`;
            return response;
        } else {
            const saltRounds = 10;
            const hash = await bcrypt.hash(this.password, saltRounds);
            await userTable.create({
                name: this.name,
                username: this.username,
                password: hash,
                premium: false,
            });
            
            response.status = 201;
            response.result = `user created`;
            return response;
        }
    }

    async loginUser() {
        const response = {};
        const find = await userTable.findOne({
            where: {
                username: this.username
            }
        });
        if (find !== null) {
            const password = await bcrypt.compare(this.password, find.password);
            if (password) {
                const userToken = new token().userToken(find.id, find.name);
                response.status = 200;
                response.result = userToken;
                return response;
            } else {
                response.status = 401;
                response.result = 'incorrect password';
                return response;
            }
        } else {
            response.status = 401;
            response.result = 'incorrect username';
            return response;
        }
    }
}
module.exports = User;