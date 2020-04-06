import {
    SET_GEBRUIKERS,
    ADD_GEBRUIKERS,
    GEBRUIKER_ERROR,
    SET_GEBRUIKER
  } from './actions';
  export default function cats(state = {
    item: [],
    items: []
  }, action = {}) {
    switch (action.type) {
      case ADD_GEBRUIKERS:
        return { ...state,
          items: [...state.itens, action.results]
        };
      case SET_GEBRUIKER:
        return { ...state,
          item: action.results
        };
      case GEBRUIKER_ERROR:
        return { ...state,
          error: action.payload
        };
      case SET_GEBRUIKERS:
        return { ...state,
          items: action.results
        };
      default:
        return state;
    }
  }
  