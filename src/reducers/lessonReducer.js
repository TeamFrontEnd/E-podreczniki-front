import { GET_LESSONS, GET_LESSON } from '../actions/types';

const initialState = {
  lessons: [],
  lesson: { title: 'Wybierz', text: 'lekcję' }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LESSONS:
      return {
        ...state,
        lessons: action.payload
      };
    case GET_LESSON:
      return {
        ...state,
        lesson: action.payload
      };
    default:
      return state;
  }
}
