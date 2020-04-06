import {SET_PUSH} from './actions';
export default function cats(state = [], action = {}) {
  switch (action.type) {
    case SET_PUSH:
      return action.results;
    default:
      return state;
  }
}
