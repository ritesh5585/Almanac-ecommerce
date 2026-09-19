export interface Admin {
  id: string;
  username: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}

export interface LoginRequest {
  email: string;
  password: string;
} 