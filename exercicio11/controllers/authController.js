const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const fsPromises = require('fs').promises;

const handleLogin = async (request, response) => {
  const { user, pwd } = request.body;
  if (!user || !pwd) return response.status(400).json({ 'message': 'Username and password are required' });
  const foundUser = userDB.users.find(person => person.username === user);
  if (!foundUser) return response.sendStatus(401); //Unauthorized
  //NOTE: evaluate password

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //create JWTs
    const accessToken = jwt.sign(
      { "username": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    //NOTE: Saving refreshToken with current user 
    const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
    const currentUser = { ...foundUser, refreshToken }
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    )
    response.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
    response.json({ accessToken });
  } else {
    response.sendStatus(401)
  }
}

module.exports = { handleLogin };