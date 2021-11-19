// import modules we need for this program
const http = require("http")
const fs = require("fs")
const path = require("path")

const hostname = "localhost" //-- 127.0.0.1
const port = 3000
const server = http.createServer(
    // listener function
    (req, res) => {
        //-- assume ignore request
        //-- just respond with something
        // res.statusCode = 200
        // res.setHeader("Content-Type", "text/html")
        // res.end("<html><body>welcome to dit 1b06 nodejs demo</body></html>")

        // read the headers, method and url
        // from Practical 02 pg2
        const { headers, method, url } = req;
        let body = [];
        
        req.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            // print out what was sent here. 
            // for debugging purpose
            console.log(body)
            console.log(body.length);
            // At this point, we have the headers, method, url and body, and can now
            // do whatever we need to in order to respond to this request.

            // transfer the conditional codes of GET or POST, etc
            // here so that you can access body, method, etc. 
            //-- check request and respond accordingly
            if(req.method =="GET"){
                var fileURL = req.url

                if(req.url =="/") // default file is index.html
                    fileURL = "/index.html"
                
                var filePath = path.resolve("./public" + fileURL)

                // if file exists? 
                fs.exists(filePath, (exists)=>{
                    if(!exists){
                        // show error page
                        fileURL = "/error.html"
                        filePath = path.resolve("./public" + fileURL)
                    }else{
                        // file exist, respond with file
                        res.statusCode = 200
                        res.setHeader("Content-Type", "text/html")

                    }
                    fs.createReadStream(filePath).pipe(res)
                })
            }
            //-- handle POST
            else if(req.method =="POST"){
                // check if username and password correct? 
                // DO on your own... no free lunch
                // Recall your FOP
                
                // DEMO how to send username back
                // read username from JSON string
                // first convert from JSON string to object
                var input = JSON.parse(body)
                // print to console the username
                console.log(input.username)
                // get ready object to respond
                var output = {"message":"welcome "+input.username}
                // time to respond
                res.statusCode = 200
                // set content type to json
                res.setHeader("Content-Type", "application/json")
                // send message back
                res.end(JSON.stringify(output))

                // if password or username wrong
                // send html back use code above or below as sample
            }
            else{ // -- if method is others
                // show error page
                fileURL = "/error.html"
                filePath = path.resolve("./public" + fileURL)
                // read the html file in public folder and serve it out through
                // http response
                fs.createReadStream(filePath).pipe(res)
            }

        });


        
    }
)
//-- make this server listen
server.listen(port, hostname, ()=>{
    console.log(`Server started at http://${hostname}:${port}/`)
})
