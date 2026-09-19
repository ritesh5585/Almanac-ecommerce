import api from "../../api/axios";
import type {
  LoginPayload,
  LoginRequest,
  LoginResponse,
  Admin,
} from "./auth.types";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  // Translate UI shape → backend shape
  const body: LoginRequest = {
    email: payload.username,
    password: payload.password,
  };

  const res = await api.post<LoginResponse>("/auth/login", body);
  return res.data;
};

export const getProfile = async (): Promise<Admin> => {
  const res = await api.get<Admin>("/auth/me");
  return res.data;
};
