//NOTE: para importar el readFile module
//const fs = require('fs');
//NOTE: que interesante que tiene que ser definido el .promises
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'promeseCompleted2.txt'), 'utf8');
    console.log(data);
    // await fsPromises.unlink(path.join(__dirname, 'files', 'myname.txt'));
    await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'),data);
    await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n Nice to meet you');
    await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'myname.txt'));
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promeseCompleted2.txt'), 'utf8');
    console.log(newData);
  } catch (err) {
    console.log(err);

  }
}
fileOps();

//TODO: que extraño me deberia solamente funcionar teniendo .files/lorem.text (no encuentra la directoria)

// fs.readFile('/mnt/c/Users/alexi/Documents/projects/nodejs-tutorial/exercicio2/files/lorem.txt' , 'utf8', (err, data) => {

//   if (err) throw err;

//   console.log(data.toString());
// })

//se puede realizar de otra manera 
// fs.readFile(path.join(__dirname, 'files', 'lorem.txt'), 'utf8', (err, data) => {

//   if (err) throw err;

//   console.log(data.toString());
// })


// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', (err) => {

//   if (err) throw err;

//   console.log('Write complete');
// })

//NOTE: El append permite modificar un fichero pero si en caso no exista ese fichero lo crea

// fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Testing test', (err) => {

//   if (err) throw err;

//   console.log('Append complete');
// })

//NOTE: esto esta quedando con mucho codigo, es lo que se llama, callback infierno, son promesas dentro de otros callbacks

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', (err) => {

//   if (err) throw err;

//   fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is.', (err) => {

//     if (err) throw err;

//     fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'replyComplete.txt'),  (err, data) => {

//       if (err) throw err;

//       console.log('Rename complete');
//     })
//   })

// })




// se tiene que sacar al throw, coger la exception 
//asi esta en la documentacion

// process.on('uncaughException', err => {
//   console.error(`There was an uncaught error:' ${err}`);
//   process.exit(1);
// })
