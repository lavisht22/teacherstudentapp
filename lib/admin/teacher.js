/** lib/app/index.js
 * Contains all logic corresponding to app controller
 */

const auth0Helper = require('../../helpers/auth0');
const { Teacher } = require('../../app/models');
const { ERROR_TYPES, USER } = require('../../config/constants');

async function createNewTeacher(teacherObject) {
  // Validation for required fields.
  if (!teacherObject.email) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Email is required.',
    };

    throw errorObject;
  }

  if (!teacherObject.password) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Password is required.',
    };

    throw errorObject;
  }

  if (!teacherObject.name) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Name is required.',
    };

    throw errorObject;
  }

  if (!teacherObject.code) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Code is required.',
    };

    throw errorObject;
  }

  if (!teacherObject.department) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Department is required.',
    };

    throw errorObject;
  }

  let auth0UserData;
  let user;

  // Check if teacher already exists
  try {
    user = await Teacher.findOne({ code: teacherObject.code });
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create a new teacher',
      error_description: error,
    };

    throw errorObject;
  }

  if (user) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Unable to create a new teacher.',
      error_details: 'An account with this email already exists.',
    };

    throw errorObject;
  }

  // Create an account in Auth0

  try {
    auth0UserData = await auth0Helper.createNewUser(teacherObject, USER.ROLE.TEACHER);
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.SERVICE_ERROR,
      error_msg: 'Unable to create a new teacher.',
      error_details: error,
    };

    throw errorObject;
  }

  teacherObject.auth0_id = auth0UserData.user_id;

  let teacher = new Teacher(teacherObject);

  // Create an account in application database with linked auth0_id
  try {
    teacher = await teacher.save();
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create a new user.',
      error_details: error,
    };

    throw errorObject;
  }

  return teacher;
}

module.exports = {
  createNewTeacher,
};
