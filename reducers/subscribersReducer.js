// @flow
import { SET_SUBSCRIBERS } from '!/actions/subscribersActions';

export function subscribers(state: Array<Object> = [], action: Object) {
  switch (action.type) {
  case SET_SUBSCRIBERS:
    return [...action.subscribers];
  default:
    return state;
  }
}