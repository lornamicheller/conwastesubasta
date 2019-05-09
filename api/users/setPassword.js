import axios from "axios";
import cookie from "react-cookie";

export default function setPassword(password: string, userid: number) {
  const sessionToken = cookie.load("sessionToken", { path: "/" });
  return axios.post(API_URL + `/v1/set-password`, {
    password,
    userid,
    sessionToken
  });
}
