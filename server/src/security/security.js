const jwt = require('jwt-simple');
const moment = require('moment');
const {SECRET_TOKEN} = require('../config/config')
function createToken(user) {
    const payload = {
        sub: user.email,
        iat: moment().unix(),
        exp: moment().add(15,'days').unix(),
    }
    return jwt.encode(payload, SECRET_TOKEN);
}
module.exports = createToken;