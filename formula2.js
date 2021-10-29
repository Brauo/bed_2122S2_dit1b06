// function in this file
// const to fix the code in function. no more changes
const f = {
    multiply : (a, b, callback) => {
        // -- if a or b is infinite then show error
        if(a == Infinity || b == Infinity){
            // set a timeout after 2 seconds
            setTimeout(
                ()=>{ //-- handler to run when timeout
                    //-- call the callback function with 2 parameters
                    // -- 1 error, no result
                    callback(new Error("values cannot be inifinite"), null)
                },
                2000 //-- 2000 millisec
            )
        }
        else{ //-- assume no more error
            setTimeout( //-- fake a delay, simulate internet lag
                // handler
                () => {
                    // call callback function with 2 parameters. 
                    // no error, with result
                    callback(null, a*b  )
                }, 
                // duration
                2000
            )
        }
        
    }, 
    add : (x, y) => x+y
}

module.exports = f
