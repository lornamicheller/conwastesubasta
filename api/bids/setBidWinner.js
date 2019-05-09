// @flow
import axios from "axios";
import cookie from "react-cookie";

export default function setBidWinner(
  requestid: number,
  bidid: number,
  note: string
) {
  const sessionToken = cookie.load("sessionToken");
  return axios.post(API_URL + `/v1/set-bid-winner`, {
    requestid,
    bidid,
    sessionToken,
    note
  });
}
