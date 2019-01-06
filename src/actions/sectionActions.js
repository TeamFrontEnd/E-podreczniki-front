import axios from "axios";

import { GET_CATEGORIES } from "../actions/types";

//TODO: headers to fix
export const getCategories = () => async dispatch => {
  let confg = {
    headers: { "Content-Type": "application/json" }
  };
  const res = await axios.get(
    "http://127.0.0.1:8000/api/categories",
    {},
    confg
  );
  console.log(res);
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data.data
  });
};
