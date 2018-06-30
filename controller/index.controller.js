var express = require('express');
var router = express.Router();
var authorController = require('./author.controller');

router.post('/trader/api/v1/author', authorController.addAuthor);
router.get('/trader/api/v1/author', authorController.getAuthor);
router.post('/trader/api/v1/author/login', authorController.authorLogin);
router.post('/trader/api/v1/author/register', authorController.authorRegister);
router.get('/trader/api/v1/author/asyncParallel', authorController.asyncParallel);
router.get('/trader/api/v1/author/asyncWaterfall', authorController.asyncWaterfall);
router.get('/trader/api/v1/author/asyncWhilst', authorController.asyncWhilst);
router.get('/trader/api/v1/author/asyncForever', authorController.asyncForever);
router.get('/trader/api/v1/author/asyncCompose', authorController.asyncCompose);
router.get('/trader/api/v1/author/asyncSeq', authorController.asyncSeq);
router.get('/trader/api/v1/author/asyncAuto', authorController.asyncAuto);
router.get('/trader/api/v1/author/asyncEach', authorController.asyncEach);
router.get('/trader/api/v1/author/asyncMap', authorController.asyncMap);
router.get('/trader/api/v1/author/asyncEachSeries', authorController.asyncEachSeries);
router.get('/trader/api/v1/author/asyncEachOf', authorController.asyncEachOf);
router.get('/trader/api/v1/author/asyncEachOfSeries', authorController.asyncEachOfSeries);

module.exports = router;