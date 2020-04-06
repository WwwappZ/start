import {
  SET_BEDRIJVEN,
  ADD_BEDRIJVEN,
  BEDRIJF_ERROR,
  SET_BEDRIJF
} from './actions';
export default function cats(state = {
  item: [],
  items: []
}, action = {}) {
  switch (action.type) {
    case ADD_BEDRIJVEN:
      return { ...state,
        items: [...state.itens, action.results]
      };
    case SET_BEDRIJF:
      return { ...state,
        item: action.results
      };
    case BEDRIJF_ERROR:
      return { ...state,
        error: action.payload
      };
    case SET_BEDRIJVEN:
      return { ...state,
        items: action.results
      };
    default:
      return state;
  }
}
