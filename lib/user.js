const { Student, Teacher } = require('../app/models');
const { ERROR_TYPES, USER } = require('../config/constants');

async function fetchUserProfile(auth0Id) {
  let student;

  try {
    student = await Student.findOne({ auth0_id: auth0Id });
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to fetch user profile',
      error_description: error,
    };

    throw errorObject;
  }

  if (student) {
    student = student.toObject();
    student.role = USER.ROLE.STUDENT;
    return student;
  }

  let teacher;

  try {
    teacher = await Teacher.findOne({ auth0_id: auth0Id });
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to fetch user profile',
      error_description: error,
    };

    throw errorObject;
  }

  if (teacher) {
    teacher = teacher.toObject();
    teacher.role = USER.ROLE.TEACHER;
    return teacher;
  }

  const errorObject = {
    error_type: ERROR_TYPES.INVALID_PAYLOAD,
    error_msg: 'Unable to locate this user',
    error_description: 'User Not Found',
  };

  throw errorObject;
}

module.exports = { fetchUserProfile };
