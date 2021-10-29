let obj = {
    "name":"abc",
    "age":20, 
    "class":"1b06",
    "cca":["dragonboat", "basketball" , "badminton", "photography"], 
    "parent":{"name":"xyz", "age":50}
}
console.log(obj.name)
console.log(obj.age)

// use built in json function to convert to string
console.log(JSON.stringify(obj))

// convert to string
let str = JSON.stringify(obj)
// from string to JSON object
let obj2 = JSON.parse(str)
console.log(obj2.name)
// print out 3rd cca in array
console.log(obj2.cca[2])