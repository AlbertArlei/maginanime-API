const mangaTable = require('../../../../database/manga');
const genderByManga = require('./findGenderByManga');
const mangaByGender = require('./findMangaByGender');
const redis = require('../../redis/redis');
const mangaLikeandDislike = require('../mangaLike/mangaLikeandDislike');
const updateMangaLikeandDislike = require('../mangaLike/updateMangaLikeandDislike');
const mangabyIdCache = require('../cache/mangabyIdCache');
const uniqueMangaCache = require('../cache/uniqueMangaCache');
const viewModel = require('../mangaView/viewModel');
const updateMangaView = require('../mangaView/updateMangaView');
const mangaModel = require('../mangaModel');

class FindMangabyId {
    constructor(id) {
        this.mangaId = id.id;
    }

    async findByID() {
        const response = {};
        const findMangaCache = await new redis().get(`mangabyId:${this.mangaId}`);
        if (findMangaCache !== null) {
            const parsetoJSON = JSON.parse(findMangaCache);
            response.status = 200;
            response.result = parsetoJSON;
            return response;
        }
        const countLikeandDislike = await new mangaLikeandDislike(this.mangaId).countMangaLikeandDislike();
        await new updateMangaLikeandDislike(this.mangaId, countLikeandDislike.like, countLikeandDislike.dislike).updateLikeandDislike();
        const find = await mangaTable.findByPk(this.mangaId, { attributes: ['id', 'manga_name', 'manga_cover', 'views', 'like', 'dislike'] });
        new mangabyIdCache(find.id, find.manga_name, find.manga_cover, find.views, find.like, find.dislike).mangaCache();
        response.status = 200;
        response.result = find;
        return response;
    }

    async findUniqueManga() {
        const response = {};
        const mangaCache = await new redis().get(`uniqueManga:${this.mangaId}`);

        if (mangaCache !== null) {
            response.status = 200;
            response.result = JSON.parse(mangaCache);
            return response;
        }
        const countLikeandDislike = await new mangaLikeandDislike(this.mangaId).countMangaLikeandDislike();
        const countView = await new viewModel({token: null, id: this.mangaId}).countMangaView();
        await new updateMangaView(this.mangaId, countView).update();
        await new updateMangaLikeandDislike(this.mangaId, countLikeandDislike.like, countLikeandDislike.dislike).updateLikeandDislike();
        const find = await mangaTable.findByPk(this.mangaId);
        const findGender = await new genderByManga(this.mangaId).getGenderByManga();
        const genderArray = [];
        findGender.forEach(item => {
            genderArray.push(item.gender);
        });
        const mangaData = {
            id: find.id,
            manga_name: find.manga_name,
            manga_cover: find.manga_cover,
            manga_release: find.manga_release,
            manga_summary: find.manga_summary,
            manga_author: find.manga_author,
            publishing_company: find.publishing_company,
            views: find.views,
            like: find.like,
            dislike: find.dislike,
            gender: genderArray,
        };
        new uniqueMangaCache(mangaData).mangaCache();

        response.status = 200;
        response.result = mangaData;
        return response;
    }

    async findMangaLikeList() {
        const response = {};
        const likeArray = [];
        this.mangaId.like.forEach(item => {
            likeArray.push(item.mangaId);
        });
        const find = await mangaTable.findAll({
            where: { id: likeArray },
            attributes: ['id', 'manga_name', 'manga_cover', 'views', 'like', 'dislike']
        });
        response.status = 200;
        response.result = find;
        return response;
    }
}

module.exports = FindMangabyId;