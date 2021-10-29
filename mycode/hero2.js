//-- cannot use arrow function. 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
const superhero = function(name, power) { 
    // variables or properties 
    this.name = name
    this.power = power
    this.life = 99
    // add methods/functions
    this.fly = () => {
        console.log( this.name + " flying with power " + this.power)
    }

    this.xrayVision = (depth) => {
        console.log( this.name + " can see thru this depth of " + depth)
    } 
    
    this.kenahit = (damage) => {
        console.log(this.name + " life is still " + this.life + " even with damage: " + damage)
        //console.log("kena damage: " + damage)
    }
}


// {
//     // define a function called fly, 
//     fly: () => {
//         console.log("flying...")
//     }, //-- comma to separate functions or variables/attributes/properties

//     xrayVision: (depth) => {
//         console.log("i can see thru this depth of " + depth)
//     }, 
//     // life:99,  //-- test a variable
//     //-- careful. bad coding practice. 
//     kenahit:(damage) => {
//         //console.log("my life is still " + superhero.life + " even with damage: " + damage)
//         console.log("kena damage: " + damage)
//     }
// }

module.exports = superhero