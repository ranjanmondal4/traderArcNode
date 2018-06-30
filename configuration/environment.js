var getEnvironment = function() {
    var environment = {};
    switch (process.env.NODE_ENV){
        case 'prod':
            environment.port = 6000;
            environment.hostUrl = 'http://localhost';
            environment.database = 'traderProd';
            environment.secretKey = 'ilovescotchyscotch';
            break;
        case 'stag':
            environment.port = 5000;
            environment.hostUrl = 'http://localhost';
            environment.database = 'traderStag';
            environment.secretKey = 'ilovescotchyscotch';
            break;
        default:
            environment.port = 4000;
            environment.hostUrl = 'http://localhost';
            environment.database = 'trader';
            environment.secretKey = 'ilovescotchyscotch';
    }
    return environment;
}

module.exports = getEnvironment();