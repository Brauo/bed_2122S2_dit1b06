let f = require("./formula.js")

console.log("multiply 5x 3 = " + f.mul(5, 3))
console.log("add 4x 6 = " + f.add(4, 6))

//-- 2nd demo using objects as export
let h = require("./mycode/hero")
// use function in the object
h.fly()
h.xrayVision(999)
h.kenahit(10000)

let f2 = require("./formula2")
//console.log(f2.multiply(2,3))
//-- call multiply and provide a callback
console.log("running multiply in formula2")
f2.multiply(2, 3, //-- a, b
    (error, result)=>{ //-- callback
        if(error){
            console.log(error)
        } 
        if(result){
            console.log( "the result is " +  result)
        }
    }   
)
f2.multiply(Infinity, 3, //-- a, b
    (error, result)=>{ //-- callback
        if(error){
            console.log(error)
        } 
        if(result){
            console.log( "the result is " +  result)
        }
    }   
)


//-- additional test using exported class
var person = require('./mycode/Person.js');
var person1 = new person('James', 'Bond');
console.log(person1.fullName());

let hero = require("./mycode/hero2")
let h2 = new hero("bruce", 10)
h2.fly()
h2.xrayVision(-1)
h2.kenahit(20)

let h3 = new hero("clark", 99999)
h3.fly()
h3.xrayVision(2000)
h3.kenahit(1000)