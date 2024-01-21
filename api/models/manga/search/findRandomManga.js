const mangaTable = require('../../../../database/manga');
const genderByManga = require('../search/findGenderByManga');
module.exports = class FindRandomManga {

    async findManga() {
        const response = {};
        const count = await mangaTable.count() 
        const calc = Math.floor(Math.random() * count) + 1;
        const find = await mangaTable.findByPk(calc);
        if(find === null) return this.findManga();
        const gender = await new genderByManga(calc).getGenderByManga();
        const genderArray = [];
        gender.forEach(item => {
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

        response.status = 200;
        response.result = mangaData;
        return response;
    }
}