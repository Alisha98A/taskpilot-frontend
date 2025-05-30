import axios from "axios";

const BASE_URL = 'https://taskpilot-backend-6ee557f05c5b.herokuapp.com/api/';

export const axiosReq = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosRes = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});