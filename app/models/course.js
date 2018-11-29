/**
 * Course Schema
 */
const { Schema } = require('mongoose');

const courseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  department: { type: String, required: true },
});

module.exports = courseSchema;
