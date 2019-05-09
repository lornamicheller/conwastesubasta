import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookies from "react-cookie";
import { initStore } from "../../../store";
import Detail from "../../../containers/dashboard/applications/detail";
import * as requestsActions from "../../../actions/requestsActions";
import * as suppliersActions from "../../../actions/suppliersActions";
import * as authActions from "../../../actions/authActions";
class App extends React.Component {
  static async getInitialProps({ store, req, query }) {
    const isServer = !!req;
    if (isServer) cookies.setRawCookie(req.headers.cookie);
    await store.dispatch(authActions.setAsyncCurrentUserAction());
    await store.dispatch(requestsActions.getAsyncSingleRequestAction(query.id));
    await store.dispatch(
      suppliersActions.fetchAsyncRequestSuppliersAction(query.id)
    );
    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.initialState, props.isServer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <Detail />
      </Provider>
    );
  }
}
export default withRedux(initStore)(App);
