var jwt = require("jsonwebtoken")

var config = require("../config.js")

function verifyToken(req, res, next){
    console.log(req.header)

    var token = req.header('authorization') //get authorization header content
    console.log(token)

    if(!token || !token.includes('Bearer')){
        // token not present or no "Bearer"
        res.status(403)
        return res.send({
            auth:false,
            message:'Not authorized!'
        })
    }else{
        // split "Bearer" from token
        token = token.split('Bearer ')[1] // get token value
        console.log(token)
        jwt.verify(token, config.key, (err, decoded)=>{
            if(err){
                res.status(403)
                return res.send({
                    auth:false,
                    message:'Not authorized!'
                })
            }else{
                // store the decoded userid in req for use
                req.userid=decoded.userid
                // store role in req for next to use
                req.role = decoded.role
                next()

            }
        })
    }
}

module.exports = verifyToken