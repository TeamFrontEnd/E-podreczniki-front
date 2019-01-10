import axios from "axios";

import { CHANGE_POPUP_STATUS, LOG_IN, LOG_OUT } from "./types";

export const changePopupStatus = value => dispatch => {
  dispatch({
    type: CHANGE_POPUP_STATUS,
    payload: value
  });
};

export const logIn = params => async dispatch => {
  let confg = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
  const res = await axios.post("http://127.0.0.1:8000/login", params, confg);
  console.log(res);
  if (res.data.message === "error") alert("Złe dane");
  else
    dispatch({
      type: LOG_IN,
      payload: res.data
    });
};

export const registerUser = user => async dispatch => {
  let confg = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
  const res = await axios.post("http://127.0.0.1:8000/register", user, confg);
  console.log(res);
  dispatch({
    type: LOG_IN,
    payload: res.data
  });
};

export const logOut = () => dispatch => {
  dispatch({
    type: LOG_OUT
  });
};
