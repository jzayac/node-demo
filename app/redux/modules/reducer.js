import { combineReducers } from 'redux';

import auth from './auth';
import todo from './todo';
import user from './user';

export default combineReducers({
  auth,
  todo,
  user,
});
