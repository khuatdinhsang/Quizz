import axios from "axios";
const root = process.env.REACT_APP_ROOT
const accessToken = localStorage.getItem("accessToken");
export const startQuiz = (id) => {
  return axios.put(`${root}/ext/v2/quizs/start-quiz?id=${id}`, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const submitQuiz = (data) => {
  return axios.put(`${root}/ext/v2/quizs/submit`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
