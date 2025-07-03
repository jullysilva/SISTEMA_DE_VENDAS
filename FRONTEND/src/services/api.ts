import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" },
});
