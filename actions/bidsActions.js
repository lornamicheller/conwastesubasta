// @flow
import axios from 'axios';
import { getSingleBid } from "../api/bids";
export const SET_SINGLE_BID = "SET_SINGLE_BID";
export const SET_BIDDERS = "SET_BIDDERS";

type DispatchAction = (dispatch: Dispatch) => any;
export function setSingleBidAction(bid: Object) {
  return {
    type: SET_SINGLE_BID,
    bid
  };
}

export function fetchSingleBidAction(bidid: number): DispatchAction {
  return async dispatch => {
    try {
      const bid = await getSingleBid(bidid);
      await dispatch(setSingleBidAction(bid.data));
    } catch (err) {
      if (err.response && err.response.data)
        console.error("Error fetchSingleBidAction: ", err.response.data);
      console.error(err);
      await dispatch(setSingleBidAction({}));
    }
  };
}

export function setBidders(bidders: Array<Object>): Object {
  return {
    type: SET_BIDDERS,
    bidders
  }
}

type Response = {
  data: Array<Object>
}
export function fetchAsyncBidders(requestId: number): DispatchAction {
  return async dispatch => {
    try {
      const promiseResponse: Response = await axios.get(`${API_URL}/v1/bidders/${requestId}`);
      const bidders: Array<Object> = promiseResponse.data;
      return await dispatch(setBidders(bidders));
    } catch (err) {
      console.error('Error: ', err.response.data);
      return await dispatch(setBidders([]));
    }
  }
}
