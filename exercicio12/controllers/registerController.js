const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (request, response) => {
  const { user, pwd } = request.body;
  if (!user || !pwd) return response.status(400).json({ 'message': 'Username and password are required' });
  //check for duplicate in the db
  const duplicate = userDB.users.find(person => person.username === user);
  if (duplicate) return response.sendStatus(409);
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUSer = { "username": user, "password": hashedPwd };
    userDB.setUsers([...userDB.users, newUSer]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    response.status(201).json({ 'success': `New user ${user} created` });
  } catch (error) {
    response.status(500).json({ 'message': error.message });
  }
}

module.exports = { handleNewUser };