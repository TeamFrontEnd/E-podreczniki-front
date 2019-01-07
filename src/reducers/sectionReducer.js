import { GET_CATEGORIES, SET_TEXTBOOK_SLUG } from "../actions/types";

const initialState = {
  categories: [],
  textbookSlug: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case SET_TEXTBOOK_SLUG:
      return {
        ...state,
        textbookSlug: action.payload
      }
    default:
      return state;
  }
}
