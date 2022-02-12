const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
require('dotenv').config();


router.get('/me', async (req, res) => {
  const auth = req?.cookies?.auth;

  if (!auth) {
    return res.send({ username: null })
  }

  try {
    const parsedAuth = JSON.parse(auth)
    const username = jwt.verify(parsedAuth.username, process.env.JWT_SECRET);

    const user = await User.findOne({ username }).populate({
      path: 'vinylRatings',
      populate: {
        path: 'user',
      },
    });

    // if (!user) {
    //   res.cookie("auth", { expires: Date.now() });
    //   return res.send({ username: null });
    // }
    return res.status(200).send(user);

  } catch (error) {
    const errorMessage = `Failed to find user: ${error}`;
    await res.cookie("auth", { expires: Date.now() });
    return res.status(401).send(errorMessage);
  }
});

module.exports = router;