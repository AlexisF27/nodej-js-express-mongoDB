const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (request, response) => {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
  if (!foundUser) return response.sendStatus(403); //Forbidden

  jwt.verify(refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error || foundUser.username !== decoded.username) return response.sendStatus(403);
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          "userInfo": {
            "username": decoded.username,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );
      console.log(accessToken);
      response.json({ accessToken });
    }
  );
}

module.exports = { handleRefreshToken }