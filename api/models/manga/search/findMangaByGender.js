const mangaGenderTable = require('../../../../database/mangaGender');
const mangaTable = require('../../../../database/manga');
class MangaByGender{
    constructor(id){
        this.id = id;
    }

    async getMangaByGender(){
        const findMangaIdByGender = mangaGenderTable.findAll({
            where:{
                gender_id: this.id
            }
        });
        (await findMangaIdByGender).forEach(async element =>{
            const findManga = mangaTable.findByPk(element.manga_id, {attributes:['id','manga_name','manga_cover', 'views', 'like', 'dislike']});
        });
        
    }

    async getManga(){

    }
}

module.exports = MangaByGender;