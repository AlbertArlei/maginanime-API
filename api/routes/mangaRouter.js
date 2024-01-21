const express = require('express');
const mangaController = require('../controllers/mangaController');
const router = express.Router();

class RouteManga {
    constructor() {
        this.router = router;
    }

    main(req, res) {
        this.router.post('/', (req, res) => {
            res.send('retorna manga');
        });

        this.router.post('/create', (req, res) => {
            new mangaController(req, res).createController();
        });

        this.router.post('/edit', (req, res) => {
            new mangaController(req, res).editController();
        });

        this.router.post('/delete', (req, res) => {
            new mangaController(req, res).deleteController();
        });

        this.router.get('/name', (req, res) => {
            new mangaController(req, res).findByNameController();
        });

        this.router.post('/like', (req, res) => {
            new mangaController(req, res).likeController();
        });

        this.router.post('/dislike', (req, res) => {
            new mangaController(req, res).dislikeController();
        });

        this.router.post('/likelist', (req, res) => {
            new mangaController(req, res).findMangaLikeListController();
        });

        this.router.post('/likeuser', (req, res)=>{
            new mangaController(req, res).findUserMangaLikeAndDislikeController();
        });

        this.router.get('/id', (req, res) => {
            new mangaController(req, res).searchMangaByIDController();
        });

        this.router.get('/mangagender', (req, res) => {
            new mangaController(req, res).mangaGender();
        });

        this.router.get('/uniquemanga', (req, res)=>{
            new mangaController(req, res).findUniqueMangaController();
        });

        this.router.post('/view', (req, res) => {
            new mangaController(req, res).viewMangaController();
        });
        
        this.router.post('/listnewmanga', (req, res) =>{
            new mangaController(req, res).listNewMangaAddedController();
        });

        this.router.post('/topmangalist', (req, res) =>{
            new mangaController(req, res).topMangaListController();
        });

        this.router.post('/topfavoritemangalist', (req, res) =>{
            new mangaController(req, res).topFavoritesMangaListController();
        });

        this.router.get('/searchbyatuhtor', (req, res) =>{
            new mangaController(req, res).findByAuthorController();
        });
        
        this.router.get('/random',(req,res)=>{
            new mangaController(req, res).findRandomMangaController();
        });

        return this.router;
    }

}

module.exports = RouteManga;