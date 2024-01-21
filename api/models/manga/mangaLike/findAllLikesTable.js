const likeTable = require('../../../../database/like');

class FindAllLikeAndDislike{
    async findAll(){
        const find = await likeTable.findAll();
        return find
    }
}

module.exports = FindAllLikeAndDislike