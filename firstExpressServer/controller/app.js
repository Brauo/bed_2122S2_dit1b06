var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var user = require("../model/user.js");
//-- pg 21 chapter 6
// import categoryDB from category.js, name as category
var category = require("../model/category.js");
//-- pg 22 chapter 6
// import furnitureDB from furniture.js
var furniture = require("../model/furniture.js");

var recommend = require("../model/recommend");

var verifyToken = require("../auth/verifyToken.js");
var cors = require("cors");

//app.options("*", cors());
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(urlencodedParser);

app.get("/user/:userid", function (req, res) {
  var id = req.params.userid;

  user.getUser(id, function (err, result) {
    if (!err) {
      res.send(result);
    } else {
      res.status(500).send("Some error");
    }
  });
});

app.post("/user/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  user.loginUser(email, password, function (err, token, result) {
    if (!err) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      delete result[0]["password"]; //clear the password in json data, do not send back to client
      console.log(result);
      res.json({
        success: true,
        UserData: JSON.stringify(result),
        token: token,
        status: "You are successfully logged in!"
      });
      res.send();
    } else {
      res.status(500);
      res.send(err.statusCode);
    }
  });
});

app.post("/user/logout", function (req, res) {
  console.log("..logging out.");
  //res.clearCookie('session-id'); //clears the cookie in the response
  //res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, status: "Log out successful!" });
});

// update user using PUT
// inputs : username, email, role
app.put("/user", verifyToken, function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var role = req.body.role;

  user.updateUser(username, email, role, function (err, result) {
    if (!err) {
      console.log("Update successful");
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        result: result,
        status: "Record updated successfully!"
      });
    } else {
      res.status(500);
      res.send(err.statuscode);
    }
  });
});

app.post("/user", function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var role = req.body.role;
  var password = req.body.password;
  var pic = req.body.pic;

  user.addUser(username, email, role, password, pic, function (err, result) {
    if (!err) {
      res.status(200);
      res.send(result);
    } else {
      res.status(500);
      res.send('{"message":"Some error!"}');
    }
  });
});

// return all users using GET
app.get("/user", function (req, res) {
  user.getUsers(function (err, result) {
    if (!err) {
      res.send(result);
    } else {
      res.status(500).send(null);
    }
  });
});

// pg 22 chapter 6. get furniture by category
app.get("/category/:catid/furniture", function (req, res) {
  //fill in your code
  // get cat id
  var catid = req.params.catid;

  // call the getFurnitureByCat
  furniture.getFurnitureByCat(catid, (err, result) => {
    // arrow function
    if (err) {
      // if there is error
      // assume return status code 500
      res.status(500).send({ message: "some error" });
    } else {
      // no error
      // assume respond status code 200
      // just respond with the result
      res.status(200).send(result);
    }
  });
});

// pg 21 chapter 6. get the category
app.get("/category", function (req, res) {
  // use the object categoryDB in category.js
  // call getCategory function or method in object
  category.getCategory(function (err, result) {
    //-- callback function
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.status(500).send({ message: "some error" });
    }
  });
});

app.post("/category", verifyToken, function (req, res) {
  var cat_name = req.body.cat_name;
  var cat_description = req.body.cat_description;
  // use the object categoryDB in category.js
  // call getCategory function or method in object
  category.addCategory(cat_name, cat_description, function (err, result) {
    //-- callback function
    if (!err) {
      res.send({
        affectedRows: result.affectedRows,
        insertId: result.insertId
      });
    } else {
      console.log(err);
      res.status(500).send({ message: "some error" });
    }
  });
});

app.put("/category/:id", verifyToken, function (req, res) {
  var cat_name = req.body.cat_name;
  var cat_description = req.body.cat_description;
  var cat_id = req.params.id;
  // use the object categoryDB in category.js
  // call getCategory function or method in object
  category.updateCategory(cat_id, cat_name, cat_description, function (
    err,
    result
  ) {
    //-- callback function
    if (!err) {
      res.send({ affectedRows: result.affectedRows });
    } else {
      console.log(err);
      res.status(500).send({ message: "some error" });
    }
  });
});

app.post("/furniture", verifyToken, function (req, res) {
  // name, description, price, quantity, cat_id, images, item_code, dimension
  var name = req.body.name;
  var description = req.body.description;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var cat_id = req.body.cat_id;
  var images = req.body.images;
  var item_code = req.body.item_code;
  var dimension = req.body.dimension;
  // use the object categoryDB in category.js
  // call getCategory function or method in object
  furniture.addFurniture(
    name,
    description,
    price,
    quantity,
    cat_id,
    images,
    item_code,
    dimension,
    function (err, result) {
      //-- callback function
      if (!err) {
        res.send({
          affectedRows: result.affectedRows,
          insertId: result.insertId
        });
      } else {
        console.log(err);
        res.status(500).send({ message: "some error" });
      }
    }
  );
});
app.put("/furniture/:id", verifyToken, function (req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var cat_id = req.body.cat_id;
  var images = req.body.images;
  var item_code = req.body.item_code;
  var dimension = req.body.dimension;
  var it_id = req.params.id;
  // use the object categoryDB in category.js
  // call getCategory function or method in object
  furniture.updateFurniture(
    it_id,
    name,
    description,
    price,
    quantity,
    cat_id,
    images,
    item_code,
    dimension,
    function (err, result) {
      //-- callback function
      if (!err) {
        res.send({ affectedRows: result.affectedRows });
      } else {
        console.log(err);
        res.status(500).send({ message: "some error" });
      }
    }
  );
});

// pg 22 chapter 6. get furniture by category
app.get("/furniture/:id", function (req, res) {
  //fill in your code
  // get furniture id
  var it_id = req.params.id;

  // call the getFurnitureById
  furniture.getFurnitureById(it_id, (err, result) => {
    // arrow function
    if (err) {
      // if there is error
      // assume return status code 500
      res.status(500).send({ message: "some error" });
    } else {
      // no error
      // assume respond status code 200
      // just respond with the result
      res.status(200).send(result);
    }
  });
});
app.get("/furniture", function (req, res) {
  //fill in your code

  // call the getFurniture
  furniture.getFurniture((err, result) => {
    // arrow function
    if (err) {
      // if there is error
      // assume return status code 500
      res.status(500).send({ message: "some error" });
    } else {
      // no error
      // assume respond status code 200
      // just respond with the result
      res.status(200).send(result);
    }
  });
});

// added endpoint to add recommendation
app.post("/recommend", (req, res) => {
  var f_id = req.body.f_id;
  // split string input to array using comma
  var f_rec_ids = req.body.f_rec_ids.split(",");

  recommend.addRecommendation(f_id, f_rec_ids, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "error adding recommend" });
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
// test recommend
// recommend.addRecommendation(1, [5, 6], (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });
module.exports = app;
