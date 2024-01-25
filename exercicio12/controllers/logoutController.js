const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');


const handleLogout = async (request, response) => {
  //NOTE: for the frontend, on client, also delte the accessToken

  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);//No content to send back

  const refreshToken = cookies.jwt;
  
    //Is refreshToken in db?
  const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);

  if (!foundUser) {
    response.clearCookie('jwt', {httpOnly:true, maxAge: 24*60*60*1000})
    return response.sendStatus(204);
  }; //Forbidden

  //Delete the refreshToken in DB
  const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
  const currentUser = {...foundUser, refreshToken: ''};
  userDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(userDB.users)
  );

  response.clearCookie('jwt', {httpOnly:true, maxAge: 24*60*60*1000})
  response.sendStatus(204);
}

module.exports = { handleLogout }