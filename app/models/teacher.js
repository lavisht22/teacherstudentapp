/**
 * Teacher Schema
 */
const { Schema } = require('mongoose');

const teacherSchema = new Schema({
  auth0_id: { type: String, required: true, unique: true },
  name: { type: String, trim: true, required: true },
  code: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: false },
  department: { type: String, required: true },
  profile_picture: { type: String },
});

module.exports = teacherSchema;
