const {Op} = require('sequelize');
const mangaTable = require('../../../../database/manga');
class FindByName{
    constructor(name){
        this.name = name.name;
    }

    async find(){
        const response = {};
        const find = await mangaTable.findAll({
            where:{
                manga_name:{[Op.iLike]:`%${this.name}%`},
            },
            attributes:['id','manga_name','manga_cover','views','like','dislike']
        });
        response.status = 200;
        response.result = find;
        return response;
    }
}

module.exports = FindByName;