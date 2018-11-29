/**
 * Class Schema
 */
const { Schema } = require('mongoose');

const classSchema = new Schema({
  name: { type: String, required: true, unique: true },
  repersentative_id: { type: Schema.Types.ObjectId, ref: 'Student' },
  branch: { type: String, required: true },
});

module.exports = classSchema;
