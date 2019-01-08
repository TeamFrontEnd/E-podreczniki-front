import { combineReducers } from "redux";

import appReducer from "./appReducer";
import lessonReducer from "./lessonReducer";
import sectionReducer from "./sectionReducer";

export default combineReducers({
  app: appReducer,
  lesson: lessonReducer,
  section: sectionReducer
});
