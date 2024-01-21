const express = require('express');
const genderController = require('../controllers/genderController');
const router = express.Router();

 class RouteGender {
    constructor() {
        this.router = router;
    }

    main(req, res) {
        this.router.get('/', (req, res) => {
            new genderController(req, res).listGendersController();
        });

        this.router.post('/search', (req, res) => {
            new genderController(req, res).searchByGenderController();
        });

        this.router.get('/searchmanga', (req, res) => {
            new genderController(req, res).searchMangaByGender();
        });

        this.router.post('/create', (req, res) => {
            new genderController(req, res).genderCreateController();
        });
        
        
        return this.router;
    }
}
module.exports = RouteGender;