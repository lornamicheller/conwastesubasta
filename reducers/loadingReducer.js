import { LOADING } from "../actions/loadingActions";

export default function setLoading(state: boolean = true, action: Object) {
  switch (action.type) {
    case LOADING:
      return action.loading;
    default:
      return state;
  }
}
