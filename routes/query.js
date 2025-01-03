var express = require('express');
var router = express.Router();
var mysqllib = require('../lib/mysql');

const queryType = function(query) {
    const firstspace = query.indexOf(' ');
    const firstword = query.substring(0, firstspace);
    return firstword;
};

const query = function(req, callback) {
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
        callback(err,{
            results: results,
            query: query,
            rows: rows
        });
    });
};

router.put('/', function(req, res, next) {
    // Extract the first word of the query to determine the query type
    if(queryType(req.body.query) != "INSERT") {
        res.status(500).json({
            error: "Only INSERT queries are allowed with the HTTP PUT method."
        });
    } else {
        query(req, function(err, query) {
            if(err) {
                res.status(500).json({
                    error: err,
                    results: query.results
                });
            } else {
                res.json({
                    error: false,
                    results: query.results,
                    query: query.query.sql
                });
            }
        });
    }
});

router.patch('/', function(req, res, next) {
    // Extract the first word of the query to determine the query type
    if(queryType(req.body.query) != "UPDATE") {
        res.status(500).json({
            error: "Only UPDATE queries are allowed with the HTTP PATCH method."
        });
    } else {
        query(req, function(err, query) {
            if(err) {
                res.status(500).json({
                    error: err,
                    results: query.results
                });
            } else {
                res.json({
                    error: false,
                    results: query.results,
                    query: query.query.sql
                });
            }
        });
    }
});

router.delete('/', function(req, res, next) {
    // Extract the first word of the query to determine the query type
    console.log(req.body.query.toUpperCase());
    if(queryType(req.body.query.toUpperCase()) != "DELETE") {
        res.status(500).json({
            error: "Only DELETE queries are allowed with the HTTP DELETE method."
        });
    } else {
        query(req, function(err, query) {
            if(err) {
                res.status(500).json({
                    error: err,
                    results: query.results
                });
            } else {
                res.json({
                    error: false,
                    results: query.results,
                    query: query.query.sql
                });
            }
        });
    }
});

router.post('/', function(req, res, next) {
    // Extract the first word of the query to determine the query type
    if(queryType(req.body.query) != "SELECT") {
        res.status(500).json({
            error: "Only SELECT queries are allowed with the HTTP POST method."
        });
    } else {
        query(req, function(err, query) {
            if(err) {
                res.status(500).json({
                    error: err,
                    results: query.results
                });
            } else {
                res.json({
                    error: false,
                    results: query.results,
                    query: query.query.sql,
                    rows: query.rows
                });
            }
        });
    }
});

module.exports = router;
