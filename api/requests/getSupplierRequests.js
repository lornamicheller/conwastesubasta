import axios from "axios";
import cookie from "react-cookie";

export default function getSupplierRequests(supplierid: number) {
  const sessionToken = cookie.load("sessionToken");
  return axios.get(API_URL + `/v1/supplier-requests?supplierid=${supplierid}`);
}
