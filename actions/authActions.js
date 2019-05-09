import { checkAuth, currentUser } from "../api/auth";
export const AUTH = "AUTH";
export const CURRENT_USER = "CURRENT_USER";
/**
 * calls reducer to set a boolean if user is authenticated
 * @param {boolean} isAuthenticated
 * @return {{type: string, isAuthenticated: boolean}}
 */
export function authAction(isAuthenticated: boolean) {
  return {
    type: AUTH,
    isAuthenticated
  };
}
/**
 * calls the api request and dispatch authAction to set the callback (true/false)
 * @param {string} sessionToken - Session token pulled from cookie
 * @return {function(*)}
 */
export function authAsyncAction(sessionToken: string) {
  return async dispatch => {
    try {
      const isAuthenticated = await checkAuth(sessionToken);
      dispatch(authAction(isAuthenticated));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log("ERROR", err.message);
      }
      dispatch(authAction(false));
      console.log("ERROR: ", err.config);
    }
  };
}
/**
 * sets the current logged in user information
 * @param currentUser
 * @return {{type: string, currentUser: Object}}
 */
export function setCurrentUserAction(currentUser: Object) {
  return {
    type: CURRENT_USER,
    currentUser
  };
}
/**
 * calls the api currentUser method which gets the sessionToken from cookie.
 * @return {function(*)}
 */
export function setAsyncCurrentUserAction() {
  return async dispatch => {
    try {
      const user = await currentUser();
      return await dispatch(setCurrentUserAction(user.data[0]));
    } catch (err) {
      console.error("Error setAsyncCurrentUserAction: ", err);
    }
  };
}
