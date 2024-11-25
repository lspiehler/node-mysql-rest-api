var mysql = require('mysql');

var connect = function(mysqlopts) {
    var connection = mysql.createConnection(mysqlopts);
    
    connection.connect();

    return connection;
}

module.exports = function() {
    this.connect = function(mysqlopts) {
        return connect(mysqlopts);
    }
}