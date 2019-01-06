import { GET_LESSONS, GET_LESSON } from "./types";
import axios from "axios";

export const getLessons = token => async dispatch => {
  let confg = {
    headers: {
      Authorization: "bearer " + token
    }
  };
  const res = await axios.post("http://127.0.0.1:8000/lessons", {}, confg);
  console.log(res);
  dispatch({
    type: GET_LESSONS,
    payload: res.data.data
  });
};

export const getLesson = (token, id) => async dispatch => {
  let confg = {
    headers: {
      Authorization: "bearer " + token
    }
  };
  const res = await axios.post(
    "http://127.0.0.1:8000/lesson/" + id,
    { id: id },
    confg
  );
  console.log(res);
  dispatch({
    type: GET_LESSON,
    payload: res.data.data
  });
};
