const mangaGenderTable = require('../../../../database/mangaGender');
const findMangaById = require('../../manga/search/findMangabyId');

class FindByGender {
    constructor(id) {
        this.id = id;
    }

    async searchByGender() {
        const response = {};
        const idList = this.id.tagList;
        const find = await mangaGenderTable.findAll({
            where: {
                gender_id: idList
            },
            attributes: ['manga_id', 'gender_id']
        });
        const contagens = {}
        find.forEach(element => {
            contagens[element.manga_id] === undefined ? contagens[element.manga_id] = 1 : contagens[element.manga_id]++;
        });
        const minimo = idList.length;
        const mangaId = [];
        Object.keys(contagens).forEach(element => {
            contagens[element] >= minimo ? mangaId.push(element) : null;
        });
        const mangaList = [];
        for(let i = 0; i < mangaId.length; i++){
            const findItems = await new findMangaById({ id: mangaId[i] }).findByID();
            mangaList.push(findItems.result);
        }
        response.status = 200;
        response.result = mangaList;
        return response;
    }

    async searchMangaByGender() {

    }
}

module.exports = FindByGender;