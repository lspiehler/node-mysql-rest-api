var mysql = require('mysql');

var connect = function(mysqlopts) {
    var connection = mysql.createConnection({
        host: mysqlopts.host,
        user: mysqlopts.user,
        password: mysqlopts.password,
        database: mysqlopts.database
    });
    
    connection.connect();

    return connection;
}

module.exports = function() {
    this.connect = function(mysqlopts) {
        return connect(mysqlopts);
    }
}