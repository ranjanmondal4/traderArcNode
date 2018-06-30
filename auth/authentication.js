var publicUrls = require('./publicUrls');
var urlRoles = require('./urlRoles');
var jwt = require('jsonwebtoken');
var environment = require('../configuration/environment');


/**
 * to authenticate every request. Acts as middle ware 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * return error response if not authenticate otherwise let the request pass to another middle ware.
 */
var authenticateRequest = function(req, res, next){
    var token = req.headers['authorization'];
    var url = req.path;
    var method = req.method;
    console.log('Requested url : ' + url);
    if (publicUrls[url] && publicUrls[url].indexOf(method) != -1) {
        console.log('public url : ' + true);
        next();
    } else if (isTokenAuthenticated(token)){
        console.log('Token Found');
        if (isRequestAuthorized(url, method, ['ADMIN'])) {
            next();
        }else {
            console.log('Required Roles not Found');
            res.status(401).send({ message: 'Unauthorized Access, Unappropiate Roles.' });
        }
    }else {
        console.log('Token not Found');
        res.status(401).send({ message: 'Unauthorized Access, Invalid Token' });
    }
}

var isTokenAuthenticated = function(token){
    if (!token){
        console.log('Token not Found : ');
        return false;
    }
    var isAuthenticated = false;
    jwt.verify(token, environment.secretKey, function (err, decoded) {
        if (err) {
            console.log('err : ' +JSON.stringify(err));
            // why this is not get returned from here
            // return false;
        } else {
            console.log('Token is validated : ');
            isAuthenticated = true;
            // return true;
        }
    });
    return isAuthenticated;
}

/**
 * checks if the request has appropiate roles
 * @param {string} url 
 * @param {string} method 
 * @param {array of string} userRoles
 * return boolean
 */
var isRequestAuthorized = function (url, method, userRoles){
    var roles = urlRoles[method + url];
    if (roles) {
        for (var index = 0; index < userRoles.length; index++)   {
            var isRoleFound = false;
            roles.forEach(element => {
                isRoleFound = userRoles[index] == element ? true : false;
            });
            if(isRoleFound)
                return true;    
        }
        return false;
    }
}

var getJWT = function(email) {
    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1000),
        data: email
    }, environment.secretKey);
    return token;
}

module.exports = {
    authenticateRequest: authenticateRequest,
    getJWT: getJWT
}