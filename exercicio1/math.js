//NOTE: esta es una de las formas que se puede exportar las funcionalidades

// const add =(a,b) => a+b;
// const substract =(a,b) => a-b;
// const multiply =(a,b) => a*b;
// const divide =(a,b) => a/b;

// module.exports = {add, substract, multiply, divide} 

//-------------------------------------------------------------------------------------

//NOTE: se puede hacer de forma general añadiendo la palabra reservada exports antes de la const

exports.add = (a, b) => a + b;
exports.substract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;