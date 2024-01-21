const {Manga, MangaFeatures, FindManga} = require('../models/manga/mangaModel');
const findMangabyId = require('../models/manga/search/findMangabyId');
const findMangabyName = require('../models/manga/search/findByName');
const findMangaByGender = require('../models/manga/search/findMangaByGender');
const View = require('../models/manga/mangaView/viewModel');
const Like = require('../models/manga/mangaLike/likeModel');
const mangaRandom = require('../models/manga/search/findRandomManga');

module.exports = class MangaController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async createController() {
        const response = await new Manga(this.req.body).createManga();
        this.res.status(response.status).json({ message: response.result });
    }

    async findByNameController() {
        const response = await new findMangabyName(this.req.query).find();
        this.res.status(response.status).json({ message: response.result });
    }

    async findByAuthorController() {
        const response = await new FindManga(this.req.query).findByAuthor();
        this.res.status(response.status).json({ message: response.result });
    }

    async searchMangaByIDController() {
        const response = await new findMangabyId(this.req.query).findByID();
        this.res.status(response.status).json({ message: response.result });
    }

    async mangaGender() {
        const response = await new findMangaByGender(this.req.query).findMangaById();
        this.res.status(response.status).json({ message: response.result });
    }

    async findUniqueMangaController() {
        const response = await new findMangabyId(this.req.query).findUniqueManga();
        this.res.status(response.status).json({message: response.result});
    }

    async findMangaLikeListController(){
        const response = await new findMangabyId(this.req.body).findMangaLikeList();
        this.res.status(response.status).json({message: response.result});
    }

    async findUserMangaLikeAndDislikeController(){
        const response = await new Like(this.req.query).findUserMangaLike();
        this.res.status(response.status).json({message: response.result});
    }

    async searchByReleaseController() {
        const response = await new FindManga(this.req.body).findByRelease();
        this.res.status(response.status).json({ message: response.result });
    }

    async deleteController() {
        const response = await new Manga(this.req.query).deleteManga();
        this.res.status(response.status).json({ message: response.result });
    }

    async editController() {
        const response = await new Manga(this.req.query).editManga();
        this.res.status(response.status).json({ message: response.result });
    }

    async likeController() {
        const response = await new Manga(this.req.body).likeManga();
        this.res.status(response.status).json({ message: response.result });
    }

    async dislikeController() {
        const response = await new Manga(this.req.body).dislikeManga();
        this.res.status(response.status).json({ message: response.result });
    }

    async viewMangaController() {
        const response = await new View(this.req.body).createMangaView();
        this.res.status(response.status).json({ message: response.result });
    }

    async listNewMangaAddedController() {
        const response = await new MangaFeatures(this.req.body).listNewMangaAdded();
        this.res.status(response.status).json({ message: response.result });
    }

    async topMangaListController() {
        const response = await new MangaFeatures(this.req.body).topMangaList();
        this.res.status(response.status).json({ message: response.result });
    }

    async topFavoritesMangaListController() {
        const response = await new MangaFeatures(this.req.body).topFavoritesMangaList();
        this.res.status(response.status).json({ message: response.result });
    }

    async findRandomMangaController() {
        const response = await new mangaRandom(this.req.body).findManga();
        this.res.status(response.status).json({ message: response.result });
    }
}
