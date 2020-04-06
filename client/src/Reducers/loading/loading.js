import {
  SET_LOADING,

} from './actions';
export default function cats(state = {
  message: {
    actief: false
  }
}, action = {}) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state,
        message: action.results
      };
    default:
      return state;
  }
}
