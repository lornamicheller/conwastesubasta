import axios from "axios";

export default function getSingleBid(bidid: number) {
  return axios.get(API_URL + `/v1/bid/${bidid}`);
}
