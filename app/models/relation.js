/**
 * Relation Schema
 */
const { Schema } = require('mongoose');

const relationSchema = new Schema({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  class_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
});

module.exports = relationSchema;
