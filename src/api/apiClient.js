// src/api/apiClient.js
import axios from "axios";
import { API_ENDPOINTS } from "@/shared/api.js";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // if you use cookies or auth headers
});

// Example usage functions:
export const AuthAPI = {
  register: (data) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data),
  login: (data) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data),
  getUser: () => apiClient.get(API_ENDPOINTS.AUTH.GET_USER),
  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),
};

export const CourseAPI = {
  getAll: () => apiClient.get(API_ENDPOINTS.COURSES.GET_ALL),
  getOne: (id) =>
    apiClient.get(API_ENDPOINTS.COURSES.GET_ONE.replace(":id", id)),
  create: (data) => apiClient.post(API_ENDPOINTS.COURSES.CREATE, data),
  update: (id, data) =>
    apiClient.put(API_ENDPOINTS.COURSES.UPDATE.replace(":id", id), data),
  delete: (id) =>
    apiClient.delete(API_ENDPOINTS.COURSES.DELETE.replace(":id", id)),
};

export default apiClient;
