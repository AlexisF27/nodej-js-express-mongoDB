const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt');

const handleLogin = async (request, response) => {
  const { user, pwd } = request.body;
  if (!user || !pwd) return response.status(400).json({ 'message': 'Username and password are required' });
  const foundUser = userDB.users.find(person => person.username === user);
  if (!foundUser) return response.sendStatus(401); //Unauthorized
  //NOTE: evaluate password

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match ? response.json({ 'success': `User ${user} is looger in` }) : response.sendStatus(401));
}

module.exports = {handleLogin};