/** lib/app/index.js
 * Contains all logic corresponding to app controller
 */

const auth0Helper = require('../../helpers/auth0');
const { Student } = require('../../app/models');
const { ERROR_TYPES, USER } = require('../../config/constants');

async function createNewStudent(studentObject) {
  // Validation for required fields.
  if (!studentObject.email) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Email is required.',
    };

    throw errorObject;
  }

  if (!studentObject.password) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Password is required.',
    };

    throw errorObject;
  }

  if (!studentObject.name) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Name is required.',
    };

    throw errorObject;
  }

  if (!studentObject.roll_number) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Roll Number is required.',
    };

    throw errorObject;
  }

  if (!studentObject.phone) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Phone Number is required.',
    };

    throw errorObject;
  }

  if (!studentObject.enrollment_year) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Enrollment Year is required.',
    };

    throw errorObject;
  }

  if (!studentObject.class_id) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Class ID is required.',
    };

    throw errorObject;
  }

  let auth0UserData;
  let user;

  // Check if student already exists
  try {
    user = await Student.findOne({ roll_number: studentObject.roll_number });
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create a new student',
      error_description: error,
    };

    throw errorObject;
  }

  if (user) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Unable to create a new student.',
      error_details: 'An account with this email already exists.',
    };

    throw errorObject;
  }

  // Create an account in Auth0

  try {
    auth0UserData = await auth0Helper.createNewUser(studentObject, USER.ROLE.STUDENT);
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.SERVICE_ERROR,
      error_msg: 'Unable to create a new student.',
      error_details: error,
    };

    throw errorObject;
  }

  studentObject.auth0_id = auth0UserData.user_id;

  let student = new Student(studentObject);

  // Create an account in application database with linked auth0_id
  try {
    student = await student.save();
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create a new user.',
      error_details: error,
    };

    throw errorObject;
  }

  return student;
}

module.exports = {
  createNewStudent,
};
