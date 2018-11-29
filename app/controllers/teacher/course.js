const express = require('express');

const courseLib = require('../../../lib/teacher/course');

const router = express.Router();

async function getAllCourses(req, res) {
  const user = req.user.profile;
  try {
    const courses = await courseLib.getAllCourses(user);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.get('/', getAllCourses);

module.exports = router;
