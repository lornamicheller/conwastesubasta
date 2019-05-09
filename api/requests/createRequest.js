import axios from "axios";

export const createRequest = (requisition: Object) => {
  return axios.post(API_URL + "/v1/requests", requisition);
};
