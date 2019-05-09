import { getRequestSuppliers } from "../api/suppliers";
export const GET_REQUEST_SUPPLIERS = "GET_REQUEST_SUPPLIERS";

export function setRequestSuppliersAction(suppliers: Object[]) {
  return {
    type: GET_REQUEST_SUPPLIERS,
    suppliers
  };
}

export function fetchAsyncRequestSuppliersAction(requestId: Number) {
  return async dispatch => {
    try {
      const suppliers = await getRequestSuppliers(requestId);
      await dispatch(setRequestSuppliersAction(suppliers.data));
    } catch (err) {
      if (err.response && err.response.data)
        console.error(
          "Error fetchAsyncRequestSuppliersAction: ",
          err.response.data
        );
      console.error("Error fetchAsyncRequestSuppliersAction: ", err);
      await dispatch(setRequestSuppliersAction([]));
    }
  };
}
