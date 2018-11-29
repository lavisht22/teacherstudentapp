const express = require('express');

const studentLib = require('../../../lib/admin/student');

const router = express.Router();

async function createNewStudent(req, res) {
  const studentObject = {
    name: req.body.name,
    roll_number: req.body.roll_number,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    enrollment_year: req.body.enrollment_year,
    profile_picture: req.body.profile_picture,
    class_id: req.body.class_id,
  };

  try {
    const newStudent = await studentLib.createNewStudent(studentObject);
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.post('/', createNewStudent);

module.exports = router;
