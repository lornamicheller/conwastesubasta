// @flow
import axios from 'axios';

const createProject = (name: string, regionid: number): Object => {
  return axios.post(API_URL + '/v1/project', {name, regionid});
};

export default createProject;