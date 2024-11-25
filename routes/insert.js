var express = require('express');
var router = express.Router();
var mysqllib = require('../lib/mysql');

router.put('/', function(req, res, next) {
    let mysql = new mysqllib();
    let options = {
        host: req.body.mysql.host,
        user: req.body.mysql.user,
        password: req.body.mysql.password,
        database: req.body.mysql.database
    };
    if(req.body.mysql.hasOwnProperty('ssl')) {
        options.ssl = req.body.mysql.ssl;
    }
    let connection = mysql.connect(options);
    //console.log(req.body.values);
    let query = connection.query(req.body.query, req.body.values, function(err, results, rows) {
        //console.log(query.sql);
        connection.end();
        if(err) {
            res.status(500).json({
                result: 'error',
                error: err
            });
        } else {
            res.json({
                result: 'success',
                query: query.sql
            });
        }
    });
});

module.exports = router;
