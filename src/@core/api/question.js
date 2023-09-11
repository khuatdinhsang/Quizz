import axios from "axios";
import { instance } from "../auth/jwt/axiosServices";
const root = process.env.REACT_APP_ROOT

const accessToken = localStorage.getItem("accessToken");
export const getListQuestionApi = (data) => {
  return axios.put(`${root}/ext/v2/questions/search`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const getListCategoryApi = () => {
  return axios.get(`${root}/ext/v2/categories`, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const createCategoryApi = (data) => {
  return axios.post(`${root}/ext/v2/categories`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const putEditCategory = (data) => {
  console.log("data", data);
  return axios.put(`${root}/ext/v2/categories`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const getListQuestionTypeApi = () => {
  return axios.get(`${root}/quiz/getAllQuestionType`, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const createQuestionApi = (data) => {
  return axios.post(`${root}/ext/v2/questions/texts`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const putActiveQuestion = (data) => {
  return axios.put(`${root}/ext/v2/questions/status`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const putUpdateQuestion = (data) => {
  return axios.put(`${root}/ext/v2/questions/texts`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const getQuestionById = (data) => {
  return axios.get(`${root}/ext/v2/questions/texts?id=${data}`, {
    authorization: `Bearer ${accessToken}`,
  });
};
