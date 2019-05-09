import { REQUEST_LIST } from "../actions/requestsActions";

export default function getRequestsList(state: Object[] = [], action: Object) {
  switch (action.type) {
    case REQUEST_LIST:
      return Object.assign([], ...state, action.requestsList);
    default:
      return state;
  }
}
