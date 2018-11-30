const mongoose = require('mongoose');
const { Relation, Course, Lecture } = require('../../app/models');
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

async function getCourseDetails(courseID, user) {
  try {
    let courseDetails = await Course.findOne({
      _id: courseID,
    });
    courseDetails = courseDetails.toObject();
    let relations = await Relation.find({ course_id: courseID, teacher_id: user._id });
    relations = relations.map(relation => mongoose.Types.ObjectId(relation._id));
    console.log(relations);
    const lectures = await Lecture.find({ relation_id: { $in: relations } });

    courseDetails.lectures = lectures;
    return courseDetails;
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to find courses',
      error_detail: error.toString(),
    };

    throw errorObject;
  }
}

async function createNewLecture(courseID, classID, lectureObject, user) {
  try {
    const relation = await Relation.findOne({
      class_id: classID,
      course_id: courseID,
      teacher_id: user._id,
    });

    lectureObject.relation_id = relation._id;
    let newLecture = new Lecture(lectureObject);
    newLecture = await newLecture.save();
    return newLecture;
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create lecture',
      error_detail: error.toString(),
    };

    throw errorObject;
  }
}

module.exports = {
  getAllCourses,
  getCourseDetails,
  createNewLecture,
};
