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

async function getCourseDetails(req, res) {
  const user = req.user.profile;
  const courseID = req.params.id;
  try {
    const courses = await courseLib.getCourseDetails(courseID, user);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function createNewLecture(req, res) {
  const user = req.user.profile;
  const courseID = req.params.id;
  const classID = req.body.class_id;
  const lectureObject = req.body;

  try {
    const course = await courseLib.createNewLecture(courseID, classID, lectureObject, user);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.get('/', getAllCourses);
router.get('/:id', getCourseDetails);
router.post('/:id', createNewLecture);

module.exports = router;
