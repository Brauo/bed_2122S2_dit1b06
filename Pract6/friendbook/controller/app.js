const express = require("express");
const app = express();

// import the User model
const User = require("../models/User");

// import the Post model
const Post = require("../models/Post");

// import body-parser middleware
const bodyParser = require("body-parser");

// use the middleware
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users/", (req, res, next) => {
  User.findAll((error, users) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    };
    res.status(200).send(users);
  });
});

app.get("/users/:userID/", (req, res, next) => {
    const userID = parseInt(req.params.userID);
    // if userID is not a number, send a 400.
    if (isNaN(userID)) {
      res.status(400).send();
      return;
    }
  
    User.findByID(userID, (error, user) => {
      if (error) {
        res.status(500).send();
        return;
      };
  
      // send a 404 if user is not found.
      if (user === null) {
        res.status(404).send();
        return;
      };
      res.status(200).send(user);
    });
  });

  app.post("/users/", (req, res, next) => {
    User.insert(req.body, (error, userID) => {
      if (error) {
        console.log(error);
        res.status(500).send();
        return;
      };
      res.status(201).send({
        userID
      });
    });
  });
  
  app.put("/users/:userID/", (req, res, next) => {
    const userID = parseInt(req.params.userID);
    if (isNaN(userID)) {
      res.status(400).send();
      return;
    }
  
    User.edit(userID, req.body, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send();
        return;
      };
      res.status(204).send();
    });
  });

// Posts
app.get("/posts/", (req, res, next) => {
    Post.findAll((error, posts) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      };
      res.status(200).send(posts);
    });
  });

app.get("/posts/:postID/", (req, res, next) => {
    const postID = parseInt(req.params.postID);
    // if userID is not a number, send a 400.
    if (isNaN(postID)) {
      res.status(400).send();
      return;
    }
    Post.findByID(postID, (error, post) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      };
      // send a 404 if post is not found.
      if (post === null) {
        res.status(404).send();
        return;
      };
      res.status(200).send(post);
    });
  });
  
  app.post("/posts/", (req, res, next) => {
    Post.insert(req.body, (error, postID) => {
      if (error) {
        console.log(error);
        res.status(500).send();
        return;
      };
      res.status(201).send({
        postID
      });
    });
  });

app.put("/posts/:postID/", (req, res, next) => {
    const postID = parseInt(req.params.postID);
    if (isNaN(postID)) {
      res.status(400).send();
      return;
    }
  
    Post.edit(postID, req.body, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send();
        return;
      };
      res.status(204).send();
    });
  });

app.delete("/posts/:postID/", (req, res, next) => {
    const postID = parseInt(req.params.postID);
    if (isNaN(postID)) {
      res.status(400).send();
      return;
    }
  
    Post.delete(postID, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send();
        return;
      };
      res.status(204).send();
    });
  });

app.get("/users/:userID/posts", (req, res, next) => {
    const userID = parseInt(req.params.userID);
    // if userID is not a number, send a 400.
    if (isNaN(userID)) {
      res.status(400).send();
      return;
    }
    //console.log("user id: "+ userID);
    Post.findByUserID(userID, (error, posts) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      };
      // send a 404 if post is not found.
      if (posts === null) {
        res.status(404).send();
        return;
      };
      res.status(200).send(posts);
    });
  });

app.get("/posts/:postID/likers", (req, res, next) => {
    const postID = parseInt(req.params.postID);
    // if postID is not a number, send a 400.
    if (isNaN(postID)) {
      res.status(400).send();
      return;
    }
    Post.findLikers(postID, (error, likers) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      };
      // send a 404 if post is not found.
      if (likers === null) {
        res.status(404).send();
        return;
      };
      res.status(200).send(likers);
    });
  });

app.post("/posts/:postID/likers/:likerID", (req, res, next) => {
    const postID = parseInt(req.params.postID);
    const likerID = parseInt(req.params.likerID);
    Post.like(postID, likerID, (error, postID) => {
      if (error) {
        console.log(error);
        if(error.code === "ER_DUP_ENTRY"){
            res.status(409).send();
        }else{
            res.status(500).send();
        }
        return;
      };
      res.status(201).send({
        postID
      });
    });
  });

app.delete("/posts/:postID/likers/:likerID", (req, res, next) => {
    const postID = parseInt(req.params.postID);
    const likerID = parseInt(req.params.likerID);
    Post.unlike(postID, likerID, (error, postID) => {
      if (error) {
        console.log(error);
        if(error.code === "ER_DUP_ENTRY"){
            res.status(409).send();
        }else{
            res.status(500).send();
        }
        return;
      };
      res.status(204).send({
        postID
      });
    });
  });

/*

/users/:userID/friends GET 

/users/:userID/friends/:friendID POST 

/users/:userID/friends/:friendID DELETE 
*/

app.get("/users/:userID/friends", (req, res, next) => {
  const userID = parseInt(req.params.userID);
  // if userID is not a number, send a 400.
  if (isNaN(userID)) {
    res.status(400).send();
    return;
  }

  User.showFriends(userID, (error, friends) => {
    if (error) {
      res.status(500).send();
      return;
    };

    // send a 404 if user is not found.
    if (friends === null) {
      res.status(404).send();
      return;
    };
    res.status(200).send(friends);
  });
});

app.post("/users/:userID/friends/:friendID", (req, res, next) => {
  const userID = parseInt(req.params.userID);
  const friendID = parseInt(req.params.friendID);
  // if userID is not a number, send a 400.
  if (isNaN(userID) || isNaN(friendID) ) {
    res.status(400).send();
    return;
  }

  User.addFriend(userID, friendID, (error, insertID) => {
    if (error) {
      if(error.code === "ER_DUP_ENTRY"){
        res.status(409).send();
      }
      else if(error.code === "ER_NO_REFERENCED_ROW_2"){
        res.status(400).send();
      }
      else{
        res.status(500).send();
      }
      return;
    };

    // send a 404 if user is not found.
    if (insertID === null) {
      res.status(404).send();
      return;
    };
    res.status(201).send({insertID});
  });
});

app.delete("/users/:userID/friends/:friendID", (req, res, next) => {
  const userID = parseInt(req.params.userID);
  const friendID = parseInt(req.params.friendID);
  if(userID === friendID){
    res.status(400).send();
    return;
  }

  User.removeFriend(userID, friendID, (error, affectedRows) => {
    if (error) {
      console.log(error);
      
      res.status(500).send();
      
      return;
    };
    res.status(204).send({
      affectedRows
    });
  });
});

module.exports = app;
