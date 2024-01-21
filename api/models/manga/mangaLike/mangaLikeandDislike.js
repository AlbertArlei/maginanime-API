const likeTable = require('../../../../database/like');

class CountMangaLikeandDislike {
    constructor(id) {
        this.id = id
    }

    async findMangaLikeandDislike() {
        const find = await likeTable.findAll({
            where: { manga_id: this.id },
            attributes: ['like']
        });
        return find
    }

    async countMangaLikeandDislike() {
        let like = 0;
        let dislike = 0;
        const likesandDislikes = this.findMangaLikeandDislike();
        (await likesandDislikes).forEach(item => {
            item.like === 1 ? like++ : dislike++;
        });
        const totalLikeandDislike = { like: like, dislike: dislike }
        return totalLikeandDislike;
    }
}

module.exports = CountMangaLikeandDislike;