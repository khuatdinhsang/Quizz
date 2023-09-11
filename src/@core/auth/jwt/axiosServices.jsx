import axios from "axios";
import { useEffect } from "react";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

let xAccessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

let headerConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${xAccessToken}`,
  },
};

const headerConfigRefresh = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${refreshToken}`,
  },
};

const changeRequest = (token) => {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const setupInterceptors = (store) => {
  const { dispatch } = store;

  // request interceptor
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${xAccessToken}`;
    return config;
  });

  // response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error?.config;
      if (originalConfig.url !== "/ext/login" && error?.response) {
        if (error?.response?.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const res = await axios.get(API_GET_NEW_TOKEN, headerConfigRefresh);
            xAccessToken = res?.data?.data?.jwtToken;
            await changeRequest(res?.data?.data?.jwtToken);
            headerConfig = {
              ...headerConfig,
              headers: {
                ...headerConfig.headers,
                Authorization: `Bearer ${res?.data?.data?.jwtToken}`,
              },
            };
            await localStorage.setItem(
              "ACCESS_TOKEN",
              res?.data?.data?.jwtToken
            );
            return instance(originalConfig);
          } catch (_error) {
            console.error(error);
            setTimeout(() => {
              console.clear();
              localStorage.clear();
              window.location.reload();
            }, 5000);
          }
        } else if (error?.response?.status === 502) {
          console.clear();
        }
      }
      return Promise.reject(error);
    }
  );
};
export const axiosBodyToAPI = async (
  method,
  uri,
  body,
  json = true,
  isLogged = false
) => {
  try {
    let result;
    if (method === "GET") {
      result = await axios.get(uri, headerConfig);
    } else if (method === "POST") {
      result = await axios.post(uri, body, headerConfig);
    } else if (method === "PUT") {
      result = await axios.put(uri, body, headerConfig);
    } else if (method === "DELETE") {
      const config = {
        ...headerConfig,
        data: body,
      };
      result = await axios.delete(uri, config);
    } else {
      result = await axios.post(uri, body, headerConfig);
    }
    if (result?.data?.result?.RESULT === "ERROR") {
      console.log(result?.data?.result, "result?.data?.result");
    }
    return result;
  } catch (error) {
    return error;
  }
};

export const axiosFormDataBodyToAPI = async (
  method,
  uri,
  body,
  json = true,
  isLogged = false
) => {
  try {
    const headerConfig = {
      headers: {
        Authorization: `Bearer ${xAccessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    let result;
    if (method === "GET") {
      result = await axios.get(uri, headerConfig);
    } else if (method === "POST") {
      result = await axios.post(uri, body, headerConfig);
    } else if (method === "PUT") {
      result = await axios.put(uri, body, headerConfig);
    } else if (method === "DELETE") {
      const config = {
        ...headerConfig,
        data: body,
      };
      result = await axios.delete(uri, config);
    } else {
      result = await axios.post(uri, body, headerConfig);
    }
    if (result?.data?.result?.RESULT === "ERROR") {
      console.log(result?.data?.result, "result?.data?.result");
    }
    return result;
  } catch (error) {
    return error;
  }
};
