import { AUTH } from "../actions/authActions";
/**
 * sets the global state for isAuthenticated
 * @param {boolean} state
 * @param {object} action
 * @param {boolean} action.isAuthenticated
 * @param {string} action.type
 * @return {*}
 */
export default function isAuthenticated(
  state: boolean = false,
  action: Object
) {
  switch (action.type) {
    case AUTH:
      return action.isAuthenticated;
    default:
      return state;
  }
}
