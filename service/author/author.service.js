var Author = require('../../domain/author/author.domain');
var mongoose = require('mongoose');
var hashUtil = require('../../util/hashUtil');
var async = require('async');

exports.addAuthor = function(req, res, next) {
    var body = req.body;
    var author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: body.name.firstName,
            lastName: body.name.lastName
        },
        biography: body.biography,
        twitter: body.twitter,
        facebook: body.facebook
    });

    author.save(function (err) {
        if (err) {
            res.status(400).send({});
        }
        console.log('Author saved successfully!');
        res.status(200).send(author);      
    });
}

exports.getAuthor = function(req, res, next) {
    Author.find({}, function (err, list) {
        if (err) {
            res.status(400).send({});
        }
        res.status(200).send(list);
    });
}

exports.savePassword = function (req, res, next) {
    var password = req.body.password;
    //console.log('Password : ' + password);
    var hash = hashUtil.getHash(password);
    //console.log('hash : ' + hash);
    var isEqual = hashUtil.isEqual(password, hash);
    res.status(200).send({password: password, hash: hash, isEqual: isEqual});
}

exports.asyncParallel = function (req, res, next) {
    // var stack = [];
    // var first = function(callback) {
    //     callback('Error', 'First one');
    // };
    // var second = function (callback) {
    //     callback(null, 'Second one');
    // };
    // var third = function (callback) {
    //     callback(null, 'Third one');
    // };
    // stack.push(first);
    // stack.push(second);
    // stack.push(third);

    // async.parallel(stack, function(err, result) {
    //     console.log('Result : ' + result);
    // });    
    var stack = {};
    stack.first = function (callback) {
        callback(null, 'First one');
    };
    stack.second = function (callback) {
        callback(null, 21);
    };
    stack.third = function (callback) {
        callback(null, 'Male');
    };
    async.parallel(stack, function(err, result) {
        if(err) {
            console.error('error : ' + err);
            res.status(400).send({ error: err });
            return;
        }
        //console.log('Result : ' + JSON.stringify(result));
        res.status(200).send({ result: result });
    });
}

exports.asyncWaterfall = function(req, res, next) {
    async.waterfall([
        function(callback) {
            var stack = [];
            for(var index =0; index < 100000; index++){
                stack.push(index);
            }
            callback('Error', stack);
        },
        function(stack, callback) {
            stack.push('Alex');
            callback(null, stack);
        }
    ], function(err, result){
        if(err) {
            console.error('error : ' + err);
            res.status(400).send({error: err});
            return;
        }
        res.status(200).send({ result: result});
    });
};

exports.asyncWhilst = function(req, res, next) {
    var counter = 0;
    var list = [];
    async.whilst(
        function testCondition() { return counter < 5;}
        ,function increaseCounter(_next) {
            console.log('counter : ' + counter);
            list.push(counter);
            counter++;
            setTimeout(function(){
                _next(null)
            }, 1000);
        },
        function callback(err) {
            if(err){
                console.error('Error : ' + err);
                res.status(400).send({ error: err });
                return;
            }
           // console.log('Job complete :: ' + JSON.stringify(list));
            res.status(200).send({ message: 'Job complete ::' }); 
        }
    );
};

exports.asyncForever = function(req, res, next) {
    var counter = 0;
    async.forever(
        function forever(_next) {
            counter++;
            if(counter == 5){
                console.log('counter : ' + counter);
                _next('Ends here.');
                return;
            }
            setTimeout(function() {
                _next()
            }, 1000);
        },
        function callback(err) {
            if(err){
                console.log('Error ' + err);
                res.status(400).send({ error: err });
                return;
            }
            res.status(200).send({ message: 'Job complete ::' }); 
        }
    );
};

exports.asyncCompose = function(req, res, next) {
    var addNum = function(num, callback) {
        callback(null, num + 5);
    };

    var multiplyNum = function (num, callback) {
        callback(null, num * 10);
    }

    var compose = async.compose(addNum, multiplyNum);
    compose(5, function(err, result){
        if(err){
            console.log('Error ' + err);
            res.status(400).send({ error: err });
            return;
        }
        res.status(200).send({ result: result }); 
    });
};

exports.asyncSeq = function (req, res, next) {
    var addNum = function (num, callback) {
        callback(null, num + 5);
    };

    var multiplyNum = function (num, callback) {
        callback(null, num * 10);
    }

    var sequence = async.seq(addNum, multiplyNum);
    sequence(5, function (err, result) {
        if (err) {
            console.log('Error ' + err);
            res.status(400).send({ error: err });
            return;
        }
        res.status(200).send({ result: result });
    });
};

