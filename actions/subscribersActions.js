import axios from 'axios';
export const SET_SUBSCRIBERS = 'SET_SUBSCRIBERS';

export function setSubscribers(subscribers: Array<Object>): Object {
  return {
    type: SET_SUBSCRIBERS,
    subscribers
  }
}

type DispatchAction = (dispatch: Dispatch) => any;
export function fetchSubscribersAction(): DispatchAction {
  return async dispatch => {
    try {
      const response: Object = await axios.get(API_URL + '/v1/subscribers');
      await dispatch(setSubscribers(response.data));
    } catch (err) {
      console.error('Error fetchSubscribersAction: ', err);
      dispatch(setSubscribers([]));
      console.error(err.response.data);
    }
  }
}