import axios from "axios";

axios.defaults.baseURL = 'https://taskpilot-backend-6ee557f05c5b.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();