exports.asyncAuto = function(req, res, next) {
    async.auto({
        one: function(callback) {
            setTimeout(function(){
                console.log('1 number : ');
                callback(null, 1);
            }, 2000);  
        },
        two: function(callback){
            setTimeout(function () {
                console.log('2 number : ');
                callback(null, 2);
            }, 1000); 
        },
        three: ['one', 'two', function (results, callback) {
          //  results.three = 3;
            callback(null, 3);
            }
        ]
        ,
        fourth: ['three', function(results, callback){
            //results.four = 4;
            callback(null, 4);
        }]
    }, function(err, results){
        if(err){
            console.log('Error ' + err);
            res.status(400).send({error: err});
            return;
        }
        let obj = {
            one: results.one,
            two: results.two,
            three: results.three,
            four: results.four
        };
        res.status(200).send({
            data: obj
        });
    });
};

exports.asyncEach = function (req, res, next) {
    let squareList = [];
    function square (num, callback) {
        setTimeout(function () {
            let squareOfNumber = num * num;
            console.log('Number : ' + num + ', Square : ' + squareOfNumber);
            squareList.push(squareOfNumber);
            callback(null, squareOfNumber);
        }, 1000); 
    }

    async.each([1, 2, 3, 4], square, function (err, results) {
        if(err) {
           console.log('Error ' + err);
           res.status(400).send({
               error: err
           });
           return;
        }
        console.log("Square list : " + JSON.stringify(squareList));
        res.status(200).send({
           data: squareList
        });
   });
}


exports.asyncMap = function (req, res, next) {
    function square(num, callback) {
        setTimeout(function () {
            let squareOfNumber = num * num;
            console.log('Number : ' + num + ', Square : ' + squareOfNumber);
            callback(null, squareOfNumber);
        }, 1000);
    }

    async.map([1, 2, 3, 4], square, function (err, results) {
        if (err) {
            console.log('Error ' + err);
            res.status(400).send({
                error: err
            });
            return;
        }
        // console.log("Finished!" + JSON.stringify(squareList));
        res.status(200).send({
            data: results
        });
    });
}

exports.asyncEachSeries = function (req, res, next) {
    let squareList = [];

    function square(num, callback) {
        setTimeout(function () {
            let squareOfNumber = num * num;
            console.log('Number : ' + num + ', Square : ' + squareOfNumber);
            squareList.push(squareOfNumber);
            if(num == 1){
                callback('Error on 3', squareOfNumber);
                return;
            }
                
            callback(null, squareOfNumber);
        }, 1000);
    }

    async.eachSeries([1, 2, 3, 4], square, function (err, results) {
        if (err) {
            console.log('Error ' + err);
            res.status(400).send({
                error: err
            });
            return;
        }
        console.log("Square list : " + JSON.stringify(squareList));
        res.status(200).send({
            data: squareList
        });
    });
}


exports.asyncEachOf = function (req, res, next) {
    let squareList = [];

    function square(num, key, callback) {
        setTimeout(function () {
            let squareOfNumber = num * num;
            console.log('Key: ' + key + ', Number: ' + num + ', Square: ' + squareOfNumber);
            squareList.push(squareOfNumber);
            if (num == 1) {
                callback('Error on 3', squareOfNumber);
                return;
            }
            callback(null, squareOfNumber);
        }, 1000);
    }

    async.eachOf([1, 2, 3, 4], square, function (err, results) {
        if (err) {
            console.log('Error ' + err);
            res.status(400).send({
                error: err
            });
            return;
        }
        console.log("Square list : " + JSON.stringify(squareList));
        res.status(200).send({
            data: squareList
        });
    });
}

exports.asyncEachOfSeries = function (req, res, next) {
    let squareList = [];

    function square(num, key, callback) {
        setTimeout(function () {
            let squareOfNumber = num * num;
            console.log('Key: ' + key + ', Number: ' + num + ', Square: ' + squareOfNumber);
            squareList.push(squareOfNumber);
            // if (num == 3) {
            //     callback('Error on 3', squareOfNumber);
            //     return;
            // }
            callback(null, squareOfNumber);
        }, 1000);
    }

    async.eachOfSeries([1, 2, 3, 4], square, function (err, results) {
        if (err) {
            console.log('Error ' + err);
            res.status(400).send({
                error: err
            });
            return;
        }
        console.log("Square list : " + JSON.stringify(squareList));
        res.status(200).send({
            data: squareList
        });
    });
}