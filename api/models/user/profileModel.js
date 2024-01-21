const { Sequelize, Op } = require('sequelize');
const profileTable = require('../../../database/profile');
const likeModel = require('../manga/mangaLike/likeModel');
const userTable = require('../../../database/users');
const jwt = require('./jwtModel');

module.exports = class Profile {
    constructor(jsonObject) {
        this.token = jsonObject.token;

    }

    async userProfile() {
        const response = {};
        const userData = new jwt(this.token, null).decodeUserToken();
        const userName = await userTable.findByPk(userData.id);
        const likeData = await new likeModel(userData, null).findUserMangaLike();
        const profileSettings = async () => {
            const find = await profileTable.findOne({
                where: {
                    user_id: userData.id
                },
                attributes: ['user_id', 'profile_picture', 'profile_picture', 'banner_image', 'background_color', 'text_color']
            });
            const profileObj = {
                user_id: userData.id,
                profile_picture: 'https://blogger.googleusercontent.com/img/a/AVvXsEgY5SIFw3ZWevumk9C0L4Bbqv4Tu63w5UdzPldJspr2zGUt-60uRLLXGHlM_jKTp8L4QiDa4PjWDvYZdg2Peunm6PsllR5gZkzWcCroLtmPicyKlR37r11uM6McqzqcZs_7Rern7M4mvP7G67dRvsJZsHDB6UIAw0jxrxI2vlxgW2A0o9a70CbgK-k5cXo',
                banner_image: 'https://blogger.googleusercontent.com/img/a/AVvXsEgUpVvm-Zj64CXjzI7CaUy4ysIWiEyjvmgETtQ8U7FgtR84pWAeghRzF5nkhipeBa4shDi61SmxfHTcik8mVzY6nYKML0O3AObAYuAUPUGKIuNdJxnC3mOxDxSjz2UtLLqn9suksXi16L_47dbyOPohc8m01672zT6D-mZBf3pzEeHAV3xfN4bE6hKRsSo',
                background_color: 'var(--black-color)',
                text_color: 'var(--white-color)'
            }
            if (find === null) {
                await profileTable.create(profileObj);
                return profileObj
            }
            return find;
        }

        const profileData = {
            name: userName.name,
            profile: await profileSettings(),
            likeAndDislike: likeData.result
        }
        response.status = 200;
        response.result = profileData;
        return response;
    }

    async editProfile(profileData) {
        const response = {};
        const userId = new jwt(this.token, null).decodeUserToken().id;
        profileTable.update({
            background_color: profileData.backgroundColor,
            text_color: profileData.color,
            banner_image: profileData.banner,
            profile_picture: profileData.profilePicture
        },
            { where: { user_id: userId } }
        );
        userTable.update({
            name: profileData.name,
        },
            { where: { id: userId } }
        );

        response.status = 200;
        response.result = 'Ok'
        return response;
    }
}
