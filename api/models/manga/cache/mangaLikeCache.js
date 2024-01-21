const redis = require('../../redis/redis');
const findAllLikeandDislike = require('../mangaLike/findAllLikesTable');

class LikeandDislikeCache{

    async mangaLikeAndDislikeInCache(){
        const find = await new findAllLikeandDislike().findAll();
        const likeData = [];
        find.forEach(item =>{
            const mangaId = item.dataValues.manga_id;
            const userId = item.dataValues.user_id;
            const itemLike = item.dataValues.like;

            likeData.push({mangaId: mangaId, userId: userId, like: itemLike});
            
        });
        const likeDataToString = JSON.stringify(likeData);
        await new redis().set('likeAndDislike', likeDataToString, null);
    }
    
}

module.exports = LikeandDislikeCache;