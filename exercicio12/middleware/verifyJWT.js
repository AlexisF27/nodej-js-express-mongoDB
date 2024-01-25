const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const fsPromises = require('fs').promises;

const verifyJWT = (request, response, next) => {
  const authHeader = request.headers['authorization'];
  if(!authHeader) return response.sendStatus(401);
  console.log(authHeader); //Bearer token
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error, decoded) => {
      if (error) return response.sendStatus(403); //Invalid token
      request.user = decoded.username;
      next();
    }
  )
}

module.exports = verifyJWT;