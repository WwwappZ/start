import {SET_PROFILE} from './actions';
export default function cats(state = {}, action = {}) {
  switch (action.type) {
    case SET_PROFILE:
      return action.results;
    default:
      return state;
  }
}
