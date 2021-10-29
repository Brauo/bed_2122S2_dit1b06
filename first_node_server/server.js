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
        else{ // -- if method is post or others, not get
            // show error page
            fileURL = "/error.html"
            filePath = path.resolve("./public" + fileURL)
            // read the html file in public folder and serve it out through
            // http response
            fs.createReadStream(filePath).pipe(res)
        }
    }
)
//-- make this server listen
server.listen(port, hostname, ()=>{
    console.log(`Server started at http://${hostname}:${port}/`)
})
