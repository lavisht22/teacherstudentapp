const express = require('express');
const userLib = require('../../lib/user');

const router = express.Router();

async function fetchProfile(req, res) {
  try {
    const userProfile = await userLib.fetchUserProfile(req.user.sub);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.get('/profile', fetchProfile);

module.exports = router;
