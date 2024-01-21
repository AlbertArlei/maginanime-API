const redis = require('../../redis/redis');

class UniqueMangaCache{
    constructor(manga){
        this.manga = manga;
    }

    async mangaCache(){
        const mangaToString = JSON.stringify(this.manga);
        await new redis().set(`uniqueManga:${this.manga.id}`, mangaToString, 60);
    }

}

module.exports = UniqueMangaCache