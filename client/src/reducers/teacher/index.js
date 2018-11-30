const intialState = {
  courses: [],
  course_details: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case 'TEACHER_FETCH_COURSES_FULFILLED':
      return {
        ...state,
        courses: action.payload.data,
      };

    case 'TEACHER_FETCH_COURSE_DETAILS_FULFILLED':
      return {
        ...state,
        course_details: action.payload.data,
      };

    default:
      return state;
  }
};
