const { Sequelize, Op } = require('sequelize');
const token = require('../user/jwtModel');
const mangaTable = require('../../../database/manga');
const like = require('./mangaLike/likeModel');
const view = require('./mangaView/viewModel');
const redis = require('../redis/redis');
const backgroundTask = require('./cache/backgroundTaskModel');

class Manga {
    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.name = jsonObject.name;
        this.cover = jsonObject.cover;
        this.release = jsonObject.release;
        this.summary = jsonObject.summary;
        this.author = jsonObject.author;
        this.publishing_company = jsonObject.publishingCompany;
        this.token = jsonObject.token;
    }

    async findByName() {
        const response = {};
        if (this.name === '') {
            response.status = 200;
            response.result = "Invalid value";
            return response;
        } else {

            const find = await mangaTable.findOne({
                where: {
                    manga_name: { [Op.like]: `${this.name}%` }
                },
                attributes: ['id', 'manga_name', 'manga_cover', 'like', 'dislike']
            });
            response.status = 200;
            response.result = find;
            return response;
        }
    }

    async createManga() {
        const response = {};
        const find = await mangaTable.findOne({
            where: {
                manga_name: this.name
            }
        });
        if (find === null) {
            mangaTable.create({
                manga_name: this.name,
                manga_cover: this.cover,
                manga_release: this.release,
                manga_summary: this.summary,
                views: 0,
                like: 0,
                dislike: 0,
                manga_author: this.author,
                publishing_company: this.publishing_company
            });
            response.status = 201;
            response.result = "the manga has been successfully registered";
            return response;
        } else {
            response.status = 409;
            response.result = "the manga already exists";
            return response;
        }
    }

    editManga() {
        const response = {};
        mangaTable.update(
            {
                manga_name: this.name,
                manga_cover: this.cover,
                manga_release: this.release,
                manga_summary: this.summary,
                manga_author: this.author,
                publishing_company: this.publishing_company
            },
            { where: { id: this.id } }
        )
        response.status = 200;
        response.result = `manga ${this.name} edited successfully!`;
        return response;
    }

    async deleteManga() {
        const response = {};
        mangaTable.destroy({
            where: {
                manga_name: { [Op.like]: `${this.name}%` }
            }
        });
        response.status = 200;
        response.result = `manga ${this.name} deleted successfully!`;
        return response;
    }

    async likeManga() {
        const response = {};
        const find = await mangaTable.findByPk(this.id, {attributes: ['id']});
        if (find !== null) {
            const userToken = new token(this.token).decodeUserToken();
            if (userToken === false) {
                response.status = 200;
                response.result = "Invalid user token";
                return response;
            }
            const findLike = await new like(userToken.id, find.id).findMangaLike();
            if (findLike !== null) {
                if (findLike.like === 1) {
                    new like().mangaLikeDestroy(findLike.id);
                    response.status = 204;
                    return response;
                }
                    new like().mangaLikeEdit(true, findLike.id);
                    response.status = 204;
                    return response;
            } else {
                new like(userToken.id).mangaLike(true, find.id);
                response.status = 201;
                return response;
            }
        }
    }

    async dislikeManga() {
        const response = {};
        const find = await mangaTable.findByPk(this.id, {attributes: ['id']});
        const userToken = new token(this.token).decodeUserToken();

        if (find !== null) {
            if (userToken === false) {
                response.status = 200;
                response.result = "Invalid user token";
                return response;
            }
            const findLike = await new like(userToken.id, find.id).findMangaLike();

            if (findLike !== null) {
                if (findLike.like === 1) {
                    await new like().mangaLikeEdit(false, findLike.id);
                    response.status = 204;
                    return response;
                } else if (findLike.like === -1) {
                    await new like().mangaLikeDestroy(findLike.id);
                    response.status = 204;
                    return response;
                }
            } else {
                await new like(userToken.id).mangaLike(false, find.id);
                response.status = 201;
                return response;
            }
        }
    }

    async view() {
        const response = {};
        const find = await mangaTable.findByPk(this.id);
        const userToken = new token(this.token).decodeUserToken();
        if (find !== null && userToken !== false) {
            const create = await new view(userToken.id, this.id).createMangaView();
            return create;
        }
        response.status = 400;
        response.result = "invalid user token or manga id";
    }
}

class FindManga extends Manga {
    constructor(jsonObject) {
        super(jsonObject);
    }

    async findByAuthor() {
        const response = {};
        const author = await mangaTable.findAll({
            where: {
                manga_author: {
                    [Op.like]: `${this.author}%`
                }
            },
            attributes: ['id', 'manga_name', 'manga_cover', 'like', 'dislike']

        });

        if (author.length < 1) {
            response.status = 400;
            response.result = "not found";
            return response;
        }
        response.status = 200;
        response.result = author;
        return response;
    }

    async findByRelease() {
        const release = await mangaTable.findAll({
            where: {
                manga_release: {
                    [Op.like]: `%${this.release}`
                }
            },
            attributes: ['id', 'manga_name', 'manga_cover', 'like', 'dislike']
        });

        if (release.length < 1) {
            const response = {};
            response.status = 400;
            response.result = "not found";
            return response;
        } else {
            const response = {};
            response.status = 200;
            response.result = release;
            return response;
        }
    }

}

class MangaFeatures extends Manga {
    constructor(jsonObject) {
        super(jsonObject);
    }

    async listNewMangaAdded() {
        const response = {};
        const find = await new redis().get('listNewMangaAddded');
        if (find !== null) {
            response.status = 200;
            response.result = JSON.parse(find);
            return response;
        }
        await new backgroundTask().taskListNewMangaAdded();
        const updatedFind = await new redis().get('listNewMangaAddded');
        response.status = 200;
        response.result = JSON.parse(updatedFind);
        return response;
    }

    async topMangaList() {
        const response = {};
        const find = await new redis().get('topMangaList');
        if (find !== null) {
            response.status = 200;
            response.result = JSON.parse(find);
            return response;
        }
        await new backgroundTask().taskTopMangaList();
        const updatedFind = await new redis().get('topMangaList');
        response.status = 200;
        response.result = JSON.parse(updatedFind);
        return response;
    }

    async topFavoritesMangaList() {
        const response = {};
        const find = await new redis().get('topFavoritesMangaList');
        if (find !== null) {
            response.status = 200;
            response.result = JSON.parse(find);
            return response;
        }
        await new backgroundTask().tasklistTopFavoritesManga();
        const updatedFind = await new redis().get('topFavoritesMangaList');

        response.status = 200;
        response.result = JSON.parse(updatedFind);
        return response;
    }
}

module.exports = {
    Manga: Manga,
    FindManga: FindManga,
    MangaFeatures: MangaFeatures,
}