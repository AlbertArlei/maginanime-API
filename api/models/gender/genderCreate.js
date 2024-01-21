const gender = require('../../../database/mangaGender');

module.exports = class GenderCreater{
    constructor(data){
        this.mangaId = data.mangaId;
        this.genderId = data.genderId;
    }

    async createColumn(){
        
        const response = {};
        const create = gender.create({manga_id: this.mangaId, gender_id: this.genderId});
        response.status = 201;
        response.result = create
        return response;
    }
}