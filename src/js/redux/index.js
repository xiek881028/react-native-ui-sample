import {combineReducers} from 'redux';
import demo from './demo.js';
import state from './state.js';

export default combineReducers({
  ...demo,
  ...state,
});
