const logEvents = require('./logEvents');

const EventEmmiter = require('events');

class MyEmmiter extends EventEmmiter {};


//initialize object
const myEmmiter = new MyEmmiter();

// add listener for the log event

myEmmiter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
  //Emit event
  myEmmiter.emit('log', 'Log event emmiter');
},2000)