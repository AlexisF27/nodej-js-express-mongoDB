const {logEvents} = require('./logEvents');

const errorHandler = (error, request, response, next) => {
  logEvents(`${error.name}: ${error.message}`, 'errLog.txt')
  response.status(500).send(error.message);
}

module.exports = errorHandler;