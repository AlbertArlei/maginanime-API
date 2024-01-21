const mangaTable = require('../../../../database/manga');
const view = require('../mangaView/viewModel');
const redis = require('../../redis/redis');

class BackgroundTask {

    async taskListNewMangaAdded(){
        const find = await mangaTable.findAll({
            limit: 30,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'manga_name','manga_cover', 'views', 'like', 'dislike']
        });
        await new redis().set(`listNewMangaAddded`, JSON.stringify(find), 10);
        console.log("list of manga recently added updated");
        return;
    }

    async taskTopMangaList(){
        const find = await mangaTable.findAll({
            limit: 30,
            order: [['views', 'DESC']],
            attributes: ['id', 'manga_name','manga_cover', 'views', 'like', 'dislike']
        });
        await new redis().set('topMangaList', JSON.stringify(find), 10);
        console.log("updated top manga list");
        return;
    }
    
    async tasklistTopFavoritesManga(){
        const find = await mangaTable.findAll({
            limit: 30,
            order: [['like', 'DESC']],
            attributes: ['id', 'manga_name','manga_cover', 'views', 'like', 'dislike']
        });
        await new redis().set('topFavoritesMangaList', JSON.stringify(find), 10);
        console.log("updated top favorite manga list");
        return;
    }
}


module.exports = BackgroundTask