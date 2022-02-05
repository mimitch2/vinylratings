const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
require('dotenv').config();


router.get('/me', async (req, res) => {
  const auth = req?.cookies?.auth;

  if (!auth) {
    return res.code(404).send({ username: null })
  }

  const parsedAuth = JSON.parse(auth)
  const username = jwt.verify(parsedAuth.username, process.env.JWT_SECRET);

  const user = await User.findOne({ username }).populate({
    path: 'vinyl_ratings',
    populate: {
      path: 'user',
    },
  });

  res.send(user)
});

module.exports = router;