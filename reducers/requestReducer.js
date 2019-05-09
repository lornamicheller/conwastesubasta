import { SET_REQUEST } from "../actions/requestsActions";

export default function request(state: Object = {}, action: Object) {
  switch (action.type) {
    case SET_REQUEST:
      return Object.assign({}, ...state, action.request);
    default:
      return state;
  }
}
