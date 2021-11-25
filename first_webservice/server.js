//-- ADD code
var express = require('express');
var bodyParser = require('body-parser');
var port=8081;//use another port 8081 for this exercise
var hostname="localhost";

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// add in practical 3 user array, before program starts
var userData= [
    {
        "userid": 1,
        "username": "John",
        "email": "john@gmail.com",
        "role": "user",
        "password": "abc123"
    },
    {
        "userid": 2,
        "username": "mary",
        "email": "mary@gmail.com",
        "role": "user",
        "password": "abc123"
    }
]

// create variable to store next user id and increment when needed
var uid = 3 // since the current is 2

app.use(urlencodedParser);//attach body-parser middleware
app.use(bodyParser.json());//parse json data
//VERB+URL 
app.get('/api/user', function (req, res) {

   res.status(200);
   res.type(".html");
   // respond with data sent
   // respond with user array
   // not using res.end() as no more things can be written
   //res.end("Data of all users sent!");
   res.write("Data of all users sent!");
   res.write("<div>" + JSON.stringify(userData) + "</div>")
    res.end()
});

// Chapter 4 2nd part, POST
app.post('/api/user', function (req, res) {
    // collect what the user send to here
    var un = req.body.username //-- do refer to question paper
    var email = req.body.email
    var role = req.body.role
    var password = req.body.password

    // add this user into the array
    userData.push(
        {
            "userid": uid++, // set id and inc by 1 after this
            "username": un,
            "email": email,
            "role": role,
            "password": password
        }
    )

    // respond back with what user sent
    res.status(200)
    res.type(".html");
    res.write("Received new user data: \n")
    res.write("<br/>UserName" + un + "\n")
    res.write("<br/>Email" + email + "\n")
    res.write("<br/>Role" + role + "\n")
    res.write("<br/>Password" + password + "\n")
    res.end()
})

// pract 3 PUT and DELETE
app.put('/user/:id', function (req, res) {
    // simple demo how to get the id in ":id"
    console.log("/:id = " + req.params.id)
    // DO the rest on your own
    var id = req.params.id
    // get the new email from body
    var email = req.body.email
    console.log("id : " + id)
    console.log("new email : " + email)
    // create a storage to remember whether id found
    var idFound = false
    // loop thru array when id is not found
    for(var i=0; i<userData.length && !idFound; i++){
        // check if id is the same as array item's id
        if(userData[i].userid == id){
            // set found
            idFound = true
            // if same, change email
            userData[i].email = email
            // respond
            res.status(200)
            res.type('json')
            // format the json object to respond
            var jsonRespond = {"message": 
                "User with <"+id+
                "> has been successfully updated with new email <"
                +email+">!"}
            // respond with the string version of the json object
            res.end(JSON.stringify(jsonRespond))
        }
    } //-- end of for loop
    // respond if id not found
    if(!idFound){
        // respond
        res.status(404)
        res.type('json')
        // format the json object to respond
        var jsonRespond = {"message": 
            "User with <"+id+
            "> not found!"}
        // respond with the string version of the json object
        res.end(JSON.stringify(jsonRespond))
    }
})

app.delete('/user/:id', function (req, res) {
    // simple demo how to get the id in ":id"
    console.log("/:id = " + req.params.id)
    // DO the rest on your own
    var id = req.params.id
    // create a storage to remember whether id found
    var idFound = false
    // loop thru array when id is not found
    for(var i=0; i<userData.length && !idFound; i++){
        // check if id is the same as array item's id
        if(userData[i].userid == id){
            // set found
            idFound = true
            // if same, delete this user
            userData.splice(i, 1)
            // respond
            res.status(200)
            res.type('json')
            // format the json object to respond
            var jsonRespond = {"message": 
                "User with <"+id+
                "> has been successfully deleted!"}
            // respond with the string version of the json object
            res.end(JSON.stringify(jsonRespond))
        }
    } //-- end of for loop
    // respond if id not found
    if(!idFound){
        // respond
        res.status(404)
        res.type('json')
        // format the json object to respond
        var jsonRespond = {"message": 
            "User with <"+id+
            "> not found!"}
        // respond with the string version of the json object
        res.end(JSON.stringify(jsonRespond))
    }
})

app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
  });


//-- DO NOT remove this. 
module.exports = app;