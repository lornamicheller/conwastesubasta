import axios from "axios";

export const getRegions = (subscriberId: number) => {
  return axios.get(API_URL + "/v1/regions/" + subscriberId);
};
