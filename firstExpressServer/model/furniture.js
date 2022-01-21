// -- from pg 22 chapter 6
//-- template to start
var db=require('./databaseConfig.js');

var furnitureDB = {
    getFurniture:(callback)=>{
        var dbConn = db.getConnection()
        dbConn.connect((err)=>{ // using arrow function as callback
            if(err){
                // return err to callback(err, result)
                return callback(err, null)
            }else{
                // run sql query
                var sql ='select * from furniture '
                dbConn.query(sql, [], (err, result)=>{ // arrow function
                    dbConn.end()
                    return callback(err, result)
                } )
                // return result
            }
        })
    }, 
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
                    dbConn.end()
                    return callback(err, result)
                } )
                // return result
            }
        })
    }, 
    getFurnitureById: function (it_id,callback) { 
        //fill in your code        
        // connect to db     
        var dbConn = db.getConnection()
        dbConn.connect((err)=>{ // using arrow function as callback
            if(err){
                // return err to callback(err, result)
                return callback(err, null)
            }else{
                // run sql query
                var sql ='select * from furniture where it_id=?'
                dbConn.query(sql, [it_id], (err, result)=>{ // arrow function
                    dbConn.end()
                    return callback(err, result)
                } )
                // return result
            }
        })
    }, 
    addFurniture:(name, description, price, quantity, cat_id, images, item_code, dimension, callback)=>{
        // connect to db     
        var dbConn = db.getConnection()
        dbConn.connect((err)=>{ // using arrow function as callback
            if(err){
                // return err to callback(err, result)
                return callback(err, null)
            }else{
                // run sql query
                var sql ='insert into furniture (name, description, price, quantity, cat_id, images, item_code, dimension) values (?,?,?,?,?,?,?,?)'
                dbConn.query(sql, [name, description, price, quantity, cat_id, images, item_code, dimension], (err, result)=>{ // arrow function
                    dbConn.end()
                    return callback(err, result)
                } )
                // return result
            }
        })
    }, 
    updateFurniture:(it_id, name, description, price, quantity, cat_id, images, item_code, dimension, callback)=>{
        // connect to db     
        var dbConn = db.getConnection()
        dbConn.connect((err)=>{ // using arrow function as callback
            if(err){
                // return err to callback(err, result)
                return callback(err, null)
            }else{
                // run sql query
                var sql ='update furniture set name=?, description=?, price=?, quantity=?, cat_id=?, images=?, item_code=?, dimension=? where it_id=?'
                dbConn.query(sql, [name, description, price, quantity, cat_id, images, item_code, dimension, it_id], (err, result)=>{ // arrow function
                    dbConn.end()
                    return callback(err, result)
                } )
                // return result
            }
        })
    }

};
// export this object to other files
module.exports = furnitureDB
