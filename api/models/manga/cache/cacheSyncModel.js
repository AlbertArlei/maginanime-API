const task = require('./backgroundTaskModel');
const likeCache = require('./mangaLikeCache');
class CacheSync {

    async oneMinute() {
        await new task().taskListNewMangaAdded();
        await new task().taskTopMangaList();
        await new task().tasklistTopFavoritesManga();
    }

    async thirtySecondsSync(){
        await new likeCache().mangaLikeAndDislikeInCache();
    }
}
const cacheSync = new CacheSync();

setInterval(() => {
    cacheSync.oneMinute()
}, 1000 * 60 * 1);

setInterval(() => {
    cacheSync.thirtySecondsSync();
}, 1000 * 30);