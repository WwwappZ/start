import {
  SET_LOGBOEKEN,
  ADD_LOGBOEKEN,
  LOGBOEK_ERROR,
  SET_LOGBOEK
} from './actions';
export default function cats(state = {
  item: [],
  items: []
}, action = {}) {
  switch (action.type) {
    case ADD_LOGBOEKEN:
      return { ...state,
        items: [...state.itens, action.results]
      };
    case SET_LOGBOEK:
      return { ...state,
        item: action.results
      };
    case LOGBOEK_ERROR:
      return { ...state,
        error: action.payload
      };
    case SET_LOGBOEKEN:
      return { ...state,
        items: action.results
      };
    default:
      return state;
  }
}
