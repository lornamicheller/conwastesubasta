import { GET_REQUEST_SUPPLIERS } from "../actions/suppliersActions";

export default function requestSuppliers(state: Object[] = [], action: Object) {
  switch (action.type) {
    case GET_REQUEST_SUPPLIERS:
      return Object.assign([], ...state, action.suppliers);
    default:
      return state;
  }
}
