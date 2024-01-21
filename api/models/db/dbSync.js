
class DatabaseSync {
    constructor(sequelize){
        this.sequelize = sequelize;
    }

    async syncTables(){
        const manga = require('../../../database/manga');
        const user = require('../../../database/users');
        const like = require('../../../database/like');
        const viewManga = require('../../../database/mangaView');
        const profile = require('../../../database/profile');
        const gender = require('../../../database/gender');
        const mangaGender = require('../../../database/mangaGender');
        await this.sequelize.sync();
    }
}

module.exports = DatabaseSync;