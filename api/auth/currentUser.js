import axios from "axios";
import cookie from "react-cookie";

export const currentUser = () => {
  const sessionToken = cookie.load("sessionToken");
  return axios.get(`${API_URL}/v1/current-user/${sessionToken}`);
};
