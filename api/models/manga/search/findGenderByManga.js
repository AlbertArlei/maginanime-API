const mangaGenderTable = require('../../../../database/mangaGender');
const genderTable = require('../../../../database/gender');
class MangaByGender{
    constructor(id){
        this.id = id;
    }

    async getGenderByManga(){
        const find = await mangaGenderTable.findAll({
            where:{
                manga_id: this.id
            },
            attributes:['gender_id'],
        });
        const genderIdArray = [];
        find.forEach(async item => {
           genderIdArray.push(item.gender_id);
        });
        const findGender = await genderTable.findAll({where:{id: genderIdArray},attributes:['gender']});
        return findGender;
    }
}

module.exports = MangaByGender;