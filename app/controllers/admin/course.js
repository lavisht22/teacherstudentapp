const express = require('express');

const courseLib = require('../../../lib/admin/course');

const router = express.Router();

async function createNewCourse(req, res) {
  const courseObject = req.body;

  try {
    const newCourse = await courseLib.createNewCourse(courseObject);
    res.status(200).json(newCourse);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.post('/', createNewCourse);

module.exports = router;
