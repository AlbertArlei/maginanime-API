const tableManga = require('../../../../database/manga');

module.exports = class UpdateView {
    constructor(mangaId, views) {
        this.mangaId = mangaId;
        this.views = views;
    }

    async update() {
       const update = await tableManga.update({
            
            views: this.views
        },
            { where: { id: this.mangaId } }
        );
        update
    }
}