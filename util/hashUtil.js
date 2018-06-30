var bcrypt = require('bcrypt');
const saltRounds = 10;

var getHash = function(text) {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(text, salt);
    return hash;
}

var isEqual = function(text, hash) {
    return bcrypt.compareSync(text, hash);
}

module.exports = {
    getHash: getHash,
    isEqual: isEqual
};