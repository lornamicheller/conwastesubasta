import axios from "axios";
import cookie from "react-cookie";

export default function createBid(supplierid: number, requestid: number) {
  const bid = {
    supplierid,
    requestid
  };
  const sessionToken = cookie.load("sessionToken", { path: "/" });
  return axios.post(API_URL + `/v1/bid`, { bid, sessionToken });
}
