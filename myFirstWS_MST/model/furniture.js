// -- from pg 22 chapter 6
//-- template to start
var db=require('./databaseConfig.js');

var furnitureDB = {
    getFurnitureByCat: function (catid,callback) { 
        //fill in your code        
        // connect to db     
        var dbConn = db.getConnection()
        dbConn.connect((err)=>{ // using arrow function as callback
            if(err){
                // return err to callback(err, result)
                return callback(err, null)
            }else{
                // run sql query
                var sql ='select * from furniture where cat_id=?'
                dbConn.query(sql, [catid], (err, result)=>{ // arrow function
                    return callback(err, result)
                } )
                // return result
            }
        })
    }

};
// export this object to other files
module.exports = furnitureDB
