var db = require("./databaseConfig.js");
var config = require("../config.js");
var jwt = require("jsonwebtoken");
var async = require("async");

var recommend = {
  // add a recommendation to furniture
  // f_id = furniture id
  // f_rec_ids = what other furniture to recommend
  // f_rec_ids = array of id
  addRecommendation: (f_id, f_rec_ids, callback) => {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        // run async loops
        // using promises approach
        async
          .map(f_rec_ids, (item, callback2) => {
            console.log("processing: " + item);
            //what to do for each item in array
            var sql =
              "insert into recommend (furniture_id, rec_furniture_id) values(?,?)";
            conn.query(sql, [f_id, item], (err, result) => {
              return callback2(err, result);
            });
          })
          .then((results) => {
            console.log("async map done ");
            conn.end();
            return callback(null, results);
          })
          .catch((err) => {
            conn.end();
            return callback(err, null);
          });
      }
    });
  }
};

module.exports = recommend;
