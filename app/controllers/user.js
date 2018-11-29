const express = require('express');

const router = express.Router();

function fetchProfile(req, res) {
  res.json(req.user);
}

router.get('/profile', fetchProfile);

module.exports = router;
