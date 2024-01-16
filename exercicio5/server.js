const logEvents = require('./logEvents');
const http = require('http');
const path = require('path');
const fs = require ('fs');
const fsPromises = require ('fs').promises;
const EventEmmiter = require('events');

class Emmiter extends EventEmmiter {};


//initialize object
const myEmmiter = new Emmiter();


const PORT = process.env.PORT || 3500;

const server = http.createServer((request,response) => {
  console.log(request.url, request.method);
})

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)); 


// add listener for the log event

// myEmmiter.on('log', (msg) => logEvents(msg));

// setTimeout(() => {
//   //Emit event
//   myEmmiter.emit('log', 'Log event emmiter');
// },2000)