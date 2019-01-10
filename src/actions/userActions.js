import {
  ADD_CHAPTER,
  REMOVE_CHAPTER,
  REMOVE_LESSON,
  ADD_LESSON,
  ADD_TEXTBOOK
} from "./types";
import uuid from "uuid";
import axios from "axios";

export const addChapter = chapter => dispatch => {
  dispatch({
    type: ADD_CHAPTER,
    payload: {
      ...chapter,
      uuid: uuid(),
      lessons: chapter.lessons.map(lesson => ({
        ...lesson,
        uuid: uuid()
      }))
    }
  });
};

export const removeChapter = chapterUuid => dispatch => {
  dispatch({
    type: REMOVE_CHAPTER,
    payload: chapterUuid
  });
};

export const removeLesson = lessonUuid => dispatch => {
  dispatch({
    type: REMOVE_LESSON,
    payload: lessonUuid
  });
};

export const addLesson = lesson => dispatch => {
  dispatch({
    type: ADD_LESSON,
    payload: {
      ...lesson,
      uuid: uuid()
    }
  });
};

export const addTextbook = data => async dispatch => {
  let confg = {
    headers: { "Content-Type": "application/json" }
  };
  const res = await axios.post(
    "http://127.0.0.1:8000/api/add/textbook",
    data,
    confg
  );
  console.log(res);
  dispatch({
    type: ADD_TEXTBOOK,
    payload: res.data.wasAdded
  });
};

// export const getLessons = token => async dispatch => {
//   let confg = {
//     headers: {
//       Authorization: "bearer " + token
//     }
//   };
//   const res = await axios.post("http://127.0.0.1:8000/lessons", {}, confg);
//   console.log(res);
//   dispatch({
//     type: GET_LESSONS,
//     payload: res.data.data
//   });
// };

// export const getLesson = (token, id) => async dispatch => {
//   let confg = {
//     headers: {
//       Authorization: "bearer " + token
//     }
//   };
//   const res = await axios.post(
//     "http://127.0.0.1:8000/lesson/" + id,
//     { id: id },
//     confg
//   );
//   console.log(res);
//   dispatch({
//     type: GET_LESSON,
//     payload: res.data.data
//   });
// };
