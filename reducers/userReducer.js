import { GET_SINGLE_USER } from "../actions/usersActions";

export default function user(state: Object = {}, action: Object) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return Object.assign({}, ...state, action.user);
    default:
      return state;
  }
}
