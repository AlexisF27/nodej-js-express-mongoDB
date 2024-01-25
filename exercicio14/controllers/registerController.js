const User = require('../model/User')

const bcrypt = require('bcrypt');

const handleNewUser = async (request, response) => {
  const { user, pwd } = request.body;
  if (!user || !pwd) return response.status(400).json({ 'message': 'Username and password are required' });
  //check for duplicate in the db
  const duplicate = await User.findOne({username : user}).exec(); 
  if (duplicate) return response.sendStatus(409);
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store the new user
    const result = await User.create({ "username": user, "password": hashedPwd });

    console.log(result);


    response.status(201).json({ 'success': `New user ${user} created` });
  } catch (error) {
    response.status(500).json({ 'message': error.message });
  }
}

module.exports = { handleNewUser };