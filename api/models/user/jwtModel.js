const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

class TokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "TokenError";
    }
}


class JWT {
    constructor(token){
            this.secretKey = dotenv.parsed.secretKey;
            this.token = token;
    }

    userToken(id, name) {

        const userData = {
            id: id,
            name: name
        }

        const token = jwt.sign(userData, this.secretKey, { expiresIn: '24h' });
        return token;
    }


    decodeUserToken() {
        try {
            const decoded = jwt.verify(this.token, this.secretKey);
            return decoded;
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return false; 
            } else {
                throw new TokenError("Erro ao decodificar o token: " + error.message);
            }
        }
    }
    
}

module.exports = JWT;