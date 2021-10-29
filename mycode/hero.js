const superhero = { //-- using curly brace. it's an object
    // define a function called fly, 
    fly: () => {
        console.log("flying...")
    }, //-- comma to separate functions or variables/attributes/properties

    xrayVision: (depth) => {
        console.log("i can see thru this depth of " + depth)
    }, 
    // life:99,  //-- test a variable
    //-- careful. bad coding practice. 
    kenahit:(damage) => {
        //console.log("my life is still " + superhero.life + " even with damage: " + damage)
        console.log("kena damage: " + damage)
    }
}

module.exports = superhero