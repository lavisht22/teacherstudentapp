/**
 * Comment Schema
 */
const { Schema } = require('mongoose');

const commentSchema = new Schema({
  lecture_id: { type: Schema.Types.ObjectId, ref: 'Lecture', required: true },
  comment_id: { type: Schema.Types.ObjectId, ref: 'Comment' },
  student_id: { type: Schema.Types.ObjectId, ref: 'Student' },
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  topic: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  attatchments: [Schema.Types.String],
});

module.exports = commentSchema;
