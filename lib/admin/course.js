/** lib/app/index.js
 * Contains all logic corresponding to app controller
 */

const { Course } = require('../../app/models');
const { ERROR_TYPES } = require('../../config/constants');

async function createNewCourse(courseObject) {
  // Validation for required fields.
  if (!courseObject.name) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Email is required.',
    };

    throw errorObject;
  }

  if (!courseObject.code) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Password is required.',
    };

    throw errorObject;
  }

  if (!courseObject.department) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Department is required.',
    };

    throw errorObject;
  }

  let cCourse = new Course(courseObject);

  // Create an account in application database with linked auth0_id
  try {
    cCourse = await cCourse.save();
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create a new Course.',
      error_details: error,
    };

    throw errorObject;
  }

  return cCourse;
}

module.exports = {
  createNewCourse,
};
