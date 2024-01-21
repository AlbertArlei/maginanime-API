const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

class RouteUsers {
    constructor() {
        this.router = router;
    }
    main() {

        this.router.post('/', (req, res) => {
            res.send('retorna usuario');
        });
        this.router.post('/login', (req, res) => {
            new userController(req, res).loginController();
        });

        this.router.post('/create', (req, res) => {
            new userController(req, res).createController();
        });

        this.router.post('/edit', (req, res) => {
            res.send('edita usuario');
        });

        this.router.post('/delet', (req, res) => {
            res.send('deleta usuario');
        });

        this.router.post('/profile', (req, res) => {
            new userController(req, res).profileController();
        });

        this.router.post('/update', (req, res) => {
            new userController(req, res).profileUpdateController();
        });


        return this.router;
    }

}


module.exports = RouteUsers;