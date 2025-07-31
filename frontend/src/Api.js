import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // Use full Render URL in prod
});

export default API;