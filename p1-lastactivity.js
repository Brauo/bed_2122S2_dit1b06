//-- how to import fs
const fs = require("fs")

//-- write to file
fs.writeFile("test2.txt", //-- name of file
    "hello123 \n next line", //-- what to write
    (err, data)=>{ //-- callback when write is done or having error
        if(err){
            console.log(err)
        }else{
            console.log(data) //-- undefined as no incoming data, not read
            //-- pract 1 - read file. do on your own
        }
    }
)
console.log("writing file")
