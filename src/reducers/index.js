import { combineReducers } from "redux";

import appReducer from "./appReducer";
import sectionReducer from "./sectionReducer";
import userReducer from "./userReducer";

export default combineReducers({
  app: appReducer,
  user: userReducer,
  section: sectionReducer
});
