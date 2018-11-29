const express = require('express');

const studentRoutes = require('./student');
const teacherRoutes = require('./teacher');
const classRoutes = require('./class');

const router = express.Router();

router.use('/student', studentRoutes);
router.use('/teacher', teacherRoutes);
router.use('/class', classRoutes);

module.exports = router;
