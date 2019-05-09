import {
  getRequestsList,
  updateRequestStatus,
  getSingleRequest,
  getSupplierRequests
} from "../api/requests";
export const REQUEST_LIST = "REQUEST_LIST";
export const SET_REQUEST = "SET_REQUEST";
/**
 * calls reducer
 * @param {object[]} requestsList
 * @return {{type: string, requestsList: object[]}}
 */
export function setRequestsListAction(requestsList: Object[]) {
  return {
    type: REQUEST_LIST,
    requestsList
  };
}
/**
 * calls the api request and dispatch setRequestsListAction to set the callback (requestsList array)
 * @param subscriberId
 * @param supervisorId
 * @param regionId
 * @param statusId
 * @return {function(*)}
 */
export function getAsyncRequestsListAction(
  subscriberId: ?number,
  regionId: ?number,
  statusId: ?number,
  supervisorId: ?number
) {
  return async dispatch => {
    try {
      const requestsList = await getRequestsList(
        subscriberId,
        regionId,
        statusId,
        supervisorId
      );
      dispatch(setRequestsListAction(requestsList.data));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log("ERROR", err.message);
      }
      console.log("ERROR: ", err.config);
      dispatch(setRequestsListAction([]));
    }
  };
}
/**
 * Updates the request status
 * @param requestId
 * @param statusId
 * @param decline_note
 * @param sessionToken
 * @param subscriberId
 * @return {function(*)}
 */
export function updateAsyncRequestStatus(
  requestId: number,
  statusId: number,
  decline_note: string,
  sessionToken: string,
  subscriberId: number
) {
  return async dispatch => {
    try {
      await updateRequestStatus(
        requestId,
        statusId,
        decline_note,
        sessionToken
      );
      await dispatch(getAsyncRequestsListAction(subscriberId));
    } catch (err) {
      if (err.response && err.response.data)
        console.error("Error updateAsyncRequestStatus: ", err.response.data);
      console.error(err.message);
      await dispatch(getAsyncRequestsListAction(subscriberId));
    }
  };
}

export function setSingleRequestAction(request: Object) {
  return {
    type: SET_REQUEST,
    request
  };
}

export function getAsyncSingleRequestAction(id: number) {
  return async dispatch => {
    try {
      const request = await getSingleRequest(id);
      await dispatch(setSingleRequestAction(request.data));
    } catch (err) {
      if (err.response && err.response.data)
        console.error("Error getAsyncSingleRequestAction: ", err.response.data);
      await dispatch(setSingleRequestAction({}));
    }
  };
}

export function getAsyncSupplierRequests(supplierid: number) {
  return async dispatch => {
    try {
      let requests;
      const { data } = requests = await getSupplierRequests(supplierid);
      await dispatch(setRequestsListAction(data));
    } catch (err) {
      if (err.response && err.response.data)
        console.error("Error getAsyncSupplierRequests: ", err.response.data);
      await dispatch(setRequestsListAction([]));
    }
  };
}
