const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')
require('dotenv').config();


router.post('/login', async (req, res, next) => {
  const { userName, email, password } = req.body;

  const user = await User.findOne({ user_name: userName })

  if (user) {
    res.send(user);
    return;
  }
  saveUser({ userName, password, email });
})


const saveUser = async ({ userName, password, email }) => {
  const user = await User.create({ user_name: userName, password, email });
  console.log("Saving the user");
  return user;
}

module.exports = router;