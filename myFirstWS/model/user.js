var db = require('./databaseConfig.js');
var userDB = {
    // a new method to get all users
    getUsers: function (callback) {
        var conn = db.getConnection();
 
        //implement the database query and return result if successful
        conn.connect(function(err){
            if(err){ //-- check if database connection error
                console.log(err)
            }else{
                console.log("database connected!")
                // if no error, proceed to query
                var sql = "SELECT * FROM user;"
                conn.query(sql, function (err, result) {
                    // once we get result, close connection
                    // to conserve server resource
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        })
    }, // comma to separate the properties of the object 
    // callback IS a function! NOTE!!
    getUser: function (userid, callback) {

        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                //  use callback function 
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM user WHERE userid = ?';
                conn.query(sql, [userid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    } //-- end of getUser
}

module.exports = userDB
