import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

export const login = (payload: LoginData) => {
  const config = {
    method: "POST",
    url: "http://localhost:8080/api/v1/auth/authenticate",
    data: payload,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
