import axios from "axios";

export const login = (email: string, password: string) => {
  console.log();
  return axios.post(`${API_URL}/v1/login`, { email, password });
};
