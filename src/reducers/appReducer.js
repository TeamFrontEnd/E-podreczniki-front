import { CHANGE_POPUP_STATUS, LOG_IN, LOG_OUT } from '../actions/types';

const initialState = {
  popUpOpen: false,
  email: 'Zaloguj się/Zarejestruj',
  apiToken:
    '1dd05f0a1cfded8e972dfe53a5740c54af5c4d4944c97a8129b7f460053313942a75d3fe82cb00a06f8e50161a5c401bb62ded5049b03f5a978c1fce',
  logIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_POPUP_STATUS:
      return {
        ...state,
        popUpOpen: action.payload
      };
    case LOG_IN:
      return {
        ...state,
        email: action.payload.email,
        apiToken: action.payload.apiToken,
        popUpOpen: false,
        logIn: true
      };
    case LOG_OUT:
      return {
        ...state,
        email: 'Zaloguj się/Zarejestruj',
        logIn: false
      };
    default:
      return state;
  }
}
