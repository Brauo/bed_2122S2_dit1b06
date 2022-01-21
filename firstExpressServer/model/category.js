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
        
    }, 
    addCategory: function (cat_name, cat_description, callback) { 
      // connect to db
      var conn = db.getConnection();
      conn.connect(function (err) {
          if (err) {           
              console.log(err);
              return callback(err,null);
          }
          else{
              // run sql query
              var sql = 'insert into category (cat_name, cat_description) values(?, ?)';
              
              conn.query(sql,[cat_name, cat_description], function (err,result) {
                      // return result or error
                      conn.end();
                    return callback(err, result)
                     
              });

          }

      });  
      
  }, 
  updateCategory: function (cat_id, cat_name, cat_description, callback) { 
    // connect to db
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {           
            console.log(err);
            return callback(err,null);
        }
        else{
            // run sql query
            var sql = 'update category set cat_name=?, cat_description=? where cat_id=?';
            
            conn.query(sql, [cat_name, cat_description, cat_id], function (err,result) {
                    // return result or error
                    conn.end();
                  return callback(err, result)
                   
            });

        }

    });  
    
}
 
};

module.exports = categoryDB
