// NOTE: How NodeJs differs from Vanilla JSON 
//  - Node runs on a server - not in a brownser (backend not fronted)
//  - The console is the terminal window
console.log('Hello World')
// ALL: en la consola executar node exercicio1/server (no es necesario la terminacion js)

//  - global objects istead of window object
console.log(global)

// Has common core modules that we will explore 
// Common JS modules instead of ES6 modules 
// its needed the require syntax in order to import modules

const os = require('os');
const path = require('path');

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))
// console.log(path.parse(__filename))

// NOTE: se le puede hacer destrucutrar el contenido del archivo al cual estoy accediendo
//   y solamente traer sus funciones 

const {add, substract, multiply, divide} = require('./math');

console.log(add(2,3));
console.log(substract(2,3));
console.log(multiply(2,3));
console.log(divide(2,3));

//node js no  tiene algunos JS APIs like fetch