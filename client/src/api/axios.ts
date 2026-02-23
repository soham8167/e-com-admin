import axios from "axios";

export const api = axios.create({
  baseURL: "https://e-com-admin-3.onrender.com/api",
});