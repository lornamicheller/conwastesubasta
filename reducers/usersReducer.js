import { GET_USERS } from "../actions/usersActions";

export default function users(state: Object[] = [], action: Object) {
  switch (action.type) {
    case GET_USERS:
      return Object.assign([], ...state, action.users);
    default:
      return state;
  }
}
