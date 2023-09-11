import axios from "axios";

const root = process.env.REACT_APP_ROOT_ACCOUNT
export const login = (data) => {
  return axios.post(`${root}/ext/login`, data);
};
