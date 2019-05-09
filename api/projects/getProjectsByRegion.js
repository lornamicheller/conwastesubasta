import axios from "axios";

export const getProjectsByRegion = (regionid: number) => {
  return axios.get(API_URL + `/v1/projects/${regionid}`);
};
