const intialState = {
  courses: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case 'TEACHER_FETCH_COURSES_FULFILLED':
      return {
        ...state,
        courses: action.payload.data,
      };

    default:
      return state;
  }
};
