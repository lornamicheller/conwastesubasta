// @flow
import axios from "axios";
import queryString from "query-string";

export default function getUsers(
  subscriberId: number,
  regionId: ?number,
  roleId: ?number
): Object {
  let query = {};
  if (regionId) query.regionid = regionId;
  query.roleid = roleId;
  const stringified = queryString.stringify(query);
  return axios.get(API_URL + `/v1/users/${subscriberId}?${stringified}`);
}
