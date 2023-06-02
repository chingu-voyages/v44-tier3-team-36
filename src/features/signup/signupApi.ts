import axios from "axios";

export interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const signup = (payload: SignupData) => {
  const config = {
    method: "POST",
    url: "http://localhost:8080/api/v1/auth/register",
    data: payload,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
