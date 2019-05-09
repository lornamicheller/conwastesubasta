import axios from "axios";
import cookie from "react-cookie";

export default function updateBid(bid: { id: number, bidamount: number }) {
  const sessionToken = cookie.load("sessionToken", { path: "/" });
  return axios.patch(API_URL + `/v1/bid`, { bid, sessionToken });
}
