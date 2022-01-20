var mysql = require('mysql');
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "friendbook",
            // retain DATE as a string
            dateStrings: true

        });     
        return conn;
    }
};
module.exports = dbconnect
