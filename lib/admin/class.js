/** lib/app/index.js
 * Contains all logic corresponding to app controller
 */

const auth0Helper = require('../../helpers/auth0');
const { Class } = require('../../app/models');
const { ERROR_TYPES, USER } = require('../../config/constants');

async function createNewClass(classObject) {
  // Validation for required fields.
  if (!classObject.name) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Email is required.',
    };

    throw errorObject;
  }

  if (!classObject.branch) {
    const errorObject = {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Password is required.',
    };

    throw errorObject;
  }

  let cClass = new Class(classObject);

  // Create an account in application database with linked auth0_id
  try {
    cClass = await cClass.save();
  } catch (error) {
    const errorObject = {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create a new Class.',
      error_details: error,
    };

    throw errorObject;
  }

  return cClass;
}

module.exports = {
  createNewClass,
};
