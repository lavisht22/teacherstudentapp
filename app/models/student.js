/**
 * User Schema
 */
const { Schema } = require('mongoose');

const studentSchema = new Schema({
  auth0_id: { type: String, required: true, unique: true },
  name: { type: String, trim: true, required: true },
  roll_number: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: false },
  enrollment_year: { type: Number, required: true },
  profile_picture: { type: String },
  class_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
});

module.exports = studentSchema;
