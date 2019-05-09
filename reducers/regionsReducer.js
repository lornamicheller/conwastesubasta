import { GET_REGIONS } from "../actions/regionsActions";

export default function regions(state: Object[] = [], action: Object) {
  switch (action.type) {
    case GET_REGIONS:
      return Object.assign([], ...state, action.regions);
    default:
      return state;
  }
}
