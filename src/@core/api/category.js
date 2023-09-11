import axios from "axios";
const root = process.env.REACT_APP_ROOT
const accessToken = localStorage.getItem("accessToken");
export const inActiveCategory = (data) => {
  console.log("data", data);
  return axios.put(`${root}/ext/v2/categories/inactive`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
export const activeCategory = (data) => {
  return axios.put(`${root}/ext/v2/categories/active`, data, {
    authorization: `Bearer ${accessToken}`,
  });
};
