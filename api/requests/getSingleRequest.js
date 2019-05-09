import axios from "axios";

export default function getSingleRequest(id: number) {
  return axios.get(API_URL + `/v1/request?id=${id}`);
}
