import axios from "axios";
import cookie from "react-cookie";

export default function updateUser(user: Object) {
  const sessionToken = cookie.load("sessionToken", { path: "/" });
  return axios.patch(API_URL + `/v1/user`, { user, sessionToken });
}
