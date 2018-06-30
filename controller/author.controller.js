var authorService = require('../service/author/author.service');
var authentication = require('../auth/authentication');

exports.addAuthor = function (req, res, next) {
    console.log('add author controller is called');
    authorService.addAuthor(req, res, next);
};

exports.getAuthor = function (req, res, next) {
    authorService.getAuthor(req, res, next);
};

exports.getAuthorById = function (req, res, next) {
    res.status(200).send({message:'get author by id'});
};

exports.authorLogin = function(req, res, next) {
    var token = authentication.getJWT(req.body.email);
    console.log("Created JWT : " + token);
    res.status(200).send({
        message: 'Login Successfull',
        token: token
    });
};

exports.authorRegister = function (req, res, next) {
    authorService.savePassword(req, res, next);
};

exports.asyncParallel = function(req, res, next) {
    console.log('async parallel');
    authorService.asyncParallel(req, res, next);
}

exports.asyncWaterfall = function (req, res, next) {
    console.log('async waterfall');
    authorService.asyncWaterfall(req, res, next);
};

exports.asyncWhilst = function (req, res, next) {
    console.log('async Whilst');
    authorService.asyncWhilst(req, res, next);
};

exports.asyncForever = function (req, res, next) {
    console.log('async Forever');
    authorService.asyncForever(req, res, next);
};

exports.asyncCompose = function (req, res, next) {
    console.log('async Compose');
    authorService.asyncCompose(req, res, next);
};
exports.asyncSeq = function (req, res, next) {
    console.log('async Seq');
    authorService.asyncSeq(req, res, next);
};

exports.asyncAuto = function (req, res, next) {
    console.log('async Auto');
    authorService.asyncAuto(req, res, next);
};

exports.asyncEach = function (req, res, next) {
    console.log('async Each');
    authorService.asyncEach(req, res, next);
};

exports.asyncMap = function (req, res, next) {
    console.log('async Map');
    authorService.asyncMap(req, res, next);
};

exports.asyncEachSeries = function (req, res, next) {
    console.log('async Each Series');
    authorService.asyncEachSeries(req, res, next);
};

exports.asyncEachOf = function (req, res, next) {
    console.log('async Each Of');
    authorService.asyncEachOf(req, res, next);
};

exports.asyncEachOfSeries = function (req, res, next) {
    console.log('async Each Of Series ');
    authorService.asyncEachOfSeries(req, res, next);
};