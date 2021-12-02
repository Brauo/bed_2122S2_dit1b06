//-- model for category
// pg 20-21 in chapter 6

var db=require('./databaseConfig.js');

var categoryDB = { //-- object
    // -- functions or methods
    getCategory: function (callback) { 
        // connect to db
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {           
                console.log(err);
                return callback(err,null);
            }
            else{
                // run sql query
                var sql = 'SELECT * FROM category';
                
                conn.query(sql,function (err,result) {
                        // return result or error
                      if (err){
                        return callback(err,null);
                      }else{  
                        return callback(null,result);
                      }
                      conn.end(); 
                });

            }

        });  
        
    }
 
};

module.exports = categoryDB
