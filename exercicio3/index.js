//console.log("!")
//NOTE: npm install nodemon -g  te permite correro los ficheros sin necesidad de cargarlos node exercicio3/index
//  aunque si lo hago desde la carpeta padre, aun tengo que especificar la direccion del fichero pero sin el fichero
//  nodemon exercicio3

const {format} = require('date-fns');
const { v4: uuid} = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

console.log(uuid());
console.log("HEllo");
//NOTE:
//  npm i nodemon --save-dev that is how we install devdependencies 
