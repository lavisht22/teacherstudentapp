/**
 * Lecture Schema
 */
const { Schema } = require('mongoose');

const lectureSchema = new Schema({
  relation_id: { type: Schema.Types.ObjectId, ref: 'Relation', required: true },
  topic: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true, default: Date.now() },
  attatchments: [Schema.Types.String],
});

module.exports = lectureSchema;
