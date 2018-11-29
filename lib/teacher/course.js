const mongoose = require('mongoose');
const { Relation, Course } = require('../../app/models');
const { ERROR_TYPES } = require('../../config/constants');

async function getAllCourses(user) {
  let courses;
  let relations;

  try {
    relations = await Relation.find({ teacher_id: user._id });
    relations = relations.map(relation => mongoose.Types.ObjectId(relation.course_id));

    courses = await Course.find({ _id: { $in: relations } });
    return courses;
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to find courses',
      error_detail: error.toString(),
    };

    throw errorObject;
  }
}

module.exports = {
  getAllCourses,
};
