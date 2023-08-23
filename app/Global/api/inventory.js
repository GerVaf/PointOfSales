// api.js
import axios from "axios";

const token = "20|Kv3kaZkAOaIseAf5FafnYRuaB09hqL7jDFCRxGkN";
const baseUrl = "https://c.mmsdev.site/api/v1/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const get = (url) => {
  return axiosInstance.get(url);
};

export const post = (url, data) => {
  return axiosInstance.post(url, data);
};

export const put = (url, data = {}) => {
  return axiosInstance.put(url, { data });
};

export const del = (url) => {
  return axiosInstance.delete(url);
};
