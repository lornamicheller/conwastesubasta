import axios from "axios";

export default function getSingleUser(id: number) {
  return axios.get(API_URL + `/v1/user/${id}`);
}
