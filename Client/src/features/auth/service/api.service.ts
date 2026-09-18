import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const api = {
  login: (email: string, password: string) =>
    axiosInstance.post("/auth/login", { email, password }),

  me: () => axiosInstance.get("/auth/me"),
};

export default api;
