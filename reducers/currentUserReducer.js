import { CURRENT_USER } from "../actions/authActions";

export default function currentUser(state: Object = {}, action: Object) {
  switch (action.type) {
    case CURRENT_USER:
      return Object.assign({}, ...state, action.currentUser);
    default:
      return state;
  }
}
