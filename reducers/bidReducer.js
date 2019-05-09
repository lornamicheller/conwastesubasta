import { SET_SINGLE_BID, SET_BIDDERS } from "../actions/bidsActions";

export function bid(state: Object = {}, action: Object) {
  switch (action.type) {
    case SET_SINGLE_BID:
      return action.bid;
    default:
      return state;
  }
}

export function bidders(state: Array<Object> = [], action: Object) {
  switch (action.type) {
    case SET_BIDDERS:
      return [...action.bidders];
    default:
      return state;
  }
}
