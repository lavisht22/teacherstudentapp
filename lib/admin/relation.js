/** lib/app/index.js
 * Contains all logic corresponding to app controller
 */

const { Relation } = require('../../app/models');
const { ERROR_TYPES } = require('../../config/constants');

async function createNewRelation(relationObject) {
  // Validation for required fields.
  if (!relationObject.teacher_id) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Teacher ID is required.',
    };

    throw errorObject;
  }

  if (!relationObject.course_id) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Course ID is required.',
    };

    throw errorObject;
  }

  if (!relationObject.class_id) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Class ID is required.',
    };

    throw errorObject;
  }

  let cRelation = new Relation(relationObject);

  // Create an account in application database with linked auth0_id
  try {
    cRelation = await cRelation.save();
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create a new Relation.',
      error_details: error,
    };

    throw errorObject;
  }

  return cRelation;
}

module.exports = {
  createNewRelation,
};
