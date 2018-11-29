const express = require('express');

const studentRoutes = require('./student');
const teacherRoutes = require('./teacher');
const classRoutes = require('./class');
const courseRoutes = require('./course');

const router = express.Router();

router.use('/student', studentRoutes);
router.use('/teacher', teacherRoutes);
router.use('/class', classRoutes);
router.use('/course', courseRoutes);

module.exports = router;
