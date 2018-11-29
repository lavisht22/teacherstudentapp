const express = require('express');

const studentRoutes = require('./student');
const classRoutes = require('./class');

const router = express.Router();

router.use('/student', studentRoutes);
router.use('/class', classRoutes);

module.exports = router;
