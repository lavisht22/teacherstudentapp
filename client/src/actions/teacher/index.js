import { getData } from '../../utils/serviceUtil';

export const getAllCourses = () => {
  return {
    type: 'TEACHER_FETCH_COURSES',
    payload: getData('/teacher/course'),
  };
};
