const listGenderModel = require('../models/gender/search/listGenders');
const listGenderSearch = require('../models/gender/search/findByGender');
const genderCreate = require('../models/gender/genderCreate');

module.exports = class GenderController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async listGendersController() {
        const response = await new listGenderModel().listGenders();
        this.res.status(response.status).json({ message: response.result });
    }

    async searchByGenderController() {
        const response = await new listGenderSearch(this.req.body).searchByGender();
        this.res.status(response.status).json({ message: response.result });
    }

    async searchMangaByGenderController() {
        const response = await new listGenderSearch(this.req.query).searchMangaByGender();
        this.res.status(response.status).json({ message: response.result });
    }

    async genderCreateController() {
        const response = await new genderCreate(this.req.body).createColumn(this.req.body);
        this.res.status(response.status).json({ message: response.result });
    }
}