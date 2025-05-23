import axios from "axios";

const baseURL = "https://taskpilot-backend-6ee557f05c5b.herokuapp.com/";

const defaultConfig = {
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

export const axiosReq = axios.create(defaultConfig);
export const axiosRes = axios.create(defaultConfig);