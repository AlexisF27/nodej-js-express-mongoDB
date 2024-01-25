//console.log("!")
//NOTE: npm install nodemon -g  te permite correro los ficheros sin necesidad de cargarlos node exercicio3/index
//  aunque si lo hago desde la carpeta padre, aun tengo que especificar la direccion del fichero pero sin el fichero
//  nodemon exercicio3

const {format} = require('date-fns');
const { v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path')

const logEvents = async (message, logName) =>{
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime} \t${uuid()}\t${message} \n`


  try {
    if(!fs.existsSync(path.join(__dirname, '..',  'logs'))){
      await fsPromises.mkdir(path.join(__dirname,'..', 'logs'));
    }
    //testing
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
  
  } catch (error) {
    console.log(error);
    
  }
}

const logger = (request, response, next) => {
  //the request method - 
  //the headers significa where the request is coming from 
  //the url that is being requested
  //que file va a crear 
  logEvents(`${request.method} \t ${request.header.oringin}  \t ${request.url} `, 'requestLog.txt')
  console.log(`${request.method} - ${request.path} `);
  next();
}; 


module.exports = {logEvents , logger};
//NOTE:
//  npm i nodemon --save-dev that is how we install devdependencies 

//npm rm nodemon -D
// si se desistala alguna dependencia, esta no sera removide del packege, se lo tiene que hacer manual 



