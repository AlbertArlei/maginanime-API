const userModel = require('../models/user/userModel');
const profileModel = require('../models/user/profileModel');
class UserController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async loginController() {
        const newUser = new userModel(this.req.body);
        const response = await newUser.loginUser();
        this.res.status(response.status).json({ message: response.result });
    }

    async createController() {
        const newUser = new userModel(this.req.body);
        const response = await newUser.createUser();
        this.res.status(response.status).json({ message: response.result });
    }

    async profileController() {
        const newUser = new profileModel(this.req.body);
        const response = await newUser.userProfile();
        this.res.status(response.status).json({ message: response.result });
    }

    async profileUpdateController() {
        const newUser = new profileModel(this.req.body);
        const response = await newUser.editProfile(this.req.body.data);
        this.res.status(response.status).json({ message: response.result });
    }

}

module.exports = UserController;