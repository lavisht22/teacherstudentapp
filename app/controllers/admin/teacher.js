const express = require('express');

const teacherLib = require('../../../lib/admin/teacher');

const router = express.Router();

async function createNewTeacher(req, res) {
  const teacherObject = req.body;

  try {
    const newTeacher = await teacherLib.createNewTeacher(teacherObject);
    res.status(200).json(newTeacher);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.post('/', createNewTeacher);

module.exports = router;
