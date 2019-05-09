// @flow
import axios from 'axios';

const createRegion = (name: string, subscriberid: number): Object => {
  return axios.post(API_URL + '/v1/region', {name, subscriberid});
};

export default createRegion;