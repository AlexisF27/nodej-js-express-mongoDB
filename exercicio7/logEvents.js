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
  console.log(logItem);

  try {
    if(!fs.existsSync(path.join(__dirname, 'logs'))){
      await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }
    //testing
    await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
  
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = logEvents;
//NOTE:
//  npm i nodemon --save-dev that is how we install devdependencies 

//npm rm nodemon -D
// si se desistala alguna dependencia, esta no sera removide del packege, se lo tiene que hacer manual 



