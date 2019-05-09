import axios from "axios";
import queryString from "query-string";

export const getRequestsList = (
  subscriberId: number,
  regionId: number,
  statusId: number,
  supervisorId: number
) => {
  let query = {};
  query.subscriberid = subscriberId;
  query.regionid = regionId;
  query.statusid = statusId;
  query.supervisorid = supervisorId;
  const stringified = queryString.stringify(query);
  return axios.get(API_URL + `/v1/requests?${stringified}`);
};
