const tableMangaView = require('../../../../database/mangaView');
const token = require('../../user/jwtModel');
class View {
    constructor(data) {
        this.token = data.token;
        this.mangaId = data.id;
    }

    async createMangaView() {
        const response = {};
        const userId = await new token(this.token).decodeUserToken().id;
        const find = await tableMangaView.findOne({
            where: {
                user_id: userId,
                manga_id: this.mangaId
            }
        });
        if (find !== null) {
            response.status = 200;
            response.result = "view already exists";
            return response;
        }
        await tableMangaView.create({
            user_id: userId,
            manga_id: this.mangaId
        });
        response.status = 201;
        response.result = `created`;
        return response;
    }

    async countMangaView(){
        const count = await tableMangaView.count({
            where:{
                manga_id: this.mangaId
            }
        });
        return count;
    }
}

module.exports = View;