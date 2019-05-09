import axios from "axios";

export default function getRequestSuppliers(requestId: number) {
  return axios.get(API_URL + `/v1/request/suppliers?requestid=${requestId}`);
}
