import { getRegions } from "../api/regions";
export const GET_REGIONS = "GET_REGIONS";

export function getRegionsAction(regions: Object[]) {
  return {
    type: GET_REGIONS,
    regions
  };
}

export function getAsyncRegionsAction(subscriberId: number) {
  return async dispatch => {
    try {
      const regionsResponse = await getRegions(subscriberId);
      const regions = regionsResponse.data;
      dispatch(getRegionsAction(regions));
    } catch (err) {
      if (err.response && err.response.data)
        console.error("Error: ", err.response.data);
      console.error(err.message);
      dispatch(getRegionsAction([]));
    }
  };
}
