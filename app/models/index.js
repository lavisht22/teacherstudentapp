const mongoose = require('mongoose');

const studentSchema = require('./student');
const teacherSchema = require('./teacher');
const classSchema = require('./class');
const relationSchema = require('./relation');
const lectureSchema = require('./lecture');
const commentSchema = require('./comment');
const courseSchema = require('./course');

module.exports = {
  Student: mongoose.model('Student', studentSchema),
  Teacher: mongoose.model('Teacher', teacherSchema),
  Class: mongoose.model('Class', classSchema),
  Relation: mongoose.model('Relation', relationSchema),
  Lecture: mongoose.model('Lecture', lectureSchema),
  Comment: mongoose.model('Comment', commentSchema),
  Course: mongoose.model('Course', courseSchema),
};
