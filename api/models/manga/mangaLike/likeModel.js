const likeTable = require('../../../../database/like');
const redis = require('../../redis/redis');

class Like {
    constructor(userID, ID) {
        this.userID = userID;
        this.ID = ID;
    }

    async findUserMangaLike() {
        const response = {}
        const like = [];
        const dislike = [];
        const find = await new redis().get('likeAndDislike');
        if (find !== null) {
            const findToJSON = JSON.parse(find);
            findToJSON.forEach(element => {
                if (element.userId === parseInt(this.userID.id)) element.like === 1 ? like.push(element) : dislike.push(element);
            });
            response.status = 200;
            response.result = { like: like, dislike: dislike }
            return response;
        }
        response.status = 400;
        response.result = null;
        return response;
    }

    async findMangaLike() {
        const find = await likeTable.findOne({
            where: {
                user_id: this.userID,
                manga_id: this.ID
            },
            attributes: ['id', 'like']
        });
        return find;
    }

    async mangaLike(action, mangaID) {
        const obj = {
            user_id: this.userID,
            manga_id: mangaID,
            type: "manga"
        };
        if (action) {
            obj.like = 1;
        } else {
            obj.like = -1;
        }
        await likeTable.create(obj);

    }

    async mangaLikeEdit(action, likeID) {
        const obj = {};
        if (action) {
            obj.like = 1;
        } else {
            obj.like = -1;
        }
        await likeTable.update(
            obj,
            { where: { id: likeID } }
        );
    }

    async mangaLikeDestroy(likeID) {
        await likeTable.destroy({
            where: { id: likeID }
        });
    }

}

module.exports = Like;