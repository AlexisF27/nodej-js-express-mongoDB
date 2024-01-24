const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (request, response) => {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.status(401);

  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
  console.log(foundUser);

  if (!foundUser) return response.sendStatus(403); //Forbidden

  jwt.verify(refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error || foundUser.username !== decoded.username) return response.sendStatus(403);
      const accessToken = jwt.sign(
        { "username": decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );
      response.json({ accessToken });
    }
  );
}

module.exports = { handleRefreshToken }