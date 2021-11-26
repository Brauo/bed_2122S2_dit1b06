var express = require('express');
var app = express();
var user = require('../model/user.js'); 

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded

// add the DELETE api
app.delete('/api/user/:userid', function (req, res) {
    
    var userid = req.params.userid;
    
    user.deleteUser(userid, function (err, result) {
        if (!err) {
        
            res.send(result + ' record deleted');
        }else{
            console.log(err);
         
            res.status(500).send("Some error");
 
        }
    });
 
});


// add the PUT api here
app.put('/api/user/:userid', function (req, res) {
    // get the info from body
    var email = req.body.email
    var password = req.body.password
    var userid = req.params.userid
    
    //implement your code    
    user.updateUser(email, password, userid, 
        (err, result)=>{
            if(!err){
                // no error. shiok!
                console.log(result);
                res.send(result + ' record updated');
            }else{
                // got error !!! 
                console.log(err)
                res.send(err.statusCode);
            }
        })
    
});


// POST
app.post('/api/user',  function (req, res) {
    // get the info posted from postman
    var username = req.body.username;
    var email = req.body.email; 
    var role = req.body.role;
    var password = req.body.password;
    // add user into database
    user.addUser(username, email, role, password, 
        function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result + ' record inserted');
        } else{
            res.send(err.statusCode);

        }
    });

});


// add get users api
app.get('/api/user', function (req, res) {

    user.getUsers( function (err, result) {
        if (!err) {
            res.send(result);
        }
        else{
            console.log(err);

            res.status(500).send("Some error");
        }
    });

});


app.get('/api/user/:userid', function (req, res) {
    var id = req.params.userid;

    user.getUser(id, function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        }else{
            res.status(500).send("Some error");
        }
    });

});

module.exports = app
