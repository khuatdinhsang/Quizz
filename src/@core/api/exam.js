import axios from "axios";
const root = process.env.REACT_APP_ROOT
const accessToken = localStorage.getItem("accessToken");
export const getListExamApi = (data) => {
  return axios.post(`${root}/ext/v2/quizs/sample/search`, data, {
    header: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};
export const getListTestApi = (data) => {
  return axios.post(`${root}/ext/v2/quizs/groups/search`, data, {
    header: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};
export const getListExamByUser = (data) => {
  return axios.put(`${root}/ext/v2/quizs/by-user`, data, {
    header: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};
export const getExamResultByUser = (quizId) => {
  return axios.get(`${root}/ext/v2/quizs?id=${quizId}`, {
    header: {
      authorization: `Bearer ${accessToken}`,
    },
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

export const createExamApi = (data) => {
  return axios.post(`${root}/ext/v2/quizs`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const createSampleExam = (data) => {
  return axios.post(`${root}/ext/v2/quizs/sample`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const putDeleteExam = (data) => {
  return axios.delete(
    `${root}/ext/v2/quizs`,
    { data: data },
    {
      authorization: `Bearer ${accessToken}`,
    }
  );
};
export const getDetailExam = (id) => {
  return axios.get(`${root}/ext/v2/quizs/sample?id=${id}`, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const putActiveSampleExam = (data) => {
  return axios.put(`${root}/ext/v2/quizs/sample/status`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const createTestSample = (data) => {
  return axios.post(`${root}/ext/v2/quizs/sample/clone`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
