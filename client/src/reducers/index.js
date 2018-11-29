import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sampleReducer from './sample';
import userReducer from './user';
import teaherReducer from './teacher';

export default combineReducers({
  routing: routerReducer,
  sample: sampleReducer,
  user: userReducer,
  teacher: teaherReducer,
});
