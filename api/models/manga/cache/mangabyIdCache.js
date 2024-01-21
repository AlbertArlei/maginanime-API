const redis = require('../../redis/redis');

class MangabyIdCache{
    constructor(id, mangaName, mangaCover, views, like, dislike){
        this.id = id;
        this.mangaName = mangaName;
        this.mangaCover = mangaCover;
        this.views = views;
        this.like = like;
        this.dislike = dislike;
    }

    async mangaCache(){
        const mangaData = {
            id: this.id,
            manga_name:this.mangaName,
            manga_cover:this.mangaCover,
            views:this.views,
            like:this.like,
            dislike:this.dislike
        }
        const parsetoString = JSON.stringify(mangaData);
        await new redis().set(`mangabyId:${this.id}`,parsetoString, 60 * 5);

    }
}

module.exports = MangabyIdCache;