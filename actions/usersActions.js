import { getUsers, getSingleUser } from "../api/users";
export const GET_USERS = "GET_USERS";
export const GET_SINGLE_USER = "GET_SINGLE_USER";

function setUsersAction(users: Object[]) {
  return {
    type: GET_USERS,
    users
  };
}

function setSingleUserAction(user: Object) {
  return {
    type: GET_SINGLE_USER,
    user
  };
}

export function getAsyncUsersAction(
  subscriberId: number,
  regionId: ?number,
  roleId: ?number
) {
  return async dispatch => {
    try {
      const users = await getUsers(subscriberId, regionId, roleId);
      dispatch(setUsersAction(users.data));
    } catch (err) {
      if (err.response && err.response.data)
        console.error("Error getAsyncUsersAction: ", err.response.data);
      console.error(err.message);
      dispatch(setUsersAction([]));
    }
  };
}

export function getAsyncSingleUserAction(id: number) {
  return async dispatch => {
    try {
      const user = await getSingleUser(id);
      await dispatch(setSingleUserAction(user.data));
    } catch (err) {
      if (err.response && err.response.data)
        console.error("Error getAsyncSingleUserAction: ", err.response.data);
      await dispatch(setSingleUserAction({}));
    }
  };
}
