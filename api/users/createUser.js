// @flow
import axios from "axios";

export default function createUser(
  name: string,
  lastname: string,
  email: string,
  password: ?string,
  companyname: ?string,
  companyphone: ?string,
  contactname: ?string,
  roleid: number,
  regionid: ?number,
  subscriberid: ?number
) {
  return axios.post(API_URL + "/v1/users", {
    name,
    lastname,
    email,
    password,
    companyname,
    companyphone,
    contactname,
    roleid,
    regionid,
    subscriberid
  });
}
