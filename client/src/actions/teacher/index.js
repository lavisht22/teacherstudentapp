import { getData } from '../../utils/serviceUtil';

export const getAllCourses = () => {
  return {
    type: 'TEACHER_FETCH_COURSES',
    payload: getData('/teacher/course'),
  };
};

export const getCourseDetails = courseId => {
  return {
    type: 'TEACHER_FETCH_COURSE_DETAILS',
    payload: getData(`/teacher/course/${courseId}`),
  };
};
