const genderTable = require('../../../../database/gender');
class ListGenders{
    async listGenders(){
        const response = {};
        const find = await genderTable.findAll({attributes:['id', 'gender']});
        response.status = 200;
        response.result = find;
        return response;
    }
}

module.exports = ListGenders;