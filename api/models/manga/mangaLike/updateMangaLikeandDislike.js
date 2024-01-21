const mangaTable = require('../../../../database/manga');
class UpdateMangaLikeandDislike{
    constructor(id, like, dislike){
        this.mangaId = id;
        this.like = like;
        this.dislike = dislike;
    }

    async updateLikeandDislike(){
        await mangaTable.update(
            {
                like: this.like,
                dislike: this.dislike
            },
            {where: {id: this.mangaId}});
    }
}

module.exports = UpdateMangaLikeandDislike;