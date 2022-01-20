// we can rename connection as db or anything we choose.
const db = require("./databaseConfig");

const User = {
    findByID: function(userID, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
    
          if (err) {//database connection gt issue!
    
            console.log(err);
            return callback(err, null);
          } else {
          // We can use "?" as placeholder for user provided data.
          // The userID is passed in through the second parameter of the query  
          // method.
          // This is done instead of using string templates to prevent SQL 
          // injections.
          // https://github.com/mysqljs/mysql#escaping-query-values
    
            const findUserByIDQuery = "SELECT * FROM user WHERE id = ?;";
            dbConn.query(findUserByIDQuery, [userID], (error, results) => {
              dbConn.end();

              if (results.length === 0) {
                callback(null, null);
                return;
              };
          

              if (error) {
                return callback(error, null);
                
              };
              console.log(results);
              // return first element
              return callback(null, results[0]);
            });
          }
        });
    }, 
    findAll: function(callback) {
      
      //add in connection related code…
      var dbConn = db.getConnection();
      dbConn.connect(function (err) {
  
        if (err) {//database connection gt issue!
  
          console.log(err);
          return callback(err, null);
        } else {
          const findAllUsersQuery = "SELECT * FROM user;";
          dbConn.query(findAllUsersQuery, (error, results) => {
            if (error) {
              return callback(error, null);
              
            };
        
            return callback(null, results);
          });
        }
      });
    }, 
    insert: function(user, callback) {

        //add in connection related code…
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
    
          if (err) {//database connection gt issue!
    
            console.log(err);
            return callback(err, null);
          } else {
            const insertUserQuery =
            `
            INSERT INTO user (username, full_name, bio, date_of_birth)
            VALUES (?, ?, ?, ?);
            `;
            dbConn.query(
              insertUserQuery,
              [user.username, user.full_name, user.bio, user.date_of_birth],
              (error, results) => {
              dbConn.end();
                  if (error) {
                    return callback(error, null);
                    
                  };
                  return callback(null, results.insertId);
                });
          }
        });
    },
    edit: function(userID, user, callback) {
      //add in connection related code…
      var dbConn = db.getConnection();
      dbConn.connect(function (err) {
  
        if (err) {//database connection gt issue!
  
          console.log(err);
          return callback(err, null);
        } else {
          // update code
          const editUserQuery =
          `
          UPDATE user
          SET
            full_name = ?,
            username = ?,
            bio = ?,
            date_of_birth = ?
          WHERE id = ?
          `;
          dbConn.query(editUserQuery, [user.full_name, user.username, user.bio, user.date_of_birth, userID], (error, results) => {
            dbConn.end();
          if (error) {
              return callback(error);
              
            };
            return callback(null);
          });

        }
      });
    }, 

    addFriend: function(userIDOne, userIDTwo,  callback) {

      //add in connection related code…
      var dbConn = db.getConnection();
      dbConn.connect(function (err) {
  
        if (err) {//database connection gt issue!
  
          console.log(err);
          return callback(err, null);
        } else {
          const addFriendQuery =
          `
          INSERT INTO friendship (fk_friend_one_id, fk_friend_two_id)
          VALUES (?, ?);
          `;
          dbConn.query(
            addFriendQuery,
            [userIDOne, userIDTwo],
            (error, results) => {
              dbConn.end();
              if (error) {
                return callback(error, null);
                
              };
              return callback(null, results.insertId);
            });
        }
      });
  },
  removeFriend: function(userIDOne, userIDTwo,  callback) {

    //add in connection related code…
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {//database connection gt issue!

        console.log(err);
        return callback(err, null);
      } else {
        const removeFriendQuery =
        `
        DELETE FROM friendship WHERE fk_friend_one_id=? AND fk_friend_two_id=?;
        `;
        dbConn.query(
          removeFriendQuery,
          [userIDOne, userIDTwo],
          (error, results) => {
            dbConn.end();
            if (error) {
              return callback(error, null);
              
            };
            return callback(null, results.affectedRows);
          });
      }
    });
  },
  showFriends(userID, callback) {
    //add in connection related code…
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {//database connection gt issue!

        console.log(err);
        return callback(err, null);
      } else {
        const showFriendQuery =
        `
        SELECT * FROM friendship WHERE fk_friend_one_id=?;
        `;
        dbConn.query(
          showFriendQuery,
          [userID],
          (error, results) => {
            dbConn.end();
            if (error) {
              return callback(error, null);
              
            };
            return callback(null, results);
          });
      }
    });
  },
};

module.exports = User;
