// import express cos we want to use this framework 
// to create server in an even easier way
var express = require("express")
// to serve out html or static files
var serveStatic = require("serve-static")

// start an app using express
var app = express()

var port = 3000
var hostname = "localhost" // or use 127.0.0.1

// create our own custom middleware
// run this before serving the static pages
app.use(function(req, res, next){ 
    //-- req = request
    //-- res = response
    //-- next = next() function. pass info to next middleware
    console.log(req.url)
    console.log(req.method)
    console.log(req.path)
    // a custom parameter in url with name id
    console.log(req.query.id)

    //-- experiment with response
    res.status(200)
    res.type(".html")
    res.write("<html><body>response from express. id="+
        req.query.id    //-- print id on browser
        +"</body></html>")
    res.end() //-- end of response writing
    //-- redirect demo
    //-- make sure the status, type, write and end above are not run before redirect
    //res.redirect("https://www.sp.edu.sg")
    //next() //-- done with response . not sending to next middleware
})

// configure express to know what to do
// first middleware code 
app.use(serveStatic(__dirname + '/public')) // apply middleware with app.use

// get the express app to run with the server
app.listen(port, hostname, 
    () => { //-- callback function once server ready
        console.log(`Server started and accessible via http://${hostname}:${port}/`)
    }
)
