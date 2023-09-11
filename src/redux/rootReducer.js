// ** Reducers Imports
import navbar from "./navbar";
import layout from "./layout";
import auth from "./authentication";
import questions from './question'
import exams from "./exam";
const rootReducer = {
  auth,
  navbar,
  layout,
  questions,
  exams,
};

export default rootReducer;
