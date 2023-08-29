import axios from "axios";

const BASE_URL = "";

const apiInstance = axios.create({
  baseURL: BASE_URL,
});

apiInstance.interceptors.request.use((config) => {
  console.log("API Request", config);
  return config;
});

apiInstance.interceptors.response.use(
  (response) => {
    console.log("API Response", response);
    return response;
  },
  (error) => {
    console.error("API Error", error);
    return Promise.reject(error);
  }
);

export const get = (url, config = {}) => {
  return apiInstance.get(url, config);
};

export const post = (url, data, config = {}) => {
  return apiInstance.post(url, data, config);
};

export const put = (url, data, config = {}) => {
  return apiInstance.put(url, data, config);
};

export const del = (url, config = {}) => {
  return apiInstance.delete(url, config);
};